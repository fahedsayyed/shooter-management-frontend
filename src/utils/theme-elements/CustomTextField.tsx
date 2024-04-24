import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .css-7v3uo2-MuiInputBase-root-MuiOutlinedInput-root': {
    // border: '1px solid #ccc',
    // borderRadius: '8px',
  },
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[800],
  },
  '& .css-7v3uo2-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    // border: 'none',
    border: '1.3px solid #ccc',
    borderRadius: '8px',
  }
}));

export default CustomTextField;
