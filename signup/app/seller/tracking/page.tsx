"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getStoredUser } from '@/app/lib/auth';
import { startTracking, pingLocation, stopTracking, getCurrentStatus } from '@/app/lib/tracking-api';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';
import Toast from '@/app/components/ui/Toast';

const PING_INTERVAL_MS = 15_000; // fallback interval if watchPosition stalls

function formatDuration(startIso: string): string {
  const diff = Math.floor((Date.now() - new Date(startIso).getTime()) / 1000);
  const h = Math.floor(diff / 3600).toString().padStart(2, '0');
  const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
  const s = (diff % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function SellerTrackingPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState('00:00:00');
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'acquiring' | 'active' | 'denied' | 'error'>('idle');
  const [lastCoords, setLastCoords] = useState<{ lat: number; lng: number; acc?: number } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const fallbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastCoordsRef = useRef<{ lat: number; lng: number; acc?: number } | null>(null);
  const sessionIdRef = useRef<number | null>(null);

  // Keep ref in sync
  useEffect(() => { sessionIdRef.current = sessionId; }, [sessionId]);
  useEffect(() => { lastCoordsRef.current = lastCoords; }, [lastCoords]);

  // Load user + restore state on mount
  useEffect(() => {
    setUser(getStoredUser());
    (async () => {
      try {
        const status = await getCurrentStatus();
        if (status.is_active && status.session_id) {
          setIsTracking(true);
          setSessionId(status.session_id);
          setStartTime(status.start_time ?? null);
          setGpsStatus('acquiring');
          beginWatching(status.session_id);
        }
      } catch (err: any) {
        // getCurrentStatus failing is non-fatal (seller may simply have no
        // active session). However if the network is unreachable we surface
        // an inline warning banner instead of silently swallowing the error.
        if (err?.message?.includes('Cannot reach the API server')) {
          setServerError(
            'Cannot connect to the backend server. Make sure the FastAPI server is running on port 8000.'
          );
        }
        // Any other error (401, 404, etc.) just means no active session — continue normally.
      } finally {
        setLoading(false);
      }
    })();
    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trip timer
  useEffect(() => {
    if (isTracking && startTime) {
      timerRef.current = setInterval(() => setElapsed(formatDuration(startTime)), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setElapsed('00:00:00');
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTracking, startTime]);

  const sendPing = useCallback(async (lat: number, lng: number, acc?: number) => {
    const sid = sessionIdRef.current;
    if (!sid) return;
    try {
      await pingLocation({ session_id: sid, latitude: lat, longitude: lng, accuracy: acc });
    } catch {
      // Silent — UI timer will retry
    }
  }, []);

  const beginWatching = useCallback((sid: number) => {
    if (!navigator.geolocation) {
      setGpsStatus('error');
      return;
    }
    setGpsStatus('acquiring');

    const opts: PositionOptions = { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5_000 };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLastCoords({ lat: latitude, lng: longitude, acc: accuracy });
        setGpsStatus('active');
        sendPing(latitude, longitude, accuracy);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGpsStatus('denied');
        else setGpsStatus('error');
      },
      opts,
    );

    // Fallback: if watchPosition doesn't fire for PING_INTERVAL_MS, retry with last known
    fallbackIntervalRef.current = setInterval(() => {
      const c = lastCoordsRef.current;
      if (c) sendPing(c.lat, c.lng, c.acc);
    }, PING_INTERVAL_MS);
  }, [sendPing]);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (fallbackIntervalRef.current) {
      clearInterval(fallbackIntervalRef.current);
      fallbackIntervalRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopWatching();
    if (timerRef.current) clearInterval(timerRef.current);
  }, [stopWatching]);

  const handleStart = async () => {
    setActionLoading(true);
    try {
      const res = await startTracking();
      setServerError(null); // backend is reachable — clear any previous banner
      const now = new Date().toISOString();
      setSessionId(res.session_id);
      setStartTime(now);
      setIsTracking(true);
      beginWatching(res.session_id);
      setToast({ message: 'Journey started! Your location is now being shared.', type: 'success' });
    } catch (err: any) {
      if (err?.message?.includes('Cannot reach the API server')) {
        setServerError(
          'Cannot connect to the backend server. Make sure the FastAPI server is running on port 8000.'
        );
      }
      setToast({ message: err.message || 'Failed to start tracking.', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleStop = async () => {
    if (!sessionId) return;
    setActionLoading(true);
    try {
      await stopTracking(sessionId);
      stopWatching();
      setIsTracking(false);
      setSessionId(null);
      setStartTime(null);
      setGpsStatus('idle');
      setLastCoords(null);
      setToast({ message: 'Journey stopped. Location sharing ended.', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to stop tracking.', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner /></div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-sm space-y-6">
        {/* Backend unreachable banner — shown persistently until server responds */}
        {serverError && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-amber-800">Backend Unavailable</p>
              <p className="mt-0.5 text-xs text-amber-700">{serverError}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
          <p className="mt-1 text-sm text-gray-500">
            {isTracking ? 'Your location is being shared with the admin.' : 'Start your journey to share your location.'}
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          {/* GPS Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full flex-shrink-0 ${
              gpsStatus === 'active' ? 'bg-green-500 animate-pulse' :
              gpsStatus === 'acquiring' ? 'bg-yellow-400 animate-pulse' :
              gpsStatus === 'denied' || gpsStatus === 'error' ? 'bg-red-500' :
              'bg-gray-300'
            }`} />
            <span className="text-sm font-medium text-gray-700">
              {gpsStatus === 'active' ? 'GPS Active — transmitting' :
               gpsStatus === 'acquiring' ? 'Acquiring GPS signal…' :
               gpsStatus === 'denied' ? 'GPS permission denied' :
               gpsStatus === 'error' ? 'GPS unavailable' :
               'GPS idle'}
            </span>
          </div>

          {/* Trip Timer */}
          <div className="rounded-xl bg-gray-50 py-4 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Trip Duration</p>
            <p className={`mt-1 font-mono text-4xl font-bold tracking-tight ${
              isTracking ? 'text-orange-600' : 'text-gray-300'
            }`}>{elapsed}</p>
          </div>

          {/* Last Known Coordinates */}
          {lastCoords && (
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-xs text-blue-700">
              <p className="font-semibold">Last Known Position</p>
              <p className="mt-0.5 font-mono">
                {lastCoords.lat.toFixed(6)}, {lastCoords.lng.toFixed(6)}
                {lastCoords.acc ? ` ±${Math.round(lastCoords.acc)}m` : ''}
              </p>
            </div>
          )}

          {/* GPS Permission Warning */}
          {gpsStatus === 'denied' && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">Location Access Blocked</p>
              <p className="mt-1">Please enable location permissions in your browser settings to use tracking.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        {isTracking ? (
          <button
            onClick={handleStop}
            disabled={actionLoading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-5 text-lg font-semibold text-white shadow-lg transition-all hover:bg-red-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            )}
            Stop Journey
          </button>
        ) : (
          <button
            onClick={handleStart}
            disabled={actionLoading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-600 px-6 py-5 text-lg font-semibold text-white shadow-lg transition-all hover:bg-orange-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            Start Journey
          </button>
        )}

        <p className="text-center text-xs text-gray-400">
          Location data is transmitted securely and visible only to your admin.
        </p>
      </div>
    </div>
  );
}
