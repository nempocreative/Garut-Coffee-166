import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

function readJson<T>(key: string, initialValue: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useWebStorageJson<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readJson(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the current session usable if browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}

export function readWebStorageJson<T>(
  key: string,
  fallback: T,
  legacyKeys: string[] = [],
): T {
  for (const candidateKey of [key, ...legacyKeys]) {
    const stored = window.localStorage.getItem(candidateKey);
    if (stored === null) continue;

    try {
      return JSON.parse(stored) as T;
    } catch {
      window.localStorage.removeItem(candidateKey);
    }
  }
  return fallback;
}