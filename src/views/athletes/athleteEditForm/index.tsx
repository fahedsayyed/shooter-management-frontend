import React from "react";
import { Box, Stepper, Step, StepLabel, Button, Stack, Grid, Typography } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";

import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import FormSlideOne from "./form-slides/FormSlideOne";
import FormSlideTwo from "./form-slides/FormSlideTwo";
import FormSlideThree from "./form-slides/FormSlideThree";

const AthleteEditForm = ({ athleteId }: any) => {
  const [formSlideOneData, setFormSlideOneData] = React.useState({});
  const steps = ["Basic Info", "Personal Info", "Membership & Other info"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step: any) => skipped.has(step);
  const navigate = useNavigate();
  {
    activeStep === steps.length ? navigate(`${APP_ROUTES.ATHLETES}`) : null;
  }
  console.log(athleteId);
  //--check errors to disable next button ---
  //   const areAllFieldsFilled = (slide: any) => Object.values(slide).every((value) => value !== "");

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

  const handleFormSubmit = (value: any) => {
    setFormSlideOneData(value);
    console.log(formSlideOneData, "formOneSlide");
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <FormSlideOne submitForm={handleFormSubmit} />;
      case 1:
        return <FormSlideTwo />;
      case 2:
        return <FormSlideThree />;
      default:
        break;
    }
  };

  return (
    <>
      <PageContainer title="Athlete login edit" description="this is edit athlete page">
        <Grid container spacing={0}>
          <Grid item xs={12} mb={2} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "100%", boxShadow: "2px 2px 4px #ccc", background: "linear-gradient(317deg, rgba(255,255,254,1) 0%, rgba(249,251,253,1) 40%)" }} p={3}>
              <Stepper sx={{ paddingBottom: "20px" }} activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  //   if (isStepOptional(index)) {
                  //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  //   }
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
              {activeStep === steps.length ? null : (
                <>
                  <Box>{handleSteps(activeStep)}</Box>

                  <Stack direction="row" justifyContent="center" spacing={3} mt={4}>
                    <Button size="large" disabled={activeStep === 0} onClick={handleBack} variant="contained" color="inherit">
                      <IconArrowLeft size={22} fontWeight={"800"} stroke="#ccc" />
                      <Typography variant="subtitle2" ml={1}>
                        Back
                      </Typography>
                    </Button>

                    <Button size="large" onClick={handleNext} variant="contained" color={activeStep === steps.length - 1 ? "success" : "primary"}>
                      <Typography variant="subtitle2" mr={1}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Typography>
                      <IconArrowRight size={22} fontWeight={"800"} stroke="#ccc" />
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default AthleteEditForm;
