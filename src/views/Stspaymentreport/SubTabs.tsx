import React from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, FormControlLabel, Alert, Stack, Grid, TextField, RadioGroup, FormControl } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Checkbox } from "@mui/material";
import CustomRadio from "src/utils/theme-elements/CustomRadio";

const steps = ["Account", "Profile"];

const SubTabs = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [printTypevalue, setPrintTypeValue] = React.useState("");
  const [addressTypevalue, setAddressTypeValue] = React.useState("");

  const handleChangePrintType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrintTypeValue(event.target.value);
  };
  const handleChangeAddressType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressTypeValue(event.target.value);
  };
  const isStepOptional = (step: any) => step === 1;

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };
  const isStepSkipped = (step: any) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);

      return newSkipped;
    });
  };

  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <CustomFormLabel>From Date</CustomFormLabel>
                  {/* <DatePicker
                    // label="From Date"
                    // inputFormat="MM/dd/yyyy"
                    value={start}
                    onChange={handleStartChange}
                    renderInput={(params: any) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                  /> */}
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <CustomFormLabel>To Date</CustomFormLabel>
                  {/* <DatePicker
                    // label="To Date"
                    // inputFormat="MM/dd/yyyy"
                    value={end}
                    onChange={handleEndChange}
                    renderInput={(params: any) => (
                      <TextField {...params} fullWidth sx={{ mb: 3 }} error={start > end} helperText={start > end ? "End date must be later than start date" : ""} />
                    )}
                  /> */}
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap" }}>
                  Invoice No:{" "}
                </CustomFormLabel>
                <CustomTextField id="Fname" variant="outlined" fullWidth sx={{ width: 450 }} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap", marginLeft: "35px", marginRight: "10px" }}>
                  Po No :{" "}
                </CustomFormLabel>
                <CustomTextField id="Fname" variant="outlined" fullWidth sx={{ width: 450 }} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap" }}>
                  Invoice Date:{" "}
                </CustomFormLabel>
                <CustomTextField type="date" id="fs-date" placeholder="John Deo" fullWidth sx={{ width: 450 }} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap" }}>
                  Client Name:{" "}
                </CustomFormLabel>
                <CustomTextField id="Fname" variant="outlined" fullWidth sx={{ width: 450 }} />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap" }}>
                  Digital Signature:{" "}
                </CustomFormLabel>

                <Checkbox color="primary" defaultChecked inputProps={{ "aria-label": "checkbox with default color" }} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <CustomFormLabel htmlFor="Fname" sx={{ marginTop: "10px", textWrap: "noWrap" }}>
                  HSN/SAC Code :
                </CustomFormLabel>
                <CustomTextField id="Fname" variant="outlined" fullWidth sx={{ width: 450 }} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginLeft: "80px" }}>
                <Grid item xs={12} sm={3} display="flex" alignItems="start" justifyContent="end">
                  <CustomFormLabel htmlFor="cs-address" sx={{ mt: 1 }}>
                    Print Type:
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <FormControl component="fieldset">
                    <RadioGroup name="cs-address" value={printTypevalue} onChange={handleChangePrintType}>
                      <FormControlLabel value="radio1" control={<CustomRadio />} label="E-Copy" />
                      <FormControlLabel
                        value="radio2"
                        control={<CustomRadio />}
                        label="
                        Letter Head"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginLeft: "80px" }}>
                <Grid item xs={12} sm={3} display="flex" alignItems="start" justifyContent="end">
                  <CustomFormLabel htmlFor="cs-address" sx={{ mt: 1 }}>
                    Document Type:
                  </CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <FormControl component="fieldset">
                    <RadioGroup name="cs-address" value={addressTypevalue} onChange={handleChangeAddressType}>
                      <FormControlLabel value="radio1" control={<CustomRadio />} label="Receipt" />
                      <FormControlLabel
                        value="radio2"
                        control={<CustomRadio />}
                        label="
                                                Receipt with details"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <Typography variant="h5">Terms and condition</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Sard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory isSard about this site or you have been to it,
              but you cannot figure out what it is or what it can do. MTA web directory is
            </Typography>
            <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Agree with terms?" />
          </Box>
        );
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box width="100%">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Stack spacing={2} mt={3}>
            <Alert severity="success">All steps completed - you&apos;re finished</Alert>

            <Box textAlign="right">
              <Button onClick={handleReset} variant="contained" color="error">
                Reset
              </Button>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Box>{handleSteps(activeStep)}</Box>

          <Box display="flex" flexDirection="row" mt={3}>
            <Button color="inherit" variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box flex="1 1 auto" />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} variant="contained" color={activeStep === steps.length - 1 ? "success" : "secondary"}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SubTabs;
