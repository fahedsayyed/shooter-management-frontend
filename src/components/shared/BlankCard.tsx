import { Card } from '@mui/material';
// import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { AppState, useSelector } from 'src/store/Store';

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  // sx?: any;
};

const BlankCard = ({ children, className}: Props) => {
  // const customizer = useSelector((state: AppState) => state.customizer);

  // const theme = useTheme();
  // const borderColor = theme.palette.grey[100];

  return (
    <Card
      sx={{ p: 0, border: '1px solid #f2f2f2', boxShadow: '3', position: 'relative'}}
      className={className}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
