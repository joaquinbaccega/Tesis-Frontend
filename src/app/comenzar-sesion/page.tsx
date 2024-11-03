"use client"

import { Upload } from '@mui/icons-material';
import { Avatar, Box, Divider, Grid, IconButton, MenuItem, TextField, Typography, Slider } from '@mui/material';
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
            value: 'Minutos',
            label: 'Minutos',
        },
        {
            value: 'Horas',
            label: 'Horas',
        },
        {
            value: 'Dias',
            label: 'Dias',
        },
        {
            value: 'Semanas',
            label: 'Semanas',
        },

    ];

    const comidas = [
        { value: 'carne', label: 'Carne' },
        { value: 'vegetales', label: 'Vegetales' },
        { value: 'pescado', label: 'Pescado' }
    ];
    
    const clases = [
        { value: 'vaca', label: 'Vaca' },
        { value: 'pollo', label: 'Pollo' },
        { value: 'cerdo', label: 'Cerdo' }
    ];
    
    const formasIngesta = [
        { value: 'frito', label: 'Frito' },
        { value: 'hervido', label: 'Hervido' },
        { value: 'crudo', label: 'Crudo' }
    ];

    const sintomas = [
        { value: 'Dolor', label: 'Dolor' },
        { value: 'Hinchazon', label: 'Hinchazon' },
        { value: 'Acidez', label: 'Acidez' }
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
                        <TextField select sx={{ width: "180px" }} defaultValue={"caminar"}>
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
                        <TextField type='number' label="1Hs" sx={{ width: "50%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Frecuencia de lapso
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"semana"}>

                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Cantidad de lapso
                        </Typography>
                        <TextField type='number' sx={{ width: "150px" }} defaultValue={1} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            ¿Cuál es su edad?
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>



                </Grid>



                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Actividad laboral/Profesion
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Tipo de actividad
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"caminar"}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Estilo de actividad
                        </Typography>
                        <TextField type='number' label="1Hs" sx={{ width: "50%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Frecuencia en lapso
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"semana"}>

                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Cantidad de lapso
                        </Typography>
                        <TextField type='number' sx={{ width: "150px" }} defaultValue={1} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Tiempo de vigencia
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>



                </Grid>


                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Sueño
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Cantidad de horas de sueño
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"caminar"}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Calidad de sueño
                        </Typography>
                        <TextField type='number' label="1Hs" sx={{ width: "50%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Horario habitual
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"semana"}>

                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
 
                </Grid>

                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Alimentacion
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item>
                        <Typography variant="body1" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Comidas predominantes por semana
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue="carne">
                            {comidas.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item>
                        <Typography variant="body1" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Porcentaje
                        </Typography>
                        <TextField type="number" sx={{ width: "100px" }} defaultValue={20} InputProps={{ endAdornment: '%' }} />
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Forma de ingesta
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue="frito">
                            {formasIngesta.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant="body1" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Nivel de cocción
                        </Typography>
                        <Slider defaultValue={50} aria-label="Nivel de cocción" sx={{ width: "180px" }} />
                    </Grid>

                </Grid>




                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Digestion
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Frecuencia en lapso
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"caminar"}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Cantidad en lapso
                        </Typography>
                        <TextField type='number' label="1Hs" sx={{ width: "50%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Estado Habitual
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"semana"}>

                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Sintomas 
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"Dolor"}>
                        {sintomas.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
 
                </Grid>
s

                <Typography variant="h6" gutterBottom style={{ color: "black", fontWeight: 'bold', marginTop: '30px' }}>
                    Habitos Toxicos
                </Typography>

                <Divider sx={{ marginBottom: 3 }} />

                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Tipo
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"caminar"}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Frecuencia en lapso
                        </Typography>
                        <TextField type='number' label="1Hs" sx={{ width: "50%" }} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Cantidad en lapso
                        </Typography>
                        <TextField select sx={{ width: "180px" }} defaultValue={"semana"}>

                            {lapso.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Tiempo vigencia
                        </Typography>
                        <TextField type='number' sx={{ width: "150px" }} defaultValue={1} />
                    </Grid>


                    <Grid item sx={{ marginRight: 'auto' }}>
                        <Typography variant="h6" gutterBottom style={{ color: "black", textAlign: 'start' }}>
                            Sintomatologia percibida
                        </Typography>
                        <TextField type='number' sx={{ width: "auto" }} />
                    </Grid>



                </Grid>

                    
            </Box>

        </Box>
    )
};


export default sesiónStarted;