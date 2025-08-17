'use client';

import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import Wizard from '../features/sessions/components/Wizard';

const ComenzarSesionPage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Sesión en curso</Typography>
        <Paper sx={{ p: 2 }}>
          <Wizard />
        </Paper>
      </Container>
    </Box>
  );
};

export default ComenzarSesionPage;
