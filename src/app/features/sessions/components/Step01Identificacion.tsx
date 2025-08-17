'use client';
import React from 'react';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import AsyncAutocomplete from './AsyncAutocomplete';
import { useAsyncOptions } from '../hooks/useAsyncOptions';
import { fetchPacientes } from '../services/combos.api';

const Step01Identificacion: React.FC = () => {
  const { control, setValue, watch } = useFormContext();
  const pacienteId = watch('pacienteId');
  const pacientes = useAsyncOptions({ loader: fetchPacientes, cacheKey: 'pacientes' });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Sesión en curso</Typography>

      <Typography sx={{ mt: 2, mb: 1 }} fontWeight={600}>Buscar Paciente por DNI</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <AsyncAutocomplete
            label="DNI / Paciente"
            value={pacienteId}
            options={pacientes.options}
            loading={pacientes.loading}
            onChange={(v) => setValue('pacienteId', v)}
            onInputChange={pacientes.setQuery}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="fecha"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Fecha" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="profesionalId"
            control={control}
            render={({ field }) => <TextField {...field} label="Profesional (ID)" fullWidth />}
          />
        </Grid>
      </Grid>

      <Typography sx={{ mt: 3, mb: 1 }} fontWeight={600}>Características</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <Controller name="caracteristicas.edad" control={control}
            render={({ field }) => <TextField {...field} label="Edad" type="number" fullWidth />} />
        </Grid>
        <Grid item xs={6} md={2}>
          <Controller name="caracteristicas.pesoKg" control={control}
            render={({ field }) => <TextField {...field} label="Peso (Kg)" type="number" fullWidth />} />
        </Grid>
        <Grid item xs={6} md={2}>
          <Controller name="caracteristicas.alturaM" control={control}
            render={({ field }) => <TextField {...field} label="Altura (m)" type="number" fullWidth />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Controller name="caracteristicas.porcentajeGrasa" control={control}
            render={({ field }) => <TextField {...field} label="% Grasa" type="number" fullWidth />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Controller name="caracteristicas.porcentajeMasaMuscular" control={control}
            render={({ field }) => <TextField {...field} label="% Masa muscular" type="number" fullWidth />} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step01Identificacion;
