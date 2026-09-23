"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { getStoredToken } from '@/app/lib/auth';
import {
  getSellerTrackingStatus,
  getSellerSessions,
  getSessionRoute,
  createTrackingWebSocket,
  SellerTrackingStatus,
  SessionSummary,
  RoutePoint,
} from '@/app/lib/tracking-api';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';
import Toast from '@/app/components/ui/Toast';

// Dynamic import with ssr: false — required for Leaflet / React-Leaflet
const LeafletMap = dynamic(() => import('@/app/components/tracking/LeafletMap'), { ssr: false });

const DEFAULT_CENTER: [number, number] = [31.5204, 74.3587]; // Lahore, Pakistan

interface LivePing {
  seller_id: number;
  seller_name: string;
  session_id: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
  recorded_at: string;
}

export default function AdminTrackingPage() {
  const [sellers, setSellers] = useState<SellerTrackingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Selected seller detail view
  const [selectedSeller, setSelectedSeller] = useState<SellerTrackingStatus | null>(null);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionSummary | null>(null);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [routeLoading, setRouteLoading] = useState(false);

  // Live tracking state
  const [livePings, setLivePings] = useState<Record<number, LivePing>>({}); // keyed by seller_id
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSellers = useCallback(async () => {
    try {
      const data = await getSellerTrackingStatus();
      setSellers(data);
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to load seller data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const connectWs = useCallback(() => {
    const token = getStoredToken();
    if (!token) return;
    setWsStatus('connecting');
    const ws = createTrackingWebSocket(token);
    wsRef.current = ws;

    ws.onopen = () => setWsStatus('connected');
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data) as LivePing & { type: string };
        if (msg.type === 'location_ping') {
          setLivePings((prev) => ({ ...prev, [msg.seller_id]: msg }));
          // Refresh seller list to update last_seen
          setSellers((prev) =>
            prev.map((s) =>
              s.seller_id === msg.seller_id
                ? { ...s, last_latitude: msg.latitude, last_longitude: msg.longitude, last_seen: msg.recorded_at }
                : s,
            ),
          );
        }
      } catch {}
    };
    ws.onerror = () => setWsStatus('disconnected');
    ws.onclose = () => {
      setWsStatus('disconnected');
      reconnectRef.current = setTimeout(connectWs, 5000);
    };
  }, []);

  useEffect(() => {
    fetchSellers();
    connectWs();
    const refresh = setInterval(fetchSellers, 30_000);
    return () => {
      clearInterval(refresh);
      if (wsRef.current) wsRef.current.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [fetchSellers, connectWs]);

  const handleSelectSeller = async (seller: SellerTrackingStatus) => {
    setSelectedSeller(seller);
    setSelectedSession(null);
    setRoutePoints([]);
    try {
      const s = await getSellerSessions(seller.seller_id);
      setSessions(s);
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleSelectSession = async (session: SessionSummary) => {
    setSelectedSession(session);
    setRouteLoading(true);
    try {
      const route = await getSessionRoute(session.session_id);
      setRoutePoints(route.points);
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setRouteLoading(false);
    }
  };

  // For the map: determine what to show
  const activeLivePing = selectedSeller ? livePings[selectedSeller.seller_id] : null;
  const liveMarker = activeLivePing
    ? { lat: activeLivePing.latitude, lng: activeLivePing.longitude, label: activeLivePing.seller_name }
    : selectedSeller?.is_tracking && selectedSeller.last_latitude
    ? { lat: selectedSeller.last_latitude, lng: selectedSeller.last_longitude!, label: selectedSeller.username }
    : null;

  const mapCenter: [number, number] = liveMarker
    ? [liveMarker.lat, liveMarker.lng]
    : routePoints.length > 0
    ? [routePoints[0].latitude, routePoints[0].longitude]
    : DEFAULT_CENTER;

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seller Tracking</h1>
          <p className="text-sm text-gray-500 mt-0.5">Live locations and historical routes</p>
        </div>
        {/* WebSocket connection badge */}
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
          wsStatus === 'connected' ? 'bg-green-100 text-green-700' :
          wsStatus === 'connecting' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          <div className={`h-2 w-2 rounded-full ${
            wsStatus === 'connected' ? 'bg-green-500 animate-pulse' :
            wsStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-500'
          }`} />
          {wsStatus === 'connected' ? 'Live' : wsStatus === 'connecting' ? 'Connecting…' : 'Disconnected'}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left panel: Seller list */}
        <div className="xl:col-span-1 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Sellers</h2>
          {sellers.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
              No sellers found.
            </div>
          )}
          {sellers.map((seller) => {
            const ping = livePings[seller.seller_id];
            const isSelected = selectedSeller?.seller_id === seller.seller_id;
            return (
              <button
                key={seller.seller_id}
                onClick={() => handleSelectSeller(seller)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-orange-400 bg-orange-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase">
                    {seller.username[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-gray-800">{seller.username}</p>
                      {(seller.is_tracking || ping) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          Tracking
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-gray-400">{seller.email}</p>
                    {seller.last_seen && (
                      <p className="mt-1 text-xs text-gray-400">
                        Last seen {new Date(seller.last_seen).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right panel: Map + session history */}
        <div className="xl:col-span-2 space-y-4">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                {selectedSeller ? `${selectedSeller.username} — Map` : 'Select a seller'}
              </h2>
              {selectedSession && (
                <span className="text-xs text-gray-400">Historical route • Session #{selectedSession.session_id}</span>
              )}
            </div>
            <LeafletMap
              key={selectedSeller?.seller_id ?? 'default'}
              center={mapCenter}
              liveMarker={!selectedSession ? liveMarker : null}
              routePoints={selectedSession ? routePoints : []}
              className="h-80"
            />
          </div>

          {/* Session History */}
          {selectedSeller && (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-700">Session History</h2>
                <p className="text-xs text-gray-400 mt-0.5">Click a session to load its route on the map</p>
              </div>
              {sessions.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400">No sessions recorded yet.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sessions.map((s) => (
                    <button
                      key={s.session_id}
                      onClick={() => handleSelectSession(s)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        selectedSession?.session_id === s.session_id
                          ? 'bg-orange-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">Session #{s.session_id}</span>
                            {s.is_active && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                Live
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(s.start_time).toLocaleString()}
                            {s.end_time ? ` → ${new Date(s.end_time).toLocaleTimeString()}` : ''}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {s.duration_minutes != null ? `${s.duration_minutes}m` : '—'}
                          </p>
                          <p className="text-xs text-gray-400">{s.ping_count} pings</p>
                        </div>
                      </div>
                      {routeLoading && selectedSession?.session_id === s.session_id && (
                        <div className="mt-2 h-1 rounded-full bg-orange-200 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
