// src/features/sessions/components/Wizard.tsx
'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { fullSchema } from '../schemas/session.schemas';
import { SessionForm } from '../types/session';
import { saveDraftStep, submitSession, fetchDraftsAll } from '../services/session.api';
import { mapFormToPayload } from '../utils/submitMapper';
import { deepMerge } from '../utils/deepMerge';
import Step01Identificacion from './Step01Identificacion';
import Step02ActividadFisica from './Step02ActividadFisica';
import Step03LaboralSueno from './Step03LaboralSueno';
import Step04Alimentacion from './Step04Alimentacion';
import Step05DigestionHabitos from './Step05DigestionHabitos';
import Step06Revision from './Step06Revision';
import { useSessionId } from '../hooks/useSessionId';

const steps = [ 'Identificación','Actividad física','Laboral & Sueño','Alimentación','Digestión & Hábitos','Revisión' ];

const defaultValues: SessionForm = {
  pacienteId: null,
  fecha: new Date().toISOString().slice(0, 10),
  profesionalId: null,
  derivadoPor: '',
  caracteristicas: { edad: 0, pesoKg: 0, alturaM: 0, porcentajeGrasa: 0, porcentajeMasaMuscular: 0 },
  habitos: { actividadFisica: [], actividadLaboral: [], alimentacion: [], habitosToxicos: [] },
  sueno: { horas: 8, calidad: 'Reparadora', horarioHabitual: '22:00', siesta: 'No' },
  digestion: { frecuencia: 'Semana', cantidadEnLapso: 0, estado: 'Solido', sintomas: '' },
  actividadDraft: {}, laboralDraft: {}, alimentoDraft: {}, toxicoDraft: {},
};

const Wizard: React.FC = () => {
  const methods = useForm<SessionForm>({
    defaultValues,
    resolver: zodResolver(fullSchema) as any,
    mode: 'onChange',
  });

  const [activeStep, setActiveStep] = useState(0);

  // ✅ ID estable: depende de (pacienteId, fecha, profesionalId, derivadoPor)
  const watched = methods.watch(['pacienteId','fecha','profesionalId','derivadoPor']);
  const { sessionId, clear } = useSessionId({
    pacienteId: watched[0],
    fecha: watched[1],
    profesionalId: watched[2],
    derivadoPor: watched[3],
  });

  const onSaveDraft = useCallback(async () => {
    if (!sessionId) return; // aún inicializando
    const data = methods.getValues();
    await saveDraftStep(sessionId, { step: activeStep, data });
  }, [activeStep, methods, sessionId]);

  const onNext = async () => {
    await onSaveDraft();
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  // ✅ Rehidratar con TODOS los drafts guardados
  useEffect(() => {
    (async () => {
      if (!sessionId) return;
      try {
        const drafts = await fetchDraftsAll(sessionId); // ahora devuelve array
        if (!Array.isArray(drafts) || drafts.length === 0) return;
        const merged = drafts
          .sort((a, b) => a.step - b.step)
          .reduce((acc, d) => deepMerge(acc, d.data), { ...defaultValues });
        methods.reset(merged);
      } catch (e) {
        console.warn('No drafts loaded', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const onBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const onSubmit = methods.handleSubmit(async (data) => {
    const payload = mapFormToPayload(data);
    await submitSession(payload);
    clear(); // nueva sesión próxima vez
  });

  const content = useMemo(() => {
    switch (activeStep) {
      case 0: return <Step01Identificacion />;
      case 1: return <Step02ActividadFisica />;
      case 2: return <Step03LaboralSueno />;
      case 3: return <Step04Alimentacion />;
      case 4: return <Step05DigestionHabitos />;
      case 5: return <Step06Revision />;
      default: return null;
    }
  }, [activeStep]);

  return (
    <FormProvider {...methods}>
      <Box>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 2 }}>{content}</Box>

        <Box display="flex" gap={2} justifyContent="space-between">
          <Button variant="outlined" onClick={onBack} disabled={activeStep === 0}>Atrás</Button>
          <Box display="flex" gap={2}>
            <Button variant="text" onClick={onSaveDraft} disabled={!sessionId}>Guardar borrador</Button>
            {activeStep < steps.length - 1
              ? <Button variant="contained" onClick={onNext} disabled={!sessionId}>Siguiente</Button>
              : <Button variant="contained" onClick={onSubmit} disabled={!sessionId}>Finalizar</Button>}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Wizard;
