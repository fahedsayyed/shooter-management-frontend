import React /* useState */ from "react";
// import { Theme, useTheme } from '@mui/material/styles';
import {
  //   Button,
  OutlinedInput /* Box, TextField, */,
  FormControl,
  InputLabel,
  Select,
  Stack,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import CustomOutlinedInput from "src/utils/theme-elements/CustomOutlinedInput";
import { IconUser } from "@tabler/icons";
import { SelectChangeEvent } from "@mui/material/Select";
import { IWeaponDetailsProps } from "src/types/Athletes";
// import AddIcon from '@mui/icons-material/Add';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;



const WeaponDetail: React.FC<IWeaponDetailsProps> = ({ key }) => {
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    e.preventDefault();
    // Handle change logic
  };

  return (
    <Stack key={key} direction="row" alignItems="center" justifyContent="center" spacing={3}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          }}
        >
          <MenuItem value="10meter">10 Meter Rifle</MenuItem>
          <MenuItem value="20meter">20 Meter Rifle</MenuItem>
          <MenuItem value="30meter">30 Meter Rifle</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="make-weapon"
          placeholder="Make.."
          fullWidth
        />
      </FormControl>

      <FormControl>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="model-type"
          placeholder="Model.."
          fullWidth
        />
      </FormControl>

      <FormControl>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="caliber"
          placeholder="Caliber.."
          fullWidth
        />
      </FormControl>

      <FormControl>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="serial-type"
          placeholder="Serial No.."
          fullWidth
        />
      </FormControl>
    </Stack>
  );
};

export default WeaponDetail;
