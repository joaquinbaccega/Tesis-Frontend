'use client';
import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const Step06Revision: React.FC = () => {
  const { getValues } = useFormContext();
  const datos = getValues(); // podrías renderizar un resumen si querés

  return (
    <Box>
      <Typography fontWeight={600}>Revisión</Typography>
      <Divider sx={{ mb: 2 }} />
      {/* Aquí podés mostrar un resumen o PDF preview */}
      <Box display="flex" gap={2}>
        <Button variant="outlined">Volver y editar</Button>
        <Button variant="contained">Iniciar</Button>
      </Box>
    </Box>
  );
};
export default Step06Revision;
