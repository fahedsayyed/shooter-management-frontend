import React from 'react';
import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = styled((props: any) => <Select {...props} />)(({}) => ({
  border: '1px solid #ccc',
  borderRadius: '8px',
  '&:focus': {
    borderColor: '#555',
  },
}));

export default CustomSelect;