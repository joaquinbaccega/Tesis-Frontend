// src/features/sessions/components/Step03LaboralSueno.tsx
'use client';
import React from 'react';
import {
  Box, Button, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { SessionForm, ActividadLaboralItem } from '../types/session';

const estilos = ['Sedentario','Activo','Esfuerzo'] as const;
const frecuencias = ['Día','Semana','Mes'] as const;

const Step03LaboralSueno: React.FC = () => {
  // 👇 Tipamos el formulario
  const { control, watch, getValues } = useFormContext<SessionForm>();

  // 👇 Tipamos useFieldArray para el path 'habitos.actividadLaboral'
  const { fields, append, remove } = useFieldArray<
    SessionForm,
    'habitos.actividadLaboral',
    'id'
  >({
    control,
    name: 'habitos.actividadLaboral',
  });

  // Valores vivos para renderizar
  const actividadLaboral = watch('habitos.actividadLaboral') ?? [];

  const handleAgregar = () => {
    const draft = getValues('laboralDraft') as Partial<ActividadLaboralItem> | undefined;
    if (!draft || !draft.tipo) return; // validación mínima UI

    const item: ActividadLaboralItem = {
      tipo: draft.tipo,
      estilo: draft.estilo ?? 'Sedentario',
      frecuenciaLapso: (draft.frecuenciaLapso ?? 'Semana') as ActividadLaboralItem['frecuenciaLapso'],
      cantidadEnLapso: Number(draft.cantidadEnLapso ?? 0),
      tiempoVigenciaMeses: Number(draft.tiempoVigenciaMeses ?? 0),
    };
    append(item);
  };

  return (
    <Box>
      <Typography fontWeight={600}>Actividad Laboral/Profesión</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Controller
            name="laboralDraft.tipo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tipo" placeholder="Programador" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="laboralDraft.estilo"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Estilo de actividad" fullWidth>
                {estilos.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Controller
            name="laboralDraft.frecuenciaLapso"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Frecuencia en lapso" fullWidth>
                {frecuencias.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Controller
            name="laboralDraft.cantidadEnLapso"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Cantidad en lapso" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Controller
            name="laboralDraft.tiempoVigenciaMeses"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Vigencia (meses)" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md="auto">
          <Button variant="contained" onClick={handleAgregar}>Agregar</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Tipo de actividad</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row, i) => {
              const item = actividadLaboral[i]; // valores actuales del form
              return (
                <TableRow key={row.id}>
                  <TableCell>{item?.tipo}</TableCell>
                  <TableCell>{item?.estilo}</TableCell>
                  <TableCell>{item?.frecuenciaLapso}</TableCell>
                  <TableCell>{item?.cantidadEnLapso}</TableCell>
                  <TableCell>{item?.tiempoVigenciaMeses} meses</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => remove(i)}>Quitar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography fontWeight={600} sx={{ mt: 3 }}>Sueño</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Controller
            name="sueno.horas"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Cantidad (hs)" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="sueno.calidad"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Calidad" fullWidth>
                <MenuItem value="Reparadora">Reparadora</MenuItem>
                <MenuItem value="Intermedia">Intermedia</MenuItem>
                <MenuItem value="Mala">Mala</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="sueno.horarioHabitual"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Horario habitual"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Controller
            name="sueno.siesta"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Siesta" fullWidth>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Corta">Corta</MenuItem>
                <MenuItem value="Larga">Larga</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step03LaboralSueno;
