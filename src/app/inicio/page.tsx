"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Divider, Container } from '@mui/material';
import Sidebar from '../components/sideBar/Sidebar';
import SearchBar from './SearchBar';
import PatientList from './PatientList';
import api from '../../services/api';

interface PacienteResumenDto {
  dni: string;
  nombre: string;
  apellido: string;
  fechaingreso: string;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientsData, setPatientsData] = useState<PacienteResumenDto[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/Paciente/Resumen');
        setPatientsData(response.data);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = useMemo(() => {
  return patientsData.filter((patient) => {
    const fullName = `${patient.nombre} ${patient.apellido}`.toLowerCase();
    return (
      patient.dni.toString().includes(searchTerm) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  });
}, [searchTerm, patientsData]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box display="flex" flex={1} bgcolor="grey.100">
        <Container sx={{ padding: '24px', color: 'black' }}>
          <Typography variant="h4" gutterBottom>
            Listado de pacientes
          </Typography>
          <Box display="flex" gap="16px">
            <Box flexShrink={0} width="25%">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex={1}>
              <PatientList patients={filteredPatients} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
