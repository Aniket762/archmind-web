import { useState, useEffect, useRef } from 'react';
import { STORAGE } from '@/constants';

interface UseLocalDraftReturn {
  content: string;
  setContent: (value: string) => void;
  lastSaved: Date | null;
  saveNow: () => void;
  clearDraft: () => void;
}

export function useLocalDraft(key: string, debounceMs = 1500): UseLocalDraftReturn {
  const storageKey = `${STORAGE.DRAFT_PREFIX}${key}`;

  const [content, setContentRaw] = useState<string>(
    () => localStorage.getItem(storageKey) ?? '',
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveNow = () => {
    localStorage.setItem(storageKey, content);
    setLastSaved(new Date());
  };

  const setContent = (value: string) => {
    setContentRaw(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, value);
      setLastSaved(new Date());
    }, debounceMs);
  };

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    setContentRaw('');
    setLastSaved(null);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { content, setContent, lastSaved, saveNow, clearDraft };
}
