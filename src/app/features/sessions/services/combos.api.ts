// src/features/sessions/services/combos.api.ts
import api from '@/services/api';

export interface Option { id: string; label: string; }
export interface PagedOptions { items: Option[]; total: number; }

export const fetchPacientes = async (q: string, page = 1, pageSize = 10) => {
  const { data } = await api.get<PagedOptions>('/Pacientes/buscar', { params: { q, page, pageSize } });
  return data;
};

// Agregá más loaders si necesitás otros combos
