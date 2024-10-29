import React from 'react';
import { Button } from '@mui/material';
import '../../public/Styles/MainSection.css'; // Asegúrate de tener el archivo CSS en el mismo directorio

const MainSection = () => {
  return (
    <section className="main-section flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">TODOS TUS PACIENTES EN EL MISMO LUGAR</h1>
      <p className="text-lg mb-8">
        Lleva los registros y todas las sesiones de tus pacientes en el mismo sistema. 
        Análisis de los datos con IA, cálculos avanzados y mucho más.
      </p>
      <div className="flex space-x-4">
        <Button variant="contained" color="primary" className="bg-blue-600">
          Solicitar Demo Gratis
        </Button>
        <Button variant="outlined" color="inherit">
          Saber más
        </Button>
      </div>
    </section>
  );
};

export default MainSection;
