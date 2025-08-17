// src/features/sessions/hooks/useSessionId.ts
'use client';
import { useEffect, useState } from 'react';
import { getOrCreateSession } from '../services/session.api';
import type { SessionForm } from '../types/session';

export function useSessionId(form: Pick<SessionForm,'pacienteId'|'fecha'|'profesionalId'|'derivadoPor'>) {
  const key = `sesionId:${form.pacienteId ?? 'anon'}:${form.fecha}`;
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // 1) intento recuperar de localStorage
      const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      if (existing) {
        setSessionId(existing);
        return;
      }
      // 2) si no hay, pido al backend (idempotente)
      const { id } = await getOrCreateSession({
        pacienteId: form.pacienteId,
        fecha: form.fecha,
        profesionalId: form.profesionalId,
        derivadoPor: form.derivadoPor,
      });
      if (!mounted) return;
      localStorage.setItem(key, id);
      setSessionId(id);
    })();
    return () => { mounted = false; };
  }, [key, form.pacienteId, form.fecha, form.profesionalId, form.derivadoPor]);

  const clear = () => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
    setSessionId(null);
  };

  return { sessionId, clear };
}
