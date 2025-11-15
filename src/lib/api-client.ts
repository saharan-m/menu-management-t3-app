// src/lib/api-client.ts
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const sessionToken = localStorage.getItem('sessionToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add sessionToken to custom header
  if (sessionToken) {
    (headers as Record<string, string>)['x-session-token'] = sessionToken;
  }

  return fetch(endpoint, {
    ...options,
    headers,
  });
}
