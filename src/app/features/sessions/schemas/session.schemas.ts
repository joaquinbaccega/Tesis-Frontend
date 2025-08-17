// src/features/sessions/schemas/session.schemas.ts
import { z } from 'zod';

const frecuencia = z.enum(['Día','Semana','Mes']);

const actividadFisicaItem = z.object({
  tipo: z.string().min(1),
  tiempoSesion: z.string().min(1),
  frecuenciaLapso: frecuencia,
  cantidadEnLapso: z.number().min(0),
  tiempoVigencia: z.string().min(1),
});

const actividadLaboralItem = z.object({
  tipo: z.string().min(1),
  estilo: z.string().min(1),
  frecuenciaLapso: frecuencia,
  cantidadEnLapso: z.number().min(0),
  tiempoVigenciaMeses: z.number().min(0),
});

const alimentacionItem = z.object({
  comida: z.string().min(1),
  clase: z.string().min(1),
  porcentaje: z.number().min(0).max(100),
  formaIngesta: z.string().min(1),
  nivelCoccion: z.number().min(0).max(100),
});

const habitoToxicoItem = z.object({
  tipo: z.string().min(1),
  frecuencia: frecuencia,
  cantidad: z.number().min(0),
  vigenciaMeses: z.number().min(0),
  sintomatologia: z.string().optional().default(''),
});

/** 🔧 Alineado con SessionForm: pacienteId puede ser null */
export const identificacionSchema = z.object({
  pacienteId: z.string().nullable(),
  fecha: z.string().min(1, 'Fecha requerida'),
  profesionalId: z.string().nullable(),
  derivadoPor: z.string().optional(),
  caracteristicas: z.object({
    edad: z.number().min(0).max(120),
    pesoKg: z.number().min(0).max(500),
    alturaM: z.number().min(0).max(3),
    porcentajeGrasa: z.number().min(0).max(100),
    porcentajeMasaMuscular: z.number().min(0).max(100),
  }),
});

export const habitosSchema = z.object({
  habitos: z.object({
    actividadFisica: z.array(actividadFisicaItem).default([]),
    actividadLaboral: z.array(actividadLaboralItem).default([]),
    alimentacion: z.array(alimentacionItem).default([]),
    habitosToxicos: z.array(habitoToxicoItem).default([]),
  }),
});

export const suenoSchema = z.object({
  sueno: z.object({
    horas: z.number().min(0).max(24),
    calidad: z.enum(['Reparadora','Intermedia','Mala']),
    horarioHabitual: z.string().min(1),
    siesta: z.enum(['No','Corta','Larga']),
  }),
});

export const digestionSchema = z.object({
  digestion: z.object({
    frecuencia: frecuencia,
    cantidadEnLapso: z.number().min(0),
    estado: z.enum(['Solido','Blandas','Diarreicas']),
    sintomas: z.string().optional().default(''),
  }),
});

/** 🔧 Añadir drafts opcionales para que el esquema coincida con SessionForm */
export const draftsSchema = z.object({
  actividadDraft: actividadFisicaItem.partial().optional(),
  laboralDraft: actividadLaboralItem.partial().optional(),
  alimentoDraft: alimentacionItem.partial().optional(),
  toxicoDraft: habitoToxicoItem.partial().optional(),
});

/** Esquema final */
export const fullSchema = identificacionSchema
  .and(habitosSchema)
  .and(suenoSchema)
  .and(digestionSchema)
  .and(draftsSchema);
