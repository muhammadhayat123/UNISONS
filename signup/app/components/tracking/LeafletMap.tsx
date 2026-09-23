"use client";
import { useEffect, useRef } from 'react';
import { RoutePoint } from '@/app/lib/tracking-api';

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  liveMarker?: { lat: number; lng: number; label: string } | null;
  routePoints?: RoutePoint[];
  className?: string;
}

export default function LeafletMap({
  center,
  zoom = 13,
  liveMarker,
  routePoints = [],
  className = '',
}: LeafletMapProps) {
  // mapRef holds the live L.Map instance; typed as any to avoid importing
  // Leaflet types at the module level (which would break SSR).
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Map initialization ───────────────────────────────────────────────────
  // STRICT MODE SAFETY: React 18 Strict Mode double-invokes effects in dev.
  // The async import() can resolve AFTER the first cleanup already ran.
  // We use a `destroyed` flag (captured in the closure) so the .then()
  // callback can bail out if the component was already unmounted/cleaned up
  // before Leaflet had a chance to initialize.
  useEffect(() => {
    if (!containerRef.current) return;

    // Already initialized — guard against Strict Mode second invocation
    // where mapRef.current was set by the first run before cleanup fired.
    if (mapRef.current) return;

    let destroyed = false;

    import('leaflet').then((L) => {
      // Bail if cleanup already ran before this promise resolved
      if (destroyed || !containerRef.current) return;

      // Fix default icon paths broken by webpack/turbopack bundling
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current!, {
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      map.setView(center, zoom);
      // invalidateSize ensures the map renders correctly if the container
      // size changed between JS load and tile render (common in flex layouts)
      map.invalidateSize();

      mapRef.current = map;
    });

    // Cleanup: runs synchronously on unmount (or on Strict Mode first teardown)
    return () => {
      destroyed = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        polylineRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Live marker updates ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    import('leaflet').then((L) => {
      const map = mapRef.current;
      if (!map) return; // map may have been removed between the await and here

      if (liveMarker) {
        const latlng: [number, number] = [liveMarker.lat, liveMarker.lng];
        if (markerRef.current) {
          markerRef.current.setLatLng(latlng);
        } else {
          const liveIcon = L.divIcon({
            className: '',
            html: `<div style="
              width:14px;height:14px;border-radius:50%;
              background:#ea580c;border:3px solid white;
              box-shadow:0 0 0 3px rgba(234,88,12,0.4);
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });
          markerRef.current = L.marker(latlng, { icon: liveIcon })
            .bindPopup(liveMarker.label)
            .addTo(map);
        }
        map.panTo(latlng, { animate: true, duration: 0.8 });
      } else {
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      }
    });
  }, [liveMarker]);

  // ─── Historical route polyline ────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    import('leaflet').then((L) => {
      const map = mapRef.current;
      if (!map) return;

      // Always tear down previous polyline + endpoint markers before redrawing
      if (polylineRef.current) {
        polylineRef.current.remove();
        polylineRef.current = null;
      }

      if (routePoints.length >= 2) {
        const latlngs = routePoints.map((p): [number, number] => [
          p.latitude,
          p.longitude,
        ]);

        polylineRef.current = L.polyline(latlngs, {
          color: '#ea580c',
          weight: 3,
          opacity: 0.8,
        }).addTo(map);

        // Start marker — green dot
        L.marker(latlngs[0], {
          icon: L.divIcon({
            className: '',
            html: `<div style="width:12px;height:12px;border-radius:50%;background:#16a34a;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,.3)"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          }),
        })
          .bindPopup('Start')
          .addTo(map);

        // End marker — red dot
        L.marker(latlngs[latlngs.length - 1], {
          icon: L.divIcon({
            className: '',
            html: `<div style="width:12px;height:12px;border-radius:50%;background:#dc2626;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,.3)"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          }),
        })
          .bindPopup('End')
          .addTo(map);

        map.fitBounds(polylineRef.current.getBounds(), { padding: [30, 30] });
      }
    });
  }, [routePoints]);

  return (
    <>
      {/* Leaflet CSS loaded inline — must precede the container div */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div ref={containerRef} className={`w-full ${className}`} />
    </>
  );
}
