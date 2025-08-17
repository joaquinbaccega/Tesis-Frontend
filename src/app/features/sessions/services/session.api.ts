// src/features/sessions/services/session.api.ts
import api from '@/services/api';
import { DraftPayload, SessionForm } from '../types/session';

export const getOrCreateSession = async (payload: Pick<SessionForm, 'pacienteId'|'fecha'|'profesionalId'|'derivadoPor'>) => {
  const { data } = await api.post('/Sesiones/get-or-create', {
    pacienteid: payload.pacienteId,
    fecha: payload.fecha,
    profesionalid: payload.profesionalId,
    derivadoPor: payload.derivadoPor,
  });
  return data as { id: string };
};

export const saveDraftStep = async (sessionId: string, payload: DraftPayload) => {
  return api.post(`/Sesiones/${sessionId}/draft`, payload);
};

export const submitSession = async (payload: SessionForm) => {
  return api.post(`/Sesiones`, payload);
};

export async function fetchDraftsAll(sessionId: string) {
  const { data } = await api.get(`/Sesiones/${sessionId}/drafts`);
  // backend devuelve [{ step, updatedAt, data }]
  return data as Array<{ step: number; updatedAt: string; data: any }>;
}
