export interface PortalIdentity {
  email: string;
  name: string;
  role: 'owner' | 'employee';
}

export interface PortalMember extends PortalIdentity {
  id: string;
  active: boolean;
}

export class PortalApiError extends Error {
  constructor(public readonly status: number) {
    super('Portal request failed');
  }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isIdentity = (value: unknown): value is PortalIdentity =>
  isObject(value) && typeof value.email === 'string' && !!value.email &&
  typeof value.name === 'string' && !!value.name && (value.role === 'owner' || value.role === 'employee');

const isMember = (value: unknown): value is PortalMember =>
  isObject(value) && typeof value.id === 'string' && !!value.id && typeof value.active === 'boolean' && isIdentity(value);

const isMemberList = (value: unknown): value is PortalMember[] => Array.isArray(value) && value.every(isMember);
const isAcknowledgment = (value: unknown): value is { message: string } =>
  isObject(value) && typeof value.message === 'string' && !!value.message;

const json = (body: unknown, method = 'POST'): RequestInit => ({
  method, body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
});

async function send(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`/api/portal${path}`, {
    ...init,
    cache: 'no-store',
    credentials: 'same-origin',
    redirect: 'error',
    referrerPolicy: 'same-origin',
  });
}

async function request<T>(path: string, guard: (value: unknown) => value is T, init?: RequestInit): Promise<T> {
  const response = await send(path, init);
  if (!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type') ?? '')) {
    throw new PortalApiError(503);
  }
  const value: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new PortalApiError(value === null ? 503 : response.status);
  if (!guard(value)) throw new PortalApiError(503);
  return value;
}

export const portalApi = {
  me: (signal?: AbortSignal) => request('/me', isIdentity, { signal }),
  requestLink: (email: string) => request('/request-link', isAcknowledgment, json({ email })),
  redeem: (token: string) => request('/redeem', isIdentity, json({ token })),
  async logout(): Promise<void> {
    const response = await send('/logout', { method: 'POST' });
    if (response.status !== 204) throw new PortalApiError(503);
  },
  members: (signal?: AbortSignal) => request('/members', isMemberList, { signal }),
  addMember: (email: string, name: string) => request('/members', isMember, json({ email, name })),
  setMemberActive: (id: string, active: boolean) =>
    request(`/members/${encodeURIComponent(id)}`, isMember, json({ active }, 'PATCH')),
};
