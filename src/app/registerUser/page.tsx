"use client";

import React from 'react';
import { Box, TextField, Typography, Divider, Grid, IconButton, MenuItem, Avatar } from '@mui/material';
import { Upload } from '@mui/icons-material';
import Sidebar from '../components/sideBar/Sidebar';

const PatientInformation = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <Box sx={{ padding: 4, flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Información del Paciente
        </Typography>

        <Typography variant="h6" gutterBottom>
          Datos personales
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Apellido" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="DNI" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de ingreso"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sexo"
              select
              fullWidth
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de nacimiento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="Profile Picture"
              src="https://via.placeholder.com/150"
              sx={{ width: 150, height: 150, marginBottom: 1 }}
            />
            <IconButton component="label">
              <Upload />
              <input hidden accept="image/*" type="file" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientInformation;
