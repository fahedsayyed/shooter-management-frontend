import React, { useState } from "react";
import { Button, Paper, Grid, CardContent, Autocomplete, FormControl, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TableHead from "src/components/table-head";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { notifyMessage } from "src/utils/toastNotify";
import { IRailwayConcession, ISelectShooterName } from "src/types/RailwayConcession";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import PageContainer from "src/components/page-container/PageContainer";

function CreateRailwayConcession() {
  const [concession, setConcession] = React.useState<IRailwayConcession>({
    id: 0,
    competition_type: "",
    shootername: "",
  });

  const errorInitialState: any = generateErrorInitialState(concession);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(concession);
    setError(newErrors);
  };

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setConcession({ ...concession, [name]: value });
  };

  // const checkError = (fieldName: any) => {
  //   const newErrors: any = validateForm({ [fieldName]: concession[fieldName] });
  //   setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  // };
  const checkError = (fieldName: keyof IRailwayConcession) => {
    const newErrors: { [key in keyof IRailwayConcession]?: string } = validateForm({ [fieldName]: concession[fieldName] });
    setError((prevErrors: { [key in keyof IRailwayConcession]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IRailwayConcession) => ({
    onBlur: () => checkError(fieldName),
  });

  console.log(concession, "concession");

  const handleCreate = () => {
    // Perform data validation here
    const check = Object.values(concession).every((value) => value !== ""); //
    console.log(check, "check"); // If all values are non-empty, check will be true; otherwise, false.

    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      notifyMessage.success("Concession generated successfully");
      // navigate("/railway-concession-certificate");
    }

    const storedConcessions = localStorage.getItem("concessions");
    const concessions = storedConcessions ? JSON.parse(storedConcessions) : [];
    concessions.push(concession);
    localStorage.setItem("concessions", JSON.stringify(concessions));
  };

  const handleCancel = () => {
    navigate("/railway-concession-certificate");
  };

  const shootername: ISelectShooterName[] = [
    {
      value: "Tom Cruise",
      label: "Tom Cruise",
    },
    {
      value: "Mike Tyson",
      label: "Mike Tyson",
    },
    {
      value: "Gus Fring",
      label: "Gus Fring",
    },
    {
      value: "Lionel Messi",
      label: "Lionel Messi",
    },
    {
      value: "Jackie Chan",
      label: "Jackie Chan",
    },
  ];

  return (
    <>
      <BackLink title="Back to the Railway Concession Page" route={APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE} />
      <PageContainer>
        <Paper style={{ padding: "0px", marginTop: "0px" }}>
          <TableHead title="Generate Railway Concession" />
          <Grid item xs={12}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl error={!!error.competition_type} fullWidth>
                    <CustomFormLabel sx={{ mt: 2 }} htmlFor="text-email">
                      Type of Competition
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect
                      className="custom-select"
                      sx={{ mt: 0 }}
                      id="text-email"
                      variant="outlined"
                      name="competition_type"
                      value={concession.competition_type}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      {...createFieldHandlers("competition_type")}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Air Gun Competition">Air Gun Competition</MenuItem>
                      <MenuItem value="Shot Gun Competition">Shot Gun Competition</MenuItem>
                      <MenuItem value="Rifle Gun Competition">Rifle Gun Competition</MenuItem>
                    </CustomSelect>
                    {error.competition_type && <FormHelperText>Type of Competition field is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <CustomFormLabel sx={{ mt: 2 }} htmlFor="text-email">
                    Search Shooter Name
                    <RequiredStar />
                  </CustomFormLabel>
                  <Autocomplete
                    id="text-emailss"
                    options={shootername}
                    getOptionLabel={(option) => option.label || ""}
                    value={shootername.find((option) => option.value === concession.shootername) || null}
                    onChange={(event, newValue) => handleInputChange({ target: { name: "shootername", value: newValue?.value || "" } })}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        name="shootername"
                        fullWidth
                        margin="normal"
                        sx={{ mt: 0 }}
                        error={!!error.shootername}
                        helperText={error.shootername}
                        {...createFieldHandlers("shootername")}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginRight: "10px" }}>
                  Generate
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </CardContent>
          </Grid>
        </Paper>
      </PageContainer>
    </>
  );
}

export default CreateRailwayConcession;
