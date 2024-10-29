import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }: any) => {
  return (
    <div className="mb-4">
      <TextField
        label="Buscar pacientes"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={onSearchChange}
        InputProps={{ className: 'bg-white' }}
      />
    </div>
  );
};

export default SearchBar;
