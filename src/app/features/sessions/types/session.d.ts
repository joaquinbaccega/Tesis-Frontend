// src/features/sessions/types/session.d.ts
export type Frecuencia = 'Día' | 'Semana' | 'Mes';

export interface ActividadFisicaItem {
  tipo: string;
  tiempoSesion: string;        // "1 hs"
  frecuenciaLapso: Frecuencia;
  cantidadEnLapso: number;
  tiempoVigencia: string;      // "1 mes" | "3 meses" | ...
}

export interface ActividadLaboralItem {
  tipo: string;                // "Programador"
  estilo: string;              // "Sedentario" | "Activo" | "Esfuerzo"
  frecuenciaLapso: Frecuencia;
  cantidadEnLapso: number;
  tiempoVigenciaMeses: number;
}

export interface AlimentacionItem {
  comida: string;              // "Carne"
  clase: string;               // "Vaca" | "Pollo" | ...
  porcentaje: number;          // 0..100
  formaIngesta: string;        // "Frito" | "Hervido" | ...
  nivelCoccion: number;        // 0..100
}

export interface HabitoToxicoItem {
  tipo: string;                // "Fumador" | "Alcohol" | ...
  frecuencia: Frecuencia;
  cantidad: number;
  vigenciaMeses: number;
  sintomatologia: string;
}

export interface SessionForm {
  // Paso 1
  pacienteId: string | null;
  fecha: string;                   // yyyy-mm-dd
  profesionalId: string | null;
  derivadoPor?: string;

  caracteristicas: {
    edad: number;
    pesoKg: number;
    alturaM: number;
    porcentajeGrasa: number;
    porcentajeMasaMuscular: number;
  };

  // Paso 2
  habitos: {
    actividadFisica: ActividadFisicaItem[];
    actividadLaboral: ActividadLaboralItem[];
    alimentacion: AlimentacionItem[];
    habitosToxicos: HabitoToxicoItem[];
  };

  // Paso 3 (sueño)
  sueno: {
    horas: number;
    calidad: 'Reparadora' | 'Intermedia' | 'Mala';
    horarioHabitual: string; // "22:00"
    siesta: 'No' | 'Corta' | 'Larga';
  };

  // Paso 5 (digestión)
  digestion: {
    frecuencia: Frecuencia;
    cantidadEnLapso: number;
    estado: 'Solido' | 'Blandas' | 'Diarreicas';
    sintomas: string;
  };

  // Drafts para construir filas en UI (NO se envían al back)
  actividadDraft?: Partial<ActividadFisicaItem>;
  laboralDraft?: Partial<ActividadLaboralItem>;
  alimentoDraft?: Partial<AlimentacionItem>;
  toxicoDraft?: Partial<HabitoToxicoItem>;
}

// Draft para autosave
export interface DraftPayload {
  step: number;
  data: Partial<SessionForm>;
}
