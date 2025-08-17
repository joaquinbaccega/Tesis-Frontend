// src/features/sessions/components/Step04Alimentacion.tsx
'use client';
import React from 'react';
import {
  Box, Button, Divider, Grid, MenuItem, Paper, Slider, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import type { SessionForm, AlimentacionItem } from '../types/session';

const clases = ['Vaca','Pollo','Pescado','Vegetales','Cereales'] as const;
const formas = ['Hervido','Frito','Horno','Crudo'] as const;

const Step04Alimentacion: React.FC = () => {
  // Tipar el formulario completo
  const { control, watch, getValues } = useFormContext<SessionForm>();

  // Tipar el field array del path 'habitos.alimentacion'
  const { fields, append, remove } = useFieldArray<
    SessionForm,
    'habitos.alimentacion',
    'id'
  >({
    control,
    name: 'habitos.alimentacion',
  });

  // Valores vivos a renderizar
  const alimentos = watch('habitos.alimentacion') ?? [];

  const handleAgregar = () => {
    const draft = getValues('alimentoDraft') as Partial<AlimentacionItem> | undefined;
    if (!draft || !draft.comida) return; // validación mínima

    const item: AlimentacionItem = {
      comida: draft.comida,
      clase: draft.clase ?? 'Vaca',
      porcentaje: Number(draft.porcentaje ?? 0),
      formaIngesta: draft.formaIngesta ?? 'Hervido',
      nivelCoccion: Number(draft.nivelCoccion ?? 0),
    };
    append(item);
  };

  return (
    <Box>
      <Typography fontWeight={600}>Alimentación</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Controller
            name="alimentoDraft.comida"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Comidas predominantes por semana" placeholder="Carne" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Controller
            name="alimentoDraft.clase"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Clase" fullWidth>
                {clases.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Controller
            name="alimentoDraft.porcentaje"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Porcentaje" type="number" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Controller
            name="alimentoDraft.formaIngesta"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Forma de ingesta" fullWidth>
                {formas.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Controller
            name="alimentoDraft.nivelCoccion"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography variant="caption">Nivel de cocción</Typography>
                <Slider
                  value={Number(field.value ?? 0)}
                  onChange={(_, v) => field.onChange(Array.isArray(v) ? v[0] : v)}
                  min={0}
                  max={100}
                />
              </Box>
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
              <TableCell>Comida</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Porcentaje</TableCell>
              <TableCell>Forma de ingesta</TableCell>
              <TableCell>Nivel de cocción</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((row, i) => {
              const item = alimentos[i]; // valores actuales del form
              return (
                <TableRow key={row.id}>
                  <TableCell>{item?.comida}</TableCell>
                  <TableCell>{item?.clase}</TableCell>
                  <TableCell>{item?.porcentaje}%</TableCell>
                  <TableCell>{item?.formaIngesta}</TableCell>
                  <TableCell>{item?.nivelCoccion}</TableCell>
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

export default Step04Alimentacion;
