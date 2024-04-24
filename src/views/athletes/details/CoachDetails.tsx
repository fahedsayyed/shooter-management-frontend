import React /* useState */ from "react";
// import { Theme, useTheme } from '@mui/material/styles';
import { FormControl, Stack, InputAdornment } from "@mui/material";
import CustomOutlinedInput from "src/utils/theme-elements/CustomOutlinedInput";
import { IconUser } from "@tabler/icons";
import { Label } from "reactstrap";
import { ICoachDetailsProps } from "src/types/Athletes";
// import AddIcon from '@mui/icons-material/Add';

const CoachDetails: React.FC<ICoachDetailsProps> = ({ key }) => {
  return (
    <Stack key={key} direction="row" alignItems="center" justifyContent="center" sx={{ mb: 1 }} spacing={3}>
      <FormControl>
        <Label>Coach Name</Label>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="make-weapon"
          placeholder="Coach name.."
          fullWidth
        />
      </FormControl>

      <FormControl>
        <Label>FROM</Label>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="model-type"
          type="Date"
          fullWidth
        />
      </FormControl>

      <FormControl>
        <Label>TO</Label>
        <CustomOutlinedInput
          startadornment={
            <InputAdornment position="start">
              <IconUser size="20" />
            </InputAdornment>
          }
          id="caliber"
          type="Date"
          fullWidth
        />
      </FormControl>
    </Stack>
  );
};

export default CoachDetails;
