'use client';
import React from 'react';
import {
  Box, Button, Divider, Grid, MenuItem, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Paper
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { SessionForm, ActividadFisicaItem } from '../types/session';

const frecuencias = ['Día', 'Semana', 'Mes'] as const;
const tiempoLapso = ['1 mes','3 meses','6 meses','12 meses'] as const;

const Step02ActividadFisica: React.FC = () => {
  // 👇 Tipamos el formulario completo
  const { control, watch, getValues } = useFormContext<SessionForm>();

  // 👇 Tipamos useFieldArray para esta ruta del formulario
  const { fields, append, remove } = useFieldArray<
    SessionForm,                 // TFieldValues
    'habitos.actividadFisica',   // Nombre del campo
    'id'                         // keyName (opcional, por defecto 'id')
  >({
    control,
    name: 'habitos.actividadFisica',
  });

  // 👇 Los valores “vivos” se leen con watch
  const actividades = watch('habitos.actividadFisica') ?? [];

  const handleAgregar = () => {
    const draft = getValues('actividadDraft') as Partial<ActividadFisicaItem> | undefined;
    if (!draft || !draft.tipo) return; // validación mínima en UI

    // Normalizamos y seteamos defaults seguros
    const item: ActividadFisicaItem = {
      tipo: draft.tipo,
      tiempoSesion: draft.tiempoSesion ?? '',
      frecuenciaLapso: (draft.frecuenciaLapso ?? 'Semana') as ActividadFisicaItem['frecuenciaLapso'],
      cantidadEnLapso: Number(draft.cantidadEnLapso ?? 0),
      tiempoVigencia: draft.tiempoVigencia ?? '1 mes',
    };
    append(item);
  };

  return (
    <Box>
      <Typography fontWeight={600} sx={{ mb: 1 }}>Hábitos</Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography fontWeight={600} sx={{ mb: 1 }}>Actividad Física</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Controller
            name="actividadDraft.tipo"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Tipo" fullWidth>
                <MenuItem value="Futbol">Fútbol</MenuItem>
                <MenuItem value="Gym">Gimnasio</MenuItem>
                <MenuItem value="Correr">Correr</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <Controller
            name="actividadDraft.tiempoSesion"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tiempo por sesión" placeholder="1 hs" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <Controller
            name="actividadDraft.frecuenciaLapso"
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
            name="actividadDraft.cantidadEnLapso"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Cantidad en lapso" type="number" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <Controller
            name="actividadDraft.tiempoVigencia"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Tiempo de vigencia" fullWidth>
                {tiempoLapso.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
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
              <TableCell>Tiempo dedicado</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Cantidad en lapso</TableCell>
              <TableCell>Tiempo de vigencia</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row, i) => {
              const actividad = actividades[i]; // valores actuales
              return (
                <TableRow key={row.id}>
                  <TableCell>{actividad?.tipo}</TableCell>
                  <TableCell>{actividad?.tiempoSesion}</TableCell>
                  <TableCell>{actividad?.frecuenciaLapso}</TableCell>
                  <TableCell>{actividad?.cantidadEnLapso}</TableCell>
                  <TableCell>{actividad?.tiempoVigencia}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => remove(i)}>Quitar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Step02ActividadFisica;
