import React, { useState, useEffect } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import AddCompetitionSlide2 from "./AddCompetitionSlide2";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import AddCompetitionSlide1 from "./AddCompetitionSlide1";
import { useSelector, useDispatch, AppState } from "../../../store/Store";
import { useLocation } from "react-router-dom";
import { createCompetition, updateMatch, updateCompetitionById } from "../ChampionshipUtils/functionUtils";
import { setCheckError } from "src/store/championship-reducer/addCompetitionFormSlice";
import { notifyMessage } from "src/utils/toastNotify";
import { useParams } from "react-router";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";

const steps = ["Competition Form", "Events"];

const AddCompetition = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [skipped, setSkipped] = useState(new Set());
  const { id } = useParams();

  const competitionData: any = useSelector((state: AppState) => state.AddCompetitionForm.competitionData);
  const selectedEvent = useSelector((state: AppState) => state.AddCompetitionForm.selectedEvent);
  const checkState = useSelector((state: AppState) => state.AddCompetitionForm.steps.step1);
  const errorInitialState = generateErrorInitialState(competitionData);
  const [error, setError] = useState(errorInitialState);
  const location = useLocation();

  const checkError = (fieldName: any) => {
    const newErrors: { [key: string]: string } = validateForm({ [fieldName]: competitionData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: any) => ({
    onBlur: () => checkError(fieldName),
  });

  const wholeError: any = () => {
    if (activeStep === 0) {
      const newErrors = validateForm(competitionData);
      setError(newErrors);
    }
  };

  console.log(location.state, "loc");

  useEffect(() => {
    setHasError(Object.values(error).some((error) => error !== ""));
  }, [error]);

  const isStepSkipped = (step: number): boolean => skipped.has(step);
  const isSlideOneFieldsFilled = Object.values(competitionData).every((value) => value !== "");

  useEffect(() => {
    setHasError(!isSlideOneFieldsFilled);
  }, [competitionData]);

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    if (activeStep === 0 && hasError) {
      wholeError();

      return;
    }
    dispatch(setCheckError(false));

    try {
      let response;

      if (activeStep === steps.length - 1) {
        console.log(selectedEvent, "events selected");
        const response2 = await updateMatch(selectedEvent);

        if (response2.status === 200) {
          notifyMessage.success("Competition saved successfully");

          if (id) {
            response = await updateCompetitionById(id, competitionData);
          } else {
            response = await createCompetition(competitionData);
          }

          notifyMessage.success(id ? "Competition updated successfully" : "Competition created successfully");
        } else {
          console.error("Unexpected response:", response2);
          notifyMessage.error("Failed to save competition");
        }
      } else {
        if (id) {
          response = await updateCompetitionById(id, competitionData);
        } else {
          response = await createCompetition(competitionData);
        }
        notifyMessage.success(id ? "Competition updated successfully" : "Competition created successfully");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Failed to save competition", error);
      notifyMessage.error("Failed to save competition");
    }

    // Move skipped logic inside try block to ensure it runs correctly
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setSkipped(newSkipped);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSteps = (step: number) => {
    console.log(step, "hel");
    switch (step) {
      case 0:
        return <AddCompetitionSlide1 checkError={checkError} wholeError={wholeError} createFieldHandlers={createFieldHandlers} error={error} />;
      case 1:
        return <AddCompetitionSlide2 />;
      default:
        return <></>;
    }
  };

  //step={step}

  return (
    <>
      <BackLink title="Back to the championship" route={`${APP_ROUTES.CHAMPIONS}`} />
      <TableHead title={id ? "Edit Competition" : "Add Competition"} />
      <PageContainer>
        <BlankCard>
          <Box width="100%" padding={3}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: { optional?: React.ReactNode } = {};
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
                <Box display="flex" flexDirection="row" mt={3}>
                  <Button color="inherit" variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Box flex="1 1 auto" />
                  <Button onClick={handleNext} variant="contained" color={activeStep === steps.length - 1 ? "success" : "secondary"}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </BlankCard>
      </PageContainer>
    </>
  );
};

export default AddCompetition;
