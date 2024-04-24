import { Grid, MenuItem, FormControl, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel"; // Fix import here
import TransferList from "./TransferList";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { IModalContent } from "src/types/TeamManagement";

function ModalContent() {
  const [tenentType, setTenetType] = React.useState<IModalContent>({
    tenanttype: "",
    eventname: "",
    club: "",
    receiptno: "",
    amount: "",
  });

  const errorInitialState: any = generateErrorInitialState(tenentType);
  const [error, setError] = useState(errorInitialState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const wholeError = () => {
  //   const newErrors = validateForm(tenentType);
  //   setError(newErrors);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTenetType({ ...tenentType, [name]: value });
  };

  const checkError = (fieldName: keyof IModalContent) => {
    const newErrors: any = validateForm({ [fieldName]: tenentType[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IModalContent) => ({
    onBlur: () => checkError(fieldName),
  });

  // const handleCreate = (e: any) => {
  //   e.preventDefault();

  //   // Perform data validation here
  //   const check = Object.values(tenentType).every((e) => e !== ""); //
  //   console.log(check, "check"); // If all values are non-empty, check will be true; otherwise, false.
  //   if (!check) {
  //     alert("Check all the required fields");
  //     wholeError();
  //   } else {
  //     //   navigate("/railway-concession-certificate");
  //     alert("Successfull..!!");
  //   }
  // };

  return (
    <>
      <FormControl error={!!error.tenanttype} fullWidth>
        <CustomFormLabel
          sx={{
            mt: 0,
          }}
          htmlFor="text-location"
        >
          Tenant Type
          <RequiredStar />
        </CustomFormLabel>
        <CustomSelect
          fullWidth
          className="custom-select"
          id="text-email"
          variant="outlined"
          name="tenanttype"
          value={tenentType.tenanttype}
          onChange={(e: any) => handleChange(e)}
          {...createFieldHandlers("tenanttype")}
          required
        >
          <MenuItem value="state">State</MenuItem>
          <MenuItem value="club">Club</MenuItem>
        </CustomSelect>
        {error.tenanttype && <FormHelperText>Tenant Type field is required.</FormHelperText>}
      </FormControl>
      <CustomFormLabel
        sx={{
          mt: 0,
        }}
        htmlFor="text-location"
      >
        Event Name
        <RequiredStar />
      </CustomFormLabel>
      <CustomSelect fullWidth className="custom-select" id="tenent-type" variant="outlined" name="tenentType" value={tenentType} onChange={(e: any) => handleChange(e)} required>
        <MenuItem value="state">State</MenuItem>
        <MenuItem value="club">Club</MenuItem>
      </CustomSelect>
      <CustomFormLabel
        sx={{
          mt: 0,
        }}
        htmlFor="text-location"
      >
        Club/DRA/RU
        <RequiredStar />
      </CustomFormLabel>
      <CustomSelect fullWidth className="custom-select" id="tenent-type" variant="outlined" name="tenentType" value={tenentType} onChange={(e: any) => handleChange(e)} required>
        <MenuItem value="state">State</MenuItem>
        <MenuItem value="club">Club</MenuItem>
      </CustomSelect>
      <Grid sx={{ marginTop: "20px" }}>
        <TransferList />
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "space-between", marginRight: "165px" }}>
        <CustomFormLabel htmlFor="lname-text">
          Reciept Number
          <RequiredStar />
        </CustomFormLabel>
        <CustomFormLabel htmlFor="lname-text">
          Amount
          <RequiredStar />
        </CustomFormLabel>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "space-around", gap: "10px" }}>
        <CustomTextField id="fname-text" variant="outlined" fullWidth type="number" />
        <CustomTextField id="fname-text" variant="outlined" fullWidth type="number" />
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        {/* Add a submit button that calls handleCreate */}
        {/* <Button variant="contained" onClick={handleCreate}>
          Submit
        </Button> */}
      </Grid>
    </>
  );
}

export default ModalContent;
