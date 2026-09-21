const BASE_URL = "http://127.0.0.1:8000";

export type Designation = "admin" | "seller";

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    id: number;
    username: string;
    email: string;
    designation: Designation;
    token: string;
  };
}

interface ApiError {
  detail: string | { msg: string; type: string }[];
}

/**
 * Parse FastAPI error responses into a human-readable string.
 */
async function parseError(res: Response): Promise<string> {
  try {
    const body: ApiError = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail)) {
      return body.detail.map((e) => e.msg).join(", ");
    }
  } catch {
    // fall through
  }
  return `Request failed with status ${res.status}`;
}

export async function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  designation: Designation;
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/user/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json();
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/user/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseError(res));
  }

  return res.json();
}
