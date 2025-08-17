// src/features/sessions/services/session.api.ts
import api from '@/services/api';
import { DraftPayload, SessionForm } from '../types/session';

export const saveDraftStep = async (sessionId: string, payload: DraftPayload) => {
  return api.post(`/sesiones/${sessionId}/draft`, payload);
};

export const submitSession = async (payload: SessionForm) => {
  return api.post(`/sesiones`, payload);
};

export async function fetchDrafts(sessionId: string) {
  const { data } = await api.get(`/Sesiones/${sessionId}/drafts/latest`);
  return data as Array<{ step: number; updatedAt: string; data: any }>;
}