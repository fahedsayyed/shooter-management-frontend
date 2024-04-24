import React, { useState, useEffect, useRef } from "react";
import { Box, Stepper, Step, StepLabel, Button, Stack, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress } from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconLayoutDashboard } from "@tabler/icons-react";
import ShooterImg from "../../assets/images/backgrounds/shooter.png";
import Logo from "src/layouts/full/shared/logo/Logo";
import PageContainer from "src/components/page-container/PageContainer";
import { useNavigate, useParams } from "react-router";
import Slide1 from "./clubRegisterForm/Slide1";
import Slide2 from "./clubRegisterForm/Slide2";
import APP_ROUTES from "src/routes/routePaths";
import { clubRegister, updateClubRegisterById } from "./apiCall/clubregisterUtil";
import { AppState, useSelector } from "src/store/Store";
import { notifyMessage } from "src/utils/toastNotify";
import { checkEmailAdharStatus } from "./apiCall/clubregisterUtil";
import { nanoid } from "nanoid";
import axios from "axios";
import validateForm from "src/utils/FormValidate";

const ClubAthelete = () => {
  const athleteRegisteredData: any = useSelector((state: AppState) => state.athleteFormData);

  const steps = ["Basic Info", "Personal Info"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const isStepSkipped = (step: any) => skipped.has(step);

  const navigate = useNavigate();
  const { athleteId } = useParams();
  //console.log(athleteId, "check id");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [returnedPaymentResponse, setReturnedPaymentResponse] = useState({});
  const [paymentUrl, setPaymentUrl] = useState("");

  const areAllFieldsFilled = (slide: any) => {
    return Object.entries(slide).every(([key, value]) => {
      if (key === "playingEvents" && typeof value === "object") {
        return Object.values(value as any).some((event) => event !== false);
      } else if (key === "agreement") {
        return value !== false;
      } else if (key === "conscent") {
        return value !== false;
      } else {
        const { playingEvents, agreement, conscent, ...fieldsToValidate } = slide;
        const errors = validateForm(fieldsToValidate);
        const hasErrors = Object.values(errors).some((value) => value !== undefined && value !== null && value !== "");

        return !hasErrors;
      }
    });
  };

  const { clubName, firstName, lastName, email, dateOfBirth, contactNumber, playingEvents, education, safetyCourse } = athleteRegisteredData.slideOne;
  const { membership, aadhar, address, stateName, cityName, pincode, agreement, conscent } = athleteRegisteredData.slideTwo;

  const firstSlideRequiredFields = { clubName, firstName, lastName, email, dateOfBirth, playingEvents, contactNumber, education, safetyCourse };
  const secondSlideRequiredFields = { membership, aadhar, address, stateName, cityName, pincode, agreement, conscent };

  const isSlideOneFieldsFilled = areAllFieldsFilled(firstSlideRequiredFields);
  const isSlideTwoFieldsFilled = areAllFieldsFilled(secondSlideRequiredFields);

  useEffect(() => {
    switch (currentStep) {
      case 0:
        setDisabled(!isSlideOneFieldsFilled);
        break;
      case 1:
        setDisabled(!isSlideTwoFieldsFilled);
        break;
      default:
        setDisabled(true);
    }
  }, [currentStep, athleteRegisteredData]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // const finalResponse: any = {
  //   ...athleteRegisteredData.slideOne,
  //   ...athleteRegisteredData.slideTwo,
  // };

  //console.log(finalResponse, "final redux res");

  const generateRandomTxnid = () => {
    const newTxnid = nanoid(40);
    setTransactionId(newTxnid);

    return newTxnid;
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-payment-status/${transactionId}?stateunit=${clubName}`);
      console.log(response.data.success, "suc");

      return response.data.success;
    } catch (error) {
      console.error("Error checking payment status:", error);

      return false;
    }
  };

  const handlePaymentAndContinue = async () => {
    //console.log("type pay");
    window.open(paymentUrl, "_blank");

    // const paymentSuccess = await checkPaymentStatus();
    // console.log(paymentSuccess, "psuccess");
    // if (paymentSuccess) {
    //   handleNext();
    // }

    await handleNext();

    handleCloseDialog();
  };

  const handleOpenDialog = async () => {
    const existingFields = await checkEmailAdharStatus(email, aadhar, contactNumber, "club_arjuna");

    if (existingFields.error && !athleteId) {
      notifyMessage.warning(existingFields.error);

      return;
    }

    setDialogOpen(true);

    try {
      console.log(clubName, "heyyy");
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pay?stateunit=${clubName}`, {
        // txnid: transactionId,
        txnid: generateRandomTxnid(),
        amount: 1.0,
        email: email,
        phone: contactNumber,
        firstname: firstName,
        productinfo: "Club Athlete Register",
        surl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${clubName}`,
        furl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${clubName}`,
      });

      // console.log(response, "for pay");
      const paymentUrl = response.data;

      setPaymentUrl(paymentUrl);
      setReturnedPaymentResponse(response.data);
    } catch (error) {
      console.error("Error posting data to payment API:", error);
    }
  };


  const handleNext = async () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      try {
        let response;

        console.log(athleteRegisteredData, "for checking club")

        if (athleteId) {
          response = await updateClubRegisterById(athleteId, athleteRegisteredData);
          console.log(response, "Athlete details updated successfully");
          navigate(`${APP_ROUTES.ATHLETE_CLUB_VIEW}/${athleteId}`);
          notifyMessage.success("Updated in club saved successfully");
        } else {
          const existingFields = await checkEmailAdharStatus(null, aadhar, null, "club_arjuna");

          if (existingFields.error) {
            notifyMessage.warning(existingFields.error);

            return;
          } else {
            // Aadhar number is unique, proceed with registration
            response = await clubRegister(athleteRegisteredData);
            if (response && (response.status === 200 || response.status === 201)) {
              console.log("Registered in club successfully");
              notifyMessage.success("Registered in club saved successfully");
              navigate("/auth/login");
            } else {
              console.error("Failed to register in club:", response);
              notifyMessage.error("Failed to register in club");
            }
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
        notifyMessage.error("An error occurred");
      }
    }

    if (activeStep === 0 && !athleteId) {
      try {
        const existingFields = await checkEmailAdharStatus(email, null, contactNumber, "club_arjuna");
        // console.log(existingFields, "in slide");

        if (existingFields.error) {
          // Handle the error response from the backend
          notifyMessage.warning(existingFields.error);

          return;
        }
      } catch (error: any) {
        // Handle other errors
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = JSON.parse(error.response.data.error);
          notifyMessage.warning(errorMessage.error);
        } else {
          notifyMessage.warning("Error occurred while processing the request.");
        }
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentStep((prevStep) => prevStep + 1);
    setSkipped(newSkipped);
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      default:
        break;
    }
  };

  return (
    <>
      <PageContainer title="Club Athlete login" description="this is Login page">
        <Grid container spacing={0}>
          {!athleteId && (
            <>
              <Grid item xs={12} sm={12} lg={4} xl={4} sx={{ position: "relative", overflow: "hidden" }}>
                <Paper sx={{ overflow: "hidden" }}>
                  <div style={{ position: "fixed", left: "25px", top: "40px", width: "30%" }}>
                    <Box position="relative">
                      <Box px={3}>
                        <Logo />
                      </Box>
                      <Box
                        className="shoot-img-container"
                        alignItems="center"
                        justifyContent="center"
                        height={"calc(100vh - 125px)"}
                        sx={{
                          overflow: "hidden",
                          display: {
                            xs: "none",
                            lg: "flex",
                          },
                        }}
                      >
                        <img src={ShooterImg} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt={`Image-shooter`} />
                      </Box>
                    </Box>
                  </div>
                </Paper>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} lg={!athleteId ? 8 : 12} xl={!athleteId ? 8 : 12} mb={2} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "100%", boxShadow: "2px 2px 4px #ccc", background: "linear-gradient(317deg, rgba(255,255,254,1) 0%, rgba(249,251,253,1) 40%)" }} p={3}>
              <Stepper sx={{ paddingBottom: "20px" }} activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  //   if (isStepSkipped(index)) {
                  //     stepProps.completed = false;
                  //   }

                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                // <>
                //   <Stack spacing={2} mt={3}>
                //     <Alert severity="success">Stay connected with us, While Your informations are being processed. {<CircularProgress color="inherit" size={24} />}</Alert>
                //   </Stack>
                // </>
                null
              ) : (
                <>
                  <Box>{handleSteps(activeStep)}</Box>

                  <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                    <Button size="large" disabled={activeStep === 0} onClick={handleBack} variant="contained" color="inherit">
                      <IconArrowLeft size={22} fontWeight={"800"} stroke="#ccc" />
                      <Typography variant="subtitle2" ml={1}>
                        {" "}
                        Back{" "}
                      </Typography>
                    </Button>

                    <Button size="large" onClick={handleNext} variant="contained" disabled={disabled} color={"primary"}>
                      <Typography variant="subtitle2" mr={1}>
                        {/* {activeStep === steps.length - 1 ? "Save for Later" : "Next"} */}
                        {activeStep === steps.length - 1 ? (athleteId ? "Update" : "Save for Later") : "Next"}
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
                          <Button size="large" onClick={handleOpenDialog} variant="contained" disabled={disabled} color={activeStep === steps.length - 1 ? "success" : "primary"}>
                            <Typography variant="subtitle2" mr={1}>
                              Pay & Continue
                            </Typography>
                            <IconArrowRight size={22} fontWeight={"800"} stroke="#ccc" />
                          </Button>

                          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                            <DialogTitle>Redirecting to Payment Gateway</DialogTitle>
                            <DialogContent>
                              <Typography variant="body1">Please wait while we redirect you to the payment gateway.</Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog} variant="outlined" color="error">
                                {" "}
                                Exit
                              </Button>
                              <Button onClick={handlePaymentAndContinue} variant="outlined" color="success">
                                Proceed
                              </Button>
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

export default ClubAthelete;
