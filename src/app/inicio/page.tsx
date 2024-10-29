"use client"
import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sideBar/Sidebar';
import SearchBar from './SearchBar';
import PatientList from './PatientList';

const patientsData = [
  { dni: '35929846', nombre: 'Lautaro', apellido: 'Gozalvez Garay', fecha: '14/06/2024' },
  { dni: '62568156', nombre: 'Pedro', apellido: 'Acosta', fecha: '14/06/2024' },
  { dni: '4028648', nombre: 'Gustavo', apellido: 'Ruiz', fecha: '14/06/2024' },
  { dni: '3952818', nombre: 'Marcos', apellido: 'Trego', fecha: '14/06/2024' },
  { dni: '4233617', nombre: 'Maria', apellido: 'Perez', fecha: '14/06/2024' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar los cambios en la búsqueda
  const handleSearchChange = (event:any) => {
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
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ width: '3px', backgroundColor: 'black' }}></div>

      <div style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f3f4f6' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Listado de pacientes</h1>
        {/* Layout principal */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Barra de búsqueda */}
          <div style={{ flexShrink: 0, width: '25%' }}>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>

          {/* Barra divisoria */}
          <div style={{ width: '1px', backgroundColor: '#9ca3af' }}></div>

          {/* Tabla de pacientes */}
          <div style={{ flex: 1 }}>
            <PatientList patients={filteredPatients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
