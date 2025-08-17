// src/features/sessions/utils/submitMapper.ts
import { SessionForm } from '../types/session';

export function mapFormToPayload(form: SessionForm): SessionForm {
  // Clonar y eliminar drafts
  const { actividadDraft, laboralDraft, alimentoDraft, toxicoDraft, ...rest } = form;

  // Asegurar números (por si llegaron strings)
  rest.caracteristicas.edad = Number(rest.caracteristicas.edad ?? 0);
  rest.caracteristicas.pesoKg = Number(rest.caracteristicas.pesoKg ?? 0);
  rest.caracteristicas.alturaM = Number(rest.caracteristicas.alturaM ?? 0);
  rest.caracteristicas.porcentajeGrasa = Number(rest.caracteristicas.porcentajeGrasa ?? 0);
  rest.caracteristicas.porcentajeMasaMuscular = Number(rest.caracteristicas.porcentajeMasaMuscular ?? 0);

  rest.sueno.horas = Number(rest.sueno.horas ?? 0);

  rest.digestion.cantidadEnLapso = Number(rest.digestion.cantidadEnLapso ?? 0);

  rest.habitos.actividadFisica = (rest.habitos.actividadFisica ?? []).map(i => ({
    ...i,
    cantidadEnLapso: Number(i.cantidadEnLapso ?? 0),
  }));

  rest.habitos.actividadLaboral = (rest.habitos.actividadLaboral ?? []).map(i => ({
    ...i,
    cantidadEnLapso: Number(i.cantidadEnLapso ?? 0),
    tiempoVigenciaMeses: Number(i.tiempoVigenciaMeses ?? 0),
  }));

  rest.habitos.alimentacion = (rest.habitos.alimentacion ?? []).map(i => ({
    ...i,
    porcentaje: Number(i.porcentaje ?? 0),
    nivelCoccion: Number(i.nivelCoccion ?? 0),
  }));

  rest.habitos.habitosToxicos = (rest.habitos.habitosToxicos ?? []).map(i => ({
    ...i,
    cantidad: Number(i.cantidad ?? 0),
    vigenciaMeses: Number(i.vigenciaMeses ?? 0),
  }));

  return rest;
}
