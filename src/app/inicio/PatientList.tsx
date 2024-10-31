import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TablePagination
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ConfirmDialog from '../components/confirmationDialogs/deletePatientDialog';
import { useRouter } from "next/navigation";
import { ro } from 'date-fns/locale';

const PatientList = ({ patients }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Cantidad de registros por página
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>, patient: Array<any>) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log('Paciente eliminado:', selectedPatient);
    handleCloseDialog();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtrar pacientes según la página actual y la cantidad de registros por página
  const paginatedPatients = patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
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
          {paginatedPatients.map((patient: any) => (
            <TableRow key={patient.dni}>
              <TableCell>{patient.dni}</TableCell>
              <TableCell>{patient.nombre}</TableCell>
              <TableCell>{patient.apellido}</TableCell>
              <TableCell>{patient.fecha}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleClick(event, patient)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => router.push('/comenzar-sesion')}>Empezar la sesión</MenuItem>
                  <MenuItem onClick={handleOpenDialog}>Eliminar</MenuItem>
                  <MenuItem onClick={() => console.log('Editar')}>Editar</MenuItem>
                  <MenuItem onClick={() => router.push('/registerUser')}>Ver datos</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Agregar paginación */}
      <TablePagination
        component="div"
        count={patients.length} // Total de registros
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Registros por página"
      />

      <ConfirmDialog
        open={openDialog}
        title="¿Desea eliminar al paciente?"
        content="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
      />
    </TableContainer>
  );
};

export default PatientList;
