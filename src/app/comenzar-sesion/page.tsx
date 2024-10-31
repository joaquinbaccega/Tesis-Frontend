"use client"

import { Upload } from '@mui/icons-material';
import { Avatar, Box, Divider, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar/Sidebar';

const sesiónStarted = () => {

    const currencies = [
        {
          value: 'Futbol',
          label: 'Futbol',
        },
        {
          value: 'Golf',
          label: 'Golf',
        },
        {
          value: 'Rugby',
          label: 'Rugby',
        },
        {
          value: 'Voleibol',
          label: 'Voleibol',
        },
        {
          value: 'Basketball',
          label: 'Basketball',
        },
        {
          value: 'Tenis',
          label: 'Tenis',
        },
        {
          value: 'Fútbol',
          label: 'Fútbol',
        },
        {
          value: 'Cricket',
          label: 'Cricket',
        },
        {
          value: 'Hockey',
          label: 'Hockey',
        },
        {
          value: 'Football',
          label: 'Football',
        },
      ];

      const lapso = [
        {
          value: 'Dias',
          label: 'Dias',
        },
        {
          value: 'Horas',
          label: 'Horas',
          },
        {
          value: 'Minutos',
          label: 'Minutos',
        },
        {
          value: 'Semanas',
          label: 'Semanas',
        },

      ];
    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
            {/* Barra lateral */}
            <Sidebar />

            {/* Contenido principal */}
            <Box sx={{ padding: 4, flex: 1 }}>
                <Typography variant="h4" gutterBottom style={{ color: "black" }}>
                    Sesion en curso
                </Typography>

                <Divider sx={{ marginBottom: 5 }} />

                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold' }}>
                    Caracteristicas
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Edad
                        </Typography>
                        <TextField type='number' sx={{ width: "100px" }} />
                    </Grid>
                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Peso
                        </Typography>
                        <TextField type='number' sx={{ width: "100px" }} />
                    </Grid>
                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Altura
                        </Typography>
                        <TextField type='number' sx={{ width: "100px" }} />
                    </Grid>
                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Porcentaje de grasa
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>
                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Porcentaje de masa muscular
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>
                </Grid>


                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Habitos
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Actividad fisica
                        </Typography>
                        <TextField select sx={{ width: "180px" }} label="Actividad fisica
">
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Tiempo dedicado por sesion
                        </Typography>
                        <TextField type='number' label="1Hs" sx={{ width: "100%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Frecuencia de lapso
                        </Typography>
                        <TextField select sx={{ width: "180px" }} label="Frecuencia de lapso">
                            
                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            ¿Cuál es su edad?
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            ¿Cuál es su edad?
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>



                </Grid>
            </Box>


        </Box>
    )
};


export default sesiónStarted;