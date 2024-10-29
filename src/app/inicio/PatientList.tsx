import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PatientList = ({ patients }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Fecha de alta</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient:any) => (
            <TableRow key={patient.dni}>
              <TableCell>{patient.dni}</TableCell>
              <TableCell>{patient.nombre}</TableCell>
              <TableCell>{patient.apellido}</TableCell>
              <TableCell>{patient.fecha}</TableCell>
              <TableCell>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientList;
