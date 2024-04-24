import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Stack, Grid, Typography } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate, useParams } from "react-router";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import FormSlideOne from "./formSlides/FormSlideOne";
import FormSlideTwo from "./formSlides/FormSlideTwo";
import FormSlideThree from "./formSlides/FormSlideThree";
import TableHead from "src/components/table-head";
import BackLink from "src/components/back-link";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "src/store/Store";
import { IDetails } from "src/types/Details";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { addDetailsDateAndTimeRequest, addDetailRequest, fetchtAthleteOfCompetitionandMatchGroupRequest } from "src/store/reducers/detailsSlice";
import { notifyMessage } from "src/utils/toastNotify";
import { fetchtAthleteOfCompetitionStart } from "src/store/reducers/matchParticipationSlice";
import { formatDateWithMoment } from "src/utils/basicFormaters";

const CreateDetails = () => {
  const steps = ["Basic Info", "Personal Info", "Membership & Other info"];

  const detailsFromReducer = useSelector((state: AppState) => state.details.details.formSlideOne);
  const response = useSelector((state: AppState) => state.details.response);
  const athletesOfcompetitionAndMatchGroup = useSelector((state: AppState) => state.details.athletesOfcompetitionAndMatchGroup);
  // const athleteOfCompetition = useSelector((state: AppState) => state.competition.athletesOfcompetition);
  const detailDateAndTime = useSelector((state:AppState)=>state.details.detailDateAndTime)
  const detailId = useSelector((state:AppState)=>state.details.detailId)
  const detailById = useSelector((state: AppState) => state.details.detailById);
  const navigate = useNavigate();

  const errorInitialState: any = generateErrorInitialState(detailsFromReducer);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(errorInitialState);
  const params = useParams();
  const dispatch = useDispatch();


  const isStepSkipped = (step: any) => skipped.has(step);
  const { competition_name, event_group, lane, reserved_lane, defective_lane, start_date, end_date, preparation_time, detailone, comp_id, changeover_time, event_time } =
    detailsFromReducer;

    const {id} = detailById

  const areAllFieldsFilled = (...slide: any) => {
    return Object.values(slide).every((value) => value !== "");
  };

  const remainingLanes = parseInt(lane) - parseInt(reserved_lane) - parseInt(defective_lane);

  const totalDetails =  athletesOfcompetitionAndMatchGroup.length/remainingLanes;
console.log(athletesOfcompetitionAndMatchGroup.length,"athletesOfcompetitionAndMatchGroup.length")
  useEffect(() => {
    if (params.comp_id && event_group) {
      dispatch(fetchtAthleteOfCompetitionandMatchGroupRequest({ comp_id: params.comp_id, match_group_id: event_group }));
    }
  }, [dispatch, params.comp_id, event_group]);

  // useEffect(() => {
  //   if (params.comp_id) {
  //     dispatch(fetchtAthleteOfCompetitionStart({ comp_id: params.comp_id }));
  //   }
  // }, [dispatch, params.comp_id]);




  useEffect(() => {
    const isSlideOneFieldsFilled = areAllFieldsFilled(competition_name, event_group, lane, reserved_lane, defective_lane, start_date, end_date);
    const isSlideTwoFieldsFilled = areAllFieldsFilled(detailone);

    switch (activeStep) {
      case 0:
        setHasError(isSlideOneFieldsFilled);
        break;

      case 1:
        setHasError(isSlideTwoFieldsFilled);
        break;

      default:
        setHasError(true);
    }
  }, [activeStep, detailsFromReducer]);

  const data = {
    competitionID: parseInt(comp_id, 10),
    matchGroupId: parseInt(event_group, 10),
    lanes: parseInt(lane, 10),
    reservedLanes: parseInt(reserved_lane, 10),
    defectiveLanes: parseInt(defective_lane, 10),
    startDate: formatDateWithMoment(start_date),
    endDate: formatDateWithMoment(end_date),
    preparationTime: parseInt(preparation_time, 10),
    changeOverTime: parseInt(changeover_time, 10),
    matchTime: parseInt(event_time, 10),
    totalDetails: totalDetails,
  };



  const checkError = (fieldName: keyof IDetails) => {
    const newErrors: { [key in keyof IDetails]?: string } = validateForm({ [fieldName]: detailsFromReducer[fieldName] });

    setError((prevErrors: { [key in keyof IDetails]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IDetails) => ({
    onBlur: () => checkError(fieldName),
  });

  {
    activeStep === steps.length ? navigate(`${APP_ROUTES.DETAILS}`) : null;
  }

  const wholeError = () => {
    const newErrors = validateForm(detailsFromReducer);
    setError(newErrors);
  };

  console.log(detailId,"detailId before")


  const handleNext = () => {
    if (!hasError) {
      wholeError();
    } else {
      let newSkipped = skipped;

      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      if (activeStep == 0) {
        dispatch(addDetailRequest(data));
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          notifyMessage.success(response.data.message);
      }
     

      setSkipped(newSkipped);
    }
    if(activeStep == 1){
      console.log(detailId,"detailId after")

      {id ? dispatch(addDetailsDateAndTimeRequest({data:detailDateAndTime,detailId:id})):dispatch(addDetailsDateAndTimeRequest({data:detailDateAndTime,detailId:detailId}))}

      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <FormSlideOne athletesOfcompetitionAndMatchGroup={athletesOfcompetitionAndMatchGroup} step={step} createFieldHandlers={createFieldHandlers} errors={error} wholeError={wholeError} />;
      case 1:
        return <FormSlideTwo  totalDetails={totalDetails} step={step} createFieldHandlers={createFieldHandlers}  errors={error} />;
      case 2:
        return <FormSlideThree athletesOfcompetitionAndMatchGroup={athletesOfcompetitionAndMatchGroup}  step={step} />;
      default:
        break;
    }
  };

  return (
    <>
      <PageContainer title="Details page" description="this is details pafe creation form">
        <BackLink title="Back to the Details Page" route={APP_ROUTES.DETAILS} />
        <TableHead title="Add Details" />
        <Grid container spacing={0} mt={2}>
          <Grid item xs={12} mb={2} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "100%", boxShadow: "1px 1px 4px #f2f2f2", background: "linear-gradient(317deg, rgba(255,255,254,1) 0%, rgba(249,251,253,1) 40%)" }} p={3}>
              <Stepper sx={{ pb: 2, mb: 2 }} activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};

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

                    <Button
                      size="large"
                      onClick={handleNext}
                      variant="contained"
                      //   disabled={disabled}
                      // disabled={activeStep === 0 ? disabled1 : activeStep === 1 ? disabled2 : /* disabled3 */}
                      color={activeStep === steps.length - 1 ? "success" : "primary"}
                    >
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

export default CreateDetails;
