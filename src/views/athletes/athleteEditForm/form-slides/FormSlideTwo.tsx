import React, { useState } from "react";
import { Button, Grid, InputAdornment, MenuItem, Paper, FormControl, FormHelperText } from "@mui/material";

import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { IconUser, IconAddressBook, IconPin, IconStretching } from "@tabler/icons";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { notifyMessage } from "src/utils/toastNotify";
import FileUpload from "src/components/upload-file/UploadFile";

const cities = [
  {
    value: "india",
    label: "India",
  },
  {
    value: "uk",
    label: "United Kingdom",
  },
  {
    value: "srilanka",
    label: "Srilanka",
  },
];

interface FormData {
  state: string;
  maritalStatus: string;
  motherName: string;
  fatherName: string;
  spouseName: string;
  address: string;
  pincode: string;
  weight: string;
  height: string;
  tshirtSize: string;
  trackSuit: string;
  shoesSize: string;
  city: string;
}

const FormSlideTwo = () => {
  const initialFormData: FormData = {
    state: "Maharashtra",
    maritalStatus: "single",
    motherName: "",
    fatherName: "",
    spouseName: "",
    address: "",
    pincode: "",
    weight: "",
    height: "",
    tshirtSize: "",
    trackSuit: "",
    shoesSize: "",
    city: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const { motherName, fatherName, pincode, address } = formData;
  const selectedFields = { motherName, fatherName, address, pincode };

  const singleError = (fieldName: keyof FormData) => {
    const newErrors = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: { [key in keyof FormData]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof FormData) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
  });

  const finalError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  const handleSaveAndDraft = () => {
    finalError();

    const check = Object.values(selectedFields).every((mes) => mes !== "");
    !check ? notifyMessage.error("Select all the required fields") : notifyMessage.success("Draft Saved");
    !check ? console.log("error") : console.log("no error");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      return newData;
    });
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container columnSpacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="bi-motherName">
            Mother Name
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            name="motherName"
            value={formData.motherName}
            error={!!error.motherName}
            helperText={error.motherName}
            {...createFieldHandlers("motherName")}
            placeholder="Mother Name.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="bi-fatherName">
            Father Name
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            name="fatherName"
            value={formData.fatherName}
            error={!!error.fatherName}
            helperText={error.fatherName}
            {...createFieldHandlers("fatherName")}
            placeholder="Father's Name.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={!!error.maritalStatus} fullWidth>
            <CustomFormLabel htmlFor="marital-status"> Marital Status </CustomFormLabel>
            <CustomSelect
              id="marital-status"
              name="maritalStatus"
              defaultValue={formData.maritalStatus}
              value={formData.maritalStatus}
              {...createFieldHandlers("maritalStatus")}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="single"> Single </MenuItem>
              <MenuItem value="unmarried"> Unmarried </MenuItem>
              <MenuItem value="married"> Married </MenuItem>
            </CustomSelect>
            {error.maritalStatus && <FormHelperText>Select Your Marital Status (this field is required).</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-spause" style={{ color: formData.maritalStatus === "unmarried" ? "#ccc" : "#000" }}>
            Spause Name
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-spause"
            placeholder="Spause Name.."
            name="spauseName"
            value={formData.spouseName}
            // error={!!error.spauseName}
            // helperText={error.spauseName}
            {...createFieldHandlers("spouseName")}
            disabled={formData.maritalStatus === "unmarried"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-address">
            Address
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconAddressBook size="20" />
              </InputAdornment>
            }
            name="address"
            value={formData.address}
            error={!!error.address}
            helperText={error.address}
            {...createFieldHandlers("address")}
            placeholder="Your Address.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-pincode">
            PinCode
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconPin size="20" />
              </InputAdornment>
            }
            name="pincode"
            value={formData.pincode}
            error={!!error.pincode}
            helperText={error.pincode}
            {...createFieldHandlers("pincode")}
            placeholder="Enter Pincode.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="city-text"> City </CustomFormLabel>
          <CustomSelect id="city-select" name="city" value={formData.city} onChange={handleChange} fullWidth variant="outlined">
            {cities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="state-text"> State </CustomFormLabel>
          <CustomSelect id="state-select" name="state" value={formData.state} onChange={handleChange} fullWidth variant="outlined">
            {cities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>

        <Grid item xs={12} md={6}>
          <FileUpload title="Address Proof" required={true} onFileUpload={() => {}} editFiles={""} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-height">Height</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-height"
            placeholder="heigth size.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-tracksuit">Track Suit Size</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-tracksuit"
            placeholder="Track Suit Size.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-shoes">Shoes Size</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-shoes"
            placeholder="Shoes Size.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-weight">Weight </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconStretching size="20" />
              </InputAdornment>
            }
            id="bi-weight"
            placeholder="Your Weight"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-tshirt">T-shirt Size</CustomFormLabel>
          <CustomTextField
            id="bi-tshirt"
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            placeholder="Your T-shirt Size.. "
            fullWidth
          />
        </Grid>

        <Grid item lg={12} sx={{ textAlign: "right", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveAndDraft}>
            Save & Draft
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSlideTwo;
