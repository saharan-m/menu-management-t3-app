// src/lib/cookies.ts
'use client';

export function setAuthCookie(userId: string) {
  // Set cookie that will be sent with future requests
  document.cookie = `sessionToken=${userId}; path=/; samesite=strict`;
}

export function clearAuthCookie() {
  document.cookie = 'sessionToken=; path=/; max-age=0';
}
