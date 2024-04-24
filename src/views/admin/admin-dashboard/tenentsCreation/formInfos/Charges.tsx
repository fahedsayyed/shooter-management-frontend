import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CustomTextField from 'src/utils/theme-elements/CustomTextField';
import { Button, Grid, Stack, Typography, Checkbox } from '@mui/material';
import axiosServices from 'src/utils/axios';

interface Master {
  id: number;
  name: string;
}

interface InputValues {
  price: string;
  name: string;
}

export default function Charges() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [inputValues, setInputValues] = useState<InputValues[]>([]);
  const stateRows = useSelector((state: any) => state.tenent.stateRows);

  useEffect(() => {
    axiosServices.get('/tenants/get-all-masters').then((res) => {
      const initialInputValues: InputValues[] = res.data.masters.map((master: Master) => ({
        price: '',
        name: master.name,
      }));
      setInputValues(initialInputValues);
      setMasters(res.data.masters);
    });
  }, []);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValues((prevInputValues) =>
      prevInputValues.map((input, i) => (i === index ? { ...input, price: value } : input))
    );
  };

  const handleDraft = () => {
    const draftData: any = JSON.parse(localStorage.getItem('draftData') || '{}');
    masters.forEach((master, index) => {
      const price = parseInt(inputValues[index]?.price, 10) || 0;
      draftData[master.id] = {
        price,
        name: inputValues[index]?.name || '',
      };
    });
    localStorage.setItem('draftData', JSON.stringify(draftData));
  };

  return (
    <div>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Typography sx={{ marginLeft: '20px' }}>Module Name</Typography>
        {masters.map((master, index) => (
          <ListItem key={master.id}>
            <ListItemButton>
              <Checkbox
                checked={Boolean(inputValues[index]?.price)}
                onChange={(event) => handleInputChange(index, event)}
              />
              <ListItemText primary={master.name} />
            </ListItemButton>
            <Grid>
              <CustomTextField
                label={'Price'}
                sx={{ width: '176px' }}
                value={inputValues[index]?.price || ''}
                onChange={(event: any) => handleInputChange(index, event)}
              />
            </Grid>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', position: 'relative', top: '60px' }} mt={3}>
        <Button onClick={handleDraft} variant="contained" color={'secondary'}>
          Draft
        </Button>
      </Stack>
    </div>
  );
}
