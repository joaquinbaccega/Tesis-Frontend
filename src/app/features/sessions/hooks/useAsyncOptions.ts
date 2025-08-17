// src/features/sessions/hooks/useAsyncOptions.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Option = { id: string; label: string };
type Loader = (q: string, page?: number, pageSize?: number) => Promise<{ items: Option[]; total: number }>;

interface Params {
  loader: Loader;
  pageSize?: number;
  cacheKey?: string;
}

const memory = new Map<string, { ts: number; data: { items: Option[]; total: number } }>();
const TTL = 60_000;

export function useAsyncOptions({ loader, pageSize = 10, cacheKey = '' }: Params) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  const key = useMemo(() => `${cacheKey}:${query}:${page}:${pageSize}`, [cacheKey, query, page, pageSize]);

  const load = useCallback(async () => {
    const cached = memory.get(key);
    if (cached && Date.now() - cached.ts < TTL) {
      setOptions(cached.data.items);
      setTotal(cached.data.total);
      return;
    }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const res = await loader(query, page, pageSize);
      setOptions(res.items);
      setTotal(res.total);
      memory.set(key, { ts: Date.now(), data: res });
    } finally {
      setLoading(false);
    }
  }, [key, loader, page, pageSize, query]);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(load, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [load]);

  return { options, total, page, setPage, loading, setQuery };
}
