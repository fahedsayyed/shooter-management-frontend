import React, { useState, useEffect } from "react";
import { Box, Stepper, Step, StepLabel, Button, Stack, Grid, Paper, Typography, Alert, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import FormSlideOne from "./form-slides/FormSlideOne";
import FormSlideTwo from "./form-slides/FormSlideTwo";
import FormSlideThree from "./form-slides/FormSlideThree";
import APP_ROUTES from "src/routes/routePaths";
import { IconArrowLeft, IconArrowRight, IconLayoutDashboard } from "@tabler/icons-react";
import BackLink from "src/components/back-link";

import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import { updateAthleteData } from "src/store/athlete-register-formdata/AthleteViewAndEdit";
import { AppDispatch, AppState } from "src/store/Store";
import axiosServices from "src/utils/axios";
import axios from "axios";
import { notifyMessage } from "src/utils/toastNotify";
import validateForm from "src/utils/FormValidate";
import { nanoid } from "nanoid";

const EditOnlyAthlete = () => {
  const navigate = useNavigate();
  const { athleteId } = useParams();

  const athleteRegisteredData: any = useSelector((state: AppState) => state.athleteRegister);
  const authToken = useSelector((state: AppState) => state.authToken.token);

  const [loading, setLoading] = React.useState(false);
  // const { athleteResponse, isLoading }: any = useSelector((state: AppState) => state.viewAthlete);
  const dispatch: AppDispatch = useDispatch();

  const steps = ["Basic Info", "Personal Info", "Membership & Other info"];

  const [returnedPaymentResponse, setReturnedPaymentResponse] = useState({})
  const [productInfo, setProductInfo] = useState("state register")
  const [transactionId, setTransactionId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState("");

  const isStepSkipped = (step: any) => skipped.has(step);

  const { firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, education, stateUnit, playingEvents } = athleteRegisteredData.slideOne;
  const { motherName, fatherName, address, pincode, cityName, stateName } = athleteRegisteredData.slideTwo;
  const { membershipNumber } = athleteRegisteredData.slideThree;

  const firstSlideRequiredFields = { firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, education, playingEvents };
  const secondSlideRequiredFields = { motherName, fatherName, address, pincode, cityName, stateName };
  const thirdSlideRequiredFields = { membershipNumber };

  //--check errors to disable next button ---
  const areAllFieldsFilled = (slide: Record<string, any>) => {
    if (!slide || typeof slide !== 'object') {
      return false;
    }

    for (const [key, value] of Object.entries(slide)) {
      if (!value) {
        return false;
      }

      if (key === "profilePhoto" || key === "birthProof" || key === "addressProof") {
        if (Object.keys(value).length === 0 && value.constructor === Object) {
          return false;
        } else {
          continue;
        }
      } else if (key === "playingEvents" && typeof value === "object") {
        const hasEvents = Object.values(value as any).some((event: any) => event !== false);
        if (!hasEvents) {
          return false;
        }
      } else {
        const { playingEvents, profilePhoto, birthProof, addressProof, ...fieldsToValidate } = slide;
        const errors = validateForm(fieldsToValidate);
        const hasErrors = Object.values(errors)
          .some(value => value !== undefined && value !== null && value !== '');

        if (hasErrors) {
          return false;
        }
      }
    }

    return true;
  };

  const isSlideOneFieldsFilled = areAllFieldsFilled(firstSlideRequiredFields);
  const isSlideTwoFieldsFilled = areAllFieldsFilled(secondSlideRequiredFields);
  const isSlideThreeFieldsFilled = areAllFieldsFilled(thirdSlideRequiredFields);

  useEffect(() => {
    // console.log(athleteChecks);

    switch (currentStep) {
      case 0:
        setDisabled(!isSlideOneFieldsFilled);
        break;
      case 1:
        setDisabled(!isSlideTwoFieldsFilled);
        break;
      case 2:
        setDisabled(!isSlideThreeFieldsFilled);
        break;
      default:
        setDisabled(true);
    }
  }, [currentStep, athleteRegisteredData]);
  //--check errors to disable next button ---

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken) {
        const { state } = decodedToken;
        setState(state)

      }
    }
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = async (type: any) => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentStep((prevStep) => prevStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      if (type === 'save&view') {
        console.log("type save");

        if (isSlideThreeFieldsFilled) {
          sendResponse();
        } else {
          notifyMessage.error("All fields are required")
        }

      } else if (type === 'pay&continue') {
        await handleOpenDialog();
        handlePaymentAndContinue();
      }
    }
  };

  const generateRandomTxnid = () => {
    const newTxnid = nanoid(40);
    setTransactionId(newTxnid);

    return newTxnid;
  };

  const checkEmailPaymentStatus = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-email-payment-status/${email}?productInfo=${"state_register"}`);
      const response = await axiosServices.get(`api/check-email-payment-status/${email}?productInfo=${productInfo}`);

      return response.data.emailAlreadyUsed;
    } catch (error) {
      console.error('Error checking email payment status:', error);

      return false;
    }
  };

  const handlePaymentAndContinue = async () => {
    console.log("type pay");
    window.open(paymentUrl, '_blank');

    await sendResponse()

    handleCloseDialog();
  };

  const handleOpenDialog = async () => {
    try {

      const emailAlreadyUsed = await checkEmailPaymentStatus();

      if (emailAlreadyUsed) {
        notifyMessage.warning("This email has already been used for payment");
        handleCloseDialog();

        return;
      } else {
        setDialogOpen(true);
        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pay`, {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pay?stateunit=${stateUnit}`, {
            txnid: generateRandomTxnid(),
            amount: 1.00,
            email: email,
            phone: contactNumber,
            firstname: firstName,
            productinfo: "State Athlete Registration",
            surl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${stateUnit}`,
            furl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${stateUnit}`,
          });


        console.log(response, 'for pay');
        const paymentUrl = response.data;

        setPaymentUrl(paymentUrl);
        setReturnedPaymentResponse(response.data)
      }

    } catch (error) {
      console.error('Error posting data to payment API:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const finalResponse = {
    ...athleteRegisteredData.slideOne,
    ...athleteRegisteredData.slideTwo,
    ...athleteRegisteredData.slideThree,
  }

  // console.log(finalResponse, 'check final state response');

  const sendResponse = async () => {
    setLoading(true);

    try {

      const token = Cookies.get('accessToken');
      const formData = new FormData();
      formData.append("paymentRemark", "success");

      for (const [key, value] of Object.entries(finalResponse)) {
        if (key === "fireArms" || key === "coachDetails") {
          (value as any[]).forEach((item: any, index: number) => {
            Object.entries(item).forEach(([subKey, subValue]) => {
              formData.append(`${key}[${index}][${subKey}]`, subValue as string | Blob);
            });
          });
        } else if (key === 'playingEvents') {
          Object.entries(value as any).forEach(([weapon, isEnabled]) => {
            formData.append(`playingEvents[${weapon}]`, isEnabled ? 'true' : 'false');
          });
        } else {
          formData.append(key, value as any);
        }
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      dispatch(updateAthleteData({ id: athleteId, formData, token, navigate }))
        .unwrap()
        .then((data: any) => {
          console.log(data, "response data of update from index --");
        })
        .catch((error: any) => {
          if (error) {
            notifyMessage.error('Registration failed:' + error);

            if (activeStep && error) {
              setActiveStep(0)
              setCurrentStep(0)
            }
          }
        })
        .finally(() => {
          console.log("final check, clear everything --");
          setLoading(false);
        });

    } catch (error: any) {
      notifyMessage.warning(error.message)
      console.log('Error fetching data:', error);
    }
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <FormSlideOne />;
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
      <BackLink title="Back to your profle" route={APP_ROUTES.ATHLETE_ONLY} />
      <PageContainer title="Athlete login" description="this is Login page">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} lg={12} xl={12} mb={2} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "100%", boxShadow: "2px 2px 4px #ccc", background: "linear-gradient(317deg, rgba(255,255,254,1) 0%, rgba(249,251,253,1) 40%)" }} p={3}>
              <Stepper sx={{ paddingBottom: "20px" }} activeStep={activeStep}>
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
              {activeStep === steps.length ? (
                <>
                 <Stack spacing={2} mt={3}>
                    <Alert sx={{ display: "flex", alignItems: "center" }} severity="success">Stay connected with us, While Your informations are being processed. {<CircularProgress color="inherit" size={24} />}</Alert>
                  </Stack>
                </>
              ) : (
                <>
                  <Box>{handleSteps(activeStep)}</Box>

                  <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                    <Button size="large" disabled={activeStep === 0} onClick={handleBack} variant="contained" color="inherit">
                      <IconArrowLeft size={22} fontWeight={"800"} stroke="#ccc" />
                      <Typography variant="subtitle2" ml={1}> Back </Typography>
                    </Button>

                    <Button
                      size="large"
                      onClick={() => handleNext("save&view")}
                      variant="contained"
                      disabled={disabled}
                      color={"primary"}
                    >
                      <Typography variant="subtitle2" mr={1}>
                        {activeStep === steps.length - 1 ? "Update" : "Next"}
                      </Typography>
                      {activeStep === steps.length - 1 ? (
                        <IconLayoutDashboard size={22} fontWeight={"800"} stroke="#ccc" />
                      ) : (
                        <IconArrowRight size={22} fontWeight={"800"} stroke="#ccc" />
                      )}
                    </Button>
                    <>
                      {activeStep === steps.length - 1 && (
                        <>
                          <Button
                            size="large"
                            onClick={handleOpenDialog}
                            variant="contained"
                            disabled={disabled}
                            color={activeStep === steps.length - 1 ? "success" : "primary"}
                          >
                            <Typography variant="subtitle2" mr={1}>Pay & Continue</Typography>
                            <IconArrowRight size={22} fontWeight={"800"} stroke="#ccc" />
                          </Button>

                          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                            <DialogTitle>Redirecting to Payment Gateway</DialogTitle>
                            <DialogContent>
                              <Typography variant="body1">
                                Please wait while we redirect you to the payment gateway.
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog} variant="outlined" color="error"> Exit</Button>
                              <Button onClick={handlePaymentAndContinue} variant="outlined" color="success">Proceed</Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      )}
                    </>
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

export default EditOnlyAthlete;
