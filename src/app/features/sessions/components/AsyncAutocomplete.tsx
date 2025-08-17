// src/features/sessions/components/AsyncAutocomplete.tsx
'use client';
import React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

type Option = { id: string; label: string };

interface Props {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: Option[];
  loading: boolean;
  onInputChange: (q: string) => void;
}

const AsyncAutocomplete: React.FC<Props> = ({
  label, value, onChange, options, loading, onInputChange,
}) => {
  const selected = options.find(o => o.id === value) ?? null;

  return (
    <Autocomplete
      options={options}
      value={selected}
      onChange={(_, val) => onChange(val?.id ?? null)}
      onInputChange={(_, newInput) => onInputChange(newInput)}
      getOptionLabel={(o) => o.label}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
