// src/features/sessions/components/Step05DigestionHabitos.tsx
'use client';
import React from 'react';
import {
  Box, Button, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { SessionForm, HabitoToxicoItem } from '../types/session';

const frecuencias = ['Día','Semana','Mes'] as const;

const Step05DigestionHabitos: React.FC = () => {
  // ✅ Tipar el formulario completo
  const { control, watch, getValues } = useFormContext<SessionForm>();

  // ✅ Tipar el field array para el path 'habitos.habitosToxicos'
  const { fields, append, remove } = useFieldArray<
    SessionForm,
    'habitos.habitosToxicos',
    'id'
  >({
    control,
    name: 'habitos.habitosToxicos',
  });

  // ✅ Valores vivos a renderizar (no uses `fields` para leer propiedades del item)
  const habitosToxicos = watch('habitos.habitosToxicos') ?? [];

  const handleAgregar = () => {
    const draft = getValues('toxicoDraft') as Partial<HabitoToxicoItem> | undefined;
    if (!draft || !draft.tipo) return; // validación mínima en UI

    const item: HabitoToxicoItem = {
      tipo: draft.tipo, // "Fumador" | "Alcohol" | ...
      frecuencia: (draft.frecuencia ?? 'Semana') as HabitoToxicoItem['frecuencia'],
      cantidad: Number(draft.cantidad ?? 0),
      vigenciaMeses: Number(draft.vigenciaMeses ?? 0),
      sintomatologia: draft.sintomatologia ?? '',
    };
    append(item);
  };

  return (
    <Box>
      <Typography fontWeight={600}>Digestión</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Controller
            name="digestion.frecuencia"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Frecuencia" fullWidth>
                {frecuencias.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Controller
            name="digestion.cantidadEnLapso"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Cantidad en lapso" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="digestion.estado"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Estado habitual" fullWidth>
                <MenuItem value="Solido">Sólido</MenuItem>
                <MenuItem value="Blandas">Blandas</MenuItem>
                <MenuItem value="Diarreicas">Diarreicas</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="digestion.sintomas"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Síntomas" placeholder="Cólicos, etc." fullWidth />
            )}
          />
        </Grid>
      </Grid>

      <Typography fontWeight={600} sx={{ mt: 3 }}>Hábitos tóxicos</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Controller
            name="toxicoDraft.tipo"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Tipo" fullWidth>
                <MenuItem value="Fumador">Fumador</MenuItem>
                <MenuItem value="Alcohol">Alcohol</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Controller
            name="toxicoDraft.frecuencia"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Frecuencia en lapso" fullWidth>
                {frecuencias.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Controller
            name="toxicoDraft.cantidad"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Cantidad en lapso" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Controller
            name="toxicoDraft.vigenciaMeses"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Vigencia (meses)" type="number" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="toxicoDraft.sintomatologia"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Sintomatología percibida" fullWidth />
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
              <TableCell>Frecuencia</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell>Sintomatología</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row, i) => {
              const item = habitosToxicos[i]; // ✅ valores actuales del form
              return (
                <TableRow key={row.id}>
                  <TableCell>{item?.tipo}</TableCell>
                  <TableCell>{item?.frecuencia}</TableCell>
                  <TableCell>{item?.cantidad}</TableCell>
                  <TableCell>{item?.vigenciaMeses} meses</TableCell>
                  <TableCell>{item?.sintomatologia}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => remove(i)}>Quitar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} display="flex" gap={2}>
        <Button variant="outlined">Calcular niveles actuales</Button>
      </Box>
    </Box>
  );
};

export default Step05DigestionHabitos;
