import { getStoredToken } from './auth';

const BASE_URL = 'http://127.0.0.1:8000';
const WS_BASE = 'ws://127.0.0.1:8000';

function authHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? getStoredToken() : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body.detail === 'string') return body.detail;
    if (Array.isArray(body.detail)) return body.detail.map((e: any) => e.msg).join(', ');
  } catch {}
  return `Request failed with status ${res.status}`;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: authHeaders(),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr: any) {
    // fetch() itself rejected — server unreachable, CORS preflight blocked,
    // or no network. Re-throw a descriptive Error for callers to surface in UI.
    // NOTE: We intentionally do NOT console.error here because many callers
    // (e.g. getCurrentStatus on mount) treat a network failure as non-fatal
    // and handle it silently. Logging the raw TypeError here would print a
    // confusing "Failed to fetch" stack trace in the console even when the
    // error is expected and fully handled upstream.
    throw new Error(
      `Cannot reach the API server (${BASE_URL}). ` +
        `Ensure the FastAPI backend is running on port 8000. ` +
        `(${networkErr?.message ?? 'Failed to fetch'})`
    );
  }
  if (!res.ok) throw new Error(await parseError(res));
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---- Seller Tracking ----
export const startTracking = () =>
  request<{ session_id: number; start_time: string; message: string }>('POST', '/api/v1/tracking/start');

export const pingLocation = (payload: {
  session_id: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
}) => request<{ status: string; recorded_at: string }>('POST', '/api/v1/tracking/ping', payload);

export const stopTracking = (session_id: number) =>
  request<{ status: string; session_id: number; end_time: string }>('POST', '/api/v1/tracking/stop', { session_id });

export const getCurrentStatus = () =>
  request<{ is_active: boolean; session_id?: number; start_time?: string }>('GET', '/api/v1/tracking/current-status');

// ---- Admin Tracking ----
export const getSellerTrackingStatus = () =>
  request<SellerTrackingStatus[]>('GET', '/api/v1/admin/tracking/sellers');

export const getSellerSessions = (seller_id: number) =>
  request<SessionSummary[]>('GET', `/api/v1/admin/tracking/sellers/${seller_id}/sessions`);

export const getSessionRoute = (session_id: number) =>
  request<{ session_id: number; points: RoutePoint[] }>('GET', `/api/v1/admin/tracking/sessions/${session_id}/route`);

export function createTrackingWebSocket(token: string): WebSocket {
  return new WebSocket(`${WS_BASE}/ws/admin/tracking?token=${token}`);
}

// ---- Types ----
export interface SellerTrackingStatus {
  seller_id: number;
  username: string;
  email: string;
  is_tracking: boolean;
  session_id?: number;
  last_seen?: string;
  last_latitude?: number;
  last_longitude?: number;
}

export interface SessionSummary {
  session_id: number;
  start_time: string;
  end_time?: string;
  is_active: boolean;
  duration_minutes?: number;
  ping_count: number;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
  accuracy?: number;
  recorded_at: string;
}
