'use client'

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Avatar,
  Checkbox,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import { Upload } from '@mui/icons-material'
import Sidebar from '../components/sideBar/Sidebar'

const PatientInformation = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [isFemale, setIsFemale] = useState<boolean>(true);
  const [syndrome, setSyndrome] = useState<boolean>(true);
  const [menopause, setMenopause] = useState<boolean>(true);

  const [hereditaryDisease, setHereditaryDisease] = useState<string>('');
  const [hereditaryGrade, setHereditaryGrade] = useState<number>(0);
  const [hereditarySource, setHereditarySource] = useState<string>('');
  const [hereditaryList, setHereditaryList] = useState<Array<{ disease: string, grade: number, source: string }>>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSexoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFemale(event.target.value === 'Femenino');
  };

  const handleAddHereditary = () => {
    setHereditaryList(prev => [...prev, { disease: hereditaryDisease, grade: hereditaryGrade, source: hereditarySource }]);
    setHereditaryDisease('');
    setHereditaryGrade(0);
    setHereditarySource('');
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
      <Sidebar />

      <Box sx={{ padding: 4, flex: 1 }}>
        <Typography variant='h4' gutterBottom>
          Información del Paciente
        </Typography>

        <Typography variant='h6' gutterBottom>
          Datos personales
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='Nombre' placeholder='Ingrese el nombre del paciente' fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Apellido' placeholder='Ingrese el apellido del paciente' fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='DNI' placeholder='Ingrese el DNI del paciente' fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Fecha de ingreso' type='date' fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Sexo' select fullWidth onChange={handleSexoChange}>
                  <MenuItem value='Masculino'>Masculino</MenuItem>
                  <MenuItem value='Femenino'>Femenino</MenuItem>
                  <MenuItem value='Otro'>Otro</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label='Fecha de nacimiento' type='date' fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar alt="Profile Picture" src={avatar || "https://via.placeholder.com/150"} sx={{ width: 150, height: 150, mb: 1 }} />
            <IconButton component="label">
              <Upload />
              <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant='h6'>Ubicación</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField label='Domicilio' placeholder='Ingrese el domicilio' fullWidth /></Grid>
          <Grid item xs={12} sm={4}><TextField label='Localidad' placeholder='Ingrese la localidad' fullWidth /></Grid>
          <Grid item xs={12} sm={4}><TextField label='Barrio' placeholder='Ingrese el barrio' fullWidth /></Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant='h6'>Contacto</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label='Teléfono' placeholder='Ingrese el número de teléfono' fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label='Email' placeholder='Ingrese el correo electrónico' fullWidth /></Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant='h6'>Información adicional</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField label='Referencias' placeholder='Ingrese una referencia' fullWidth /></Grid>
          <Grid item xs={12} sm={4}>
            <TextField label='Obra social' select fullWidth>
              <MenuItem value='OSDE'>OSDE</MenuItem>
              <MenuItem value='Otra'>Otra</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}><TextField label='Comienzo de afección aproximado (meses)' type='number' placeholder='Ingrese el tiempo en meses' fullWidth /></Grid>
          <Grid item xs={12}>
            <TextField label='Motivo de la consulta' placeholder='Describa el motivo de consulta' fullWidth multiline rows={3} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant='h6'>Antecedentes Hereditarios</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField label='Tipo de enfermedad' value={hereditaryDisease} onChange={(e) => setHereditaryDisease(e.target.value)} placeholder='Ej: Diabetes' fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label='Grado' type='number' value={hereditaryGrade} onChange={(e) => setHereditaryGrade(parseInt(e.target.value))} placeholder='Ej: 1, 2, 3, 4' fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label='Parte de' value={hereditarySource} onChange={(e) => setHereditarySource(e.target.value)} placeholder='Ej: Madre, Padre' fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant='contained' onClick={handleAddHereditary} sx={{ height: '100%' }}>Agregar</Button>
          </Grid>
        </Grid>

        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo de enfermedad</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Parte de</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hereditaryList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.disease}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isFemale && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant='h6'>Antecedentes Tocoginecológicos</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}><TextField label='Embarazos' placeholder='Ingrese cantidad de embarazos' type='number' fullWidth /></Grid>
              <Grid item xs={12} sm={3}><TextField label='Partos' placeholder='Ingrese cantidad de partos' type='number' fullWidth /></Grid>
              <Grid item xs={12} sm={3}><TextField label='Cesáreas' placeholder='Ingrese cantidad de cesáreas' type='number' fullWidth /></Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel control={<Checkbox checked={syndrome} onChange={() => setSyndrome(!syndrome)} />} label='Síndrome premenstrual' />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Método anticonceptivo</InputLabel>
                  <Select value={'DIU'} label='Método anticonceptivo'>
                    <MenuItem value={'DIU'}>DIU</MenuItem>
                    <MenuItem value={'Píldora'}>Píldora</MenuItem>
                    <MenuItem value={'Otro'}>Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel control={<Checkbox checked={menopause} onChange={() => setMenopause(!menopause)} />} label='Menopausia' />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  )
}

export default PatientInformation;
