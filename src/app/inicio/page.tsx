"use client";
import React, { useState, useMemo } from 'react';
import { Box, Typography, Divider, Container } from '@mui/material';
import Sidebar from '../components/sideBar/Sidebar';
import SearchBar from './SearchBar';
import PatientList from './PatientList';

const patientsData = [
  { dni: '35929846', nombre: 'Lautaro', apellido: 'Gozalvez Garay', fecha: '14/06/2024' },
  { dni: '62568156', nombre: 'Pedro', apellido: 'Acosta', fecha: '14/06/2024' },
  { dni: '4028648', nombre: 'Gustavo', apellido: 'Ruiz', fecha: '14/06/2024' },
  { dni: '3952818', nombre: 'Marcos', apellido: 'Trego', fecha: '14/06/2024' },
  { dni: '4233617', nombre: 'Maria', apellido: 'Perez', fecha: '14/06/2024' },
  { dni: '36927846', nombre: 'Lucia', apellido: 'Gomez', fecha: '20/07/2024' },
  { dni: '31568156', nombre: 'Jorge', apellido: 'Martinez', fecha: '11/06/2024' },
  { dni: '4823648', nombre: 'Ana', apellido: 'Fernandez', fecha: '14/08/2024' },
  { dni: '3939818', nombre: 'Carla', apellido: 'Lopez', fecha: '02/07/2024' },
  { dni: '4233698', nombre: 'Marta', apellido: 'Diaz', fecha: '14/06/2024' },
  { dni: '39929846', nombre: 'Sofia', apellido: 'Herrera', fecha: '10/08/2024' },
  { dni: '68568156', nombre: 'Ricardo', apellido: 'Benitez', fecha: '30/05/2024' },
  { dni: '4628648', nombre: 'Miguel', apellido: 'Vargas', fecha: '21/06/2024' },
  { dni: '3952819', nombre: 'Patricia', apellido: 'Sanchez', fecha: '05/07/2024' },
  { dni: '4233618', nombre: 'Andrea', apellido: 'Mendez', fecha: '25/06/2024' },
  { dni: '32929846', nombre: 'Emilio', apellido: 'Gonzalez', fecha: '18/07/2024' },
  { dni: '63568156', nombre: 'Isabel', apellido: 'Ramos', fecha: '27/06/2024' },
  { dni: '4328648', nombre: 'Diego', apellido: 'Rojas', fecha: '19/07/2024' },
  { dni: '3939819', nombre: 'Fernanda', apellido: 'Castro', fecha: '01/08/2024' },
  { dni: '4233699', nombre: 'Sebastian', apellido: 'Morales', fecha: '09/07/2024' },
  { dni: '31929846', nombre: 'Laura', apellido: 'Ortiz', fecha: '17/08/2024' },
  { dni: '62558156', nombre: 'Luis', apellido: 'Silva', fecha: '29/06/2024' },
  { dni: '4928648', nombre: 'Natalia', apellido: 'Rios', fecha: '06/08/2024' },
  { dni: '3752818', nombre: 'Daniel', apellido: 'Aguero', fecha: '03/07/2024' },
  { dni: '4233696', nombre: 'Valentina', apellido: 'Torres', fecha: '12/07/2024' }
];


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar los cambios en la búsqueda
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar la lista de pacientes en base al término de búsqueda
  const filteredPatients = useMemo(() => {
    return patientsData.filter((patient) => {
      const fullName = `${patient.nombre} ${patient.apellido}`.toLowerCase();
      return (
        patient.dni.includes(searchTerm) ||
        fullName.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <Box display="flex" flex={1} bgcolor="grey.100">
        <Divider orientation="vertical" flexItem />

        <Container sx={{ padding: '24px' }}>
          <Typography variant="h4" gutterBottom>
            Listado de pacientes
          </Typography>

          {/* Layout principal */}
          <Box display="flex" gap="16px">
            {/* Barra de búsqueda */}
            <Box flexShrink={0} width="25%">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </Box>

            {/* Barra divisoria */}
            <Divider orientation="vertical" flexItem />

            {/* Tabla de pacientes */}
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
