'use client'
import React, { useState } from 'react'
import { Box, Typography, Button, Grid, Modal, TextField, Select, MenuItem } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from '../components/sideBar/Sidebar';

const horas = Array.from({ length: 12 }, (_, i) => 9 + i)
const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

// --- CAMBIO: Se elimina el color para 'cancelado' ya que no se usará ---
const estadosColor = {
  confirmado: '#ffcccb',
  pendiente: '#fff3cd',
}

const Calendar = () => {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [open, setOpen] = useState(false)
  const [selectedTurno, setSelectedTurno] = useState<SelectedTurno | null>(null)
  // --- CAMBIO: El estado ya no incluye 'cancelado' ---
  const [form, setForm] = useState<Turno>({ paciente: '', profesional: '', estado: 'confirmado', dia: '', hora: 0 })

  interface Turno {
    paciente: string;
    profesional: string;
    // --- CAMBIO: Se elimina el tipo 'cancelado' ---
    estado: 'confirmado' | 'pendiente';
    dia: string;
    hora: number;
  }

  interface SelectedTurno {
    dia: string;
    hora: number;
  }

  const handleOpen = (dia: string, hora: number): void => {
    const existingTurno: Turno | undefined = getTurno(dia, hora);
    if (existingTurno) {
        setForm(existingTurno);
    } else {
        setForm({ paciente: '', profesional: '', estado: 'confirmado', dia, hora });
    }
    setSelectedTurno({ dia, hora });
    setOpen(true);
  }

  const handleSave = () => {
    setTurnos(prev => {
      const otherTurnos = prev.filter(t => !(t.dia === form.dia && t.hora === form.hora));
      return [...otherTurnos, form];
    });
    setOpen(false);
  }

  // --- CAMBIO: Nueva función para ELIMINAR el turno ---
  const handleDeleteTurno = () => {
    if (!selectedTurno) return; // Seguridad por si no hay turno seleccionado

    // Filtramos el array, manteniendo todos los turnos EXCEPTO el que se quiere eliminar
    setTurnos(prev =>
        prev.filter(
            t => !(t.dia === selectedTurno.dia && t.hora === selectedTurno.hora)
        )
    );
    setOpen(false); // Cerramos el modal
  };

  // --- CAMBIO: La función handleCancelTurno ya no es necesaria y se elimina ---

  const getTurno = (dia: string, hora: number): Turno | undefined =>
    turnos.find((t: Turno) => t.dia === dia && t.hora === hora);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
        <Typography variant='h4' fontWeight='bold' mb={4}>Turnos</Typography>
        <Grid container spacing={0} sx={{ border: '1px solid #ccc' }}>
          <Grid item xs={1} sx={{ borderRight: '1px solid #ccc' }}>
            <Box>
              <Typography variant='subtitle2' fontWeight='bold' textAlign='center' mb={2} sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Horas</Typography>
              {horas.map(hora => (
                <Box key={hora} sx={{ height: 80, borderTop: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{hora}:00</Box>
              ))}
            </Box>
          </Grid>
          {dias.map(dia => (
            <Grid item xs key={dia} sx={{ borderRight: '1px solid #ccc' }}>
              <Typography variant='subtitle2' fontWeight='bold' textAlign='center' mb={2} sx={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{dia}</Typography>
              {horas.map(hora => {
                const turno = getTurno(dia, hora)
                return (
                  <Box
                    key={hora}
                    onClick={() => handleOpen(dia, hora)}
                    sx={{
                      height: 80,
                      borderTop: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: turno ? '#000' : '#66bb6a',
                      backgroundColor: turno ? estadosColor[turno.estado] : 'transparent',
                      transition: 'background-color 0.3s',
                      '&:hover': { backgroundColor: turno ? estadosColor[turno.estado] : '#e0f2f1' }
                    }}
                  >
                    {turno ? turno.paciente : 'Disponible'}
                  </Box>
                )
              })}
            </Grid>
          ))}
        </Grid>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant='h6' fontWeight='bold'>Turno</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon />
              <TextField
                fullWidth
                placeholder='Paciente'
                value={form.paciente}
                onChange={(e) => setForm({ ...form, paciente: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonthIcon />
              <Typography>{selectedTurno?.dia}</Typography>
              <AccessTimeIcon />
              <Typography>{selectedTurno?.hora}:00 Hs</Typography>
            </Box>
            <Select
              fullWidth
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value as Turno['estado'] })}
            >
              <MenuItem value='confirmado'>Confirmado</MenuItem>
              <MenuItem value='pendiente'>Pendiente</MenuItem>
              {/* --- CAMBIO: Se elimina la opción 'Cancelado' del select --- */}
            </Select>

            {/* --- CAMBIO: Se añade un contenedor para los botones --- */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSave}
                sx={{ flexGrow: 1, fontWeight: 'bold' }}
              >
                {/* Se cambia el texto para ser más genérico */}
                Guardar
              </Button>
              {/* --- CAMBIO: Este botón solo aparece si hay un paciente en el formulario (es decir, un turno existente) --- */}
              {form.paciente && (
                 <Button
                    variant='outlined'
                    color='error'
                    onClick={handleDeleteTurno}
                    sx={{ flexGrow: 1, fontWeight: 'bold' }}
                 >
                    Cancelar Turno
                 </Button>
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default Calendar