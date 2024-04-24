///////////////////////

import React, { useState, useEffect } from "react";
import { Button, Paper, MenuItem, Grid, FormControl, FormHelperText } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TableHead from "src/components/table-head";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { CardContent } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { notifyMessage } from "src/utils/toastNotify";
import { IClub } from "src/types/DraClubRu";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import PageContainer from "src/components/page-container/PageContainer";

function EditAssociation() {
  const [association, setAssociation] = React.useState<IClub>({
    id: 0,
    type_of_association: "",
    name_of_association: "",
    district: "",
    approval_level: "",
  });

  const errorInitialState: any = generateErrorInitialState(association);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(association);
    setError(newErrors);
  };

  const navigate = useNavigate();
  const location: any = useLocation();
  const row = location.state.row; // Access the data from the state object
  console.log("data", row);

  // Initialize the state with the data passed from the object
  useEffect(() => {
    if (row) {
      setAssociation(row);
    }
  }, [row]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssociation({ ...association, [name]: value });
  };

  const checkError = (fieldName: keyof IClub) => {
    const newErrors: { [key in keyof IClub]?: string } = validateForm({ [fieldName]: association[fieldName] });
    setError((prevErrors: { [key in keyof IClub]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IClub) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleUpdate = (e: React.FormEvent) => {
    // Perform data validation here

    e.preventDefault();

    const check = Object.values(association).every((e) => e !== "");
    if (!check && error) {
      notifyMessage.error("Check all the required fields");
    } else {
      // navigate("/dra-club-ru-register");
      // console.log("send data");
      notifyMessage.success("Updated Successfully");
    }

    wholeError();

    // Update the association data in local storage
    // const associationId = location.pathname.replace("/edit-association/", "");
    // const storedAssociations = localStorage.getItem("associations");
    // const associations = storedAssociations ? JSON.parse(storedAssociations) : [];

    // const updatedAssociations = associations.map((assoc: any) => {
    //   if (assoc.id === associationId) {
    //     return { ...association, id: assoc.id }; // Preserve the original ID
    //   }
    //   return assoc;
    // });

    // localStorage.setItem("associations", JSON.stringify(updatedAssociations));

    // Redirect back to the association list page
    // navigate("/dra-club-ru-register");
  };

  const handleCancel = () => {
    navigate("/dra-club-ru-register");
  };

  return (
    <PageContainer>
      <BackLink title="Back to the DRA/CLUB/RU Page" route={APP_ROUTES.DRA_CLUB_RU_REGISTER} />
      <Paper style={{ padding: "0px", marginTop: "0px" }}>
        <TableHead title="Edit Rifle Club/District Rifle Association/Registered Unit" />
        <Grid item xs={12}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl error={!!error.type_of_association} fullWidth>
                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="text-email"
                  >
                    Type of Association
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomSelect
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="type_of_association"
                    value={association.type_of_association}
                    onChange={handleInputChange}
                    // error={!!error.type_of_association}
                    // helperText={error.type_of_association}
                    {...createFieldHandlers("type_of_association")}
                    fullWidth
                    className="custom-select"
                  >
                    <MenuItem value="DRA">DRA</MenuItem>
                    <MenuItem value="CLUB">CLUB</MenuItem>
                    <MenuItem value="RU">RU</MenuItem>
                  </CustomSelect>
                  {error.type_of_association && <FormHelperText>Association field is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel
                  sx={{
                    mt: 2,
                  }}
                  htmlFor="text-email"
                >
                  Name of Association
                  <RequiredStar />
                </CustomFormLabel>
                <CustomTextField
                  sx={{ mt: 0 }}
                  id="text-email"
                  variant="outlined"
                  name="name_of_association"
                  value={association.name_of_association}
                  onChange={handleInputChange}
                  error={!!error.name_of_association}
                  helperText={error.name_of_association}
                  {...createFieldHandlers("name_of_association")}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="text-email"
                >
                  District
                  <RequiredStar />
                </CustomFormLabel>
                <CustomTextField
                  sx={{ mt: 0 }}
                  id="text-email"
                  variant="outlined"
                  name="district"
                  value={association.district}
                  onChange={handleInputChange}
                  error={!!error.district}
                  helperText={error.district}
                  {...createFieldHandlers("district")}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid item xs={6}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="text-email"
                >
                  Approval Level
                  <RequiredStar />
                </CustomFormLabel>
                <CustomTextField
                  sx={{ mt: 0 }}
                  id="text-email"
                  variant="outlined"
                  name="approval_level"
                  value={association.approval_level}
                  onChange={handleInputChange}
                  error={!!error.approval_level}
                  helperText={error.approval_level}
                  {...createFieldHandlers("approval_level")}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
              <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: "10px" }}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </CardContent>
        </Grid>
      </Paper>
    </PageContainer>
  );
}

export default EditAssociation;
