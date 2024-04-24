import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tooltip,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconLayoutDashboard } from "@tabler/icons-react";
import ShooterImg from "../../../assets/images/backgrounds/shooter.png";
import Logo from "src/layouts/full/shared/logo/Logo";
import PageContainer from "src/components/page-container/PageContainer";
import FormSlideOne from "./form-slides/FormSlideOne";
import FormSlideTwo from "./form-slides/FormSlideTwo";
import FormSlideThree from "./form-slides/FormSlideThree";

import { createAthleteData } from "src/store/athlete-register-formdata/AthleteViewAndEdit";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { AppState, dispatch } from "src/store/Store";
import { notifyMessage } from "src/utils/toastNotify";
import { nanoid } from "nanoid";
import axios from "axios";
import validateForm from "src/utils/FormValidate";
import { setMessage } from "src/store/athlete-register-formdata/common/AthleteActivities";
import { checkRegistrationDetailsQRY } from "src/services/endpoints/athleteRegister";

interface PaymentSuccessState {
  paymentResponse: "";
}

const AthleteRegesterForm = () => {
  const athleteRegisteredData: any = useSelector((state: AppState) => state.athleteRegister);
  const checkMessage: any = useSelector((state: AppState) => state.athleteActivities);
  const steps = ["Basic Info", "Personal Info", "Membership & Other info"];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const [returnedPaymentResponse, setReturnedPaymentResponse] = useState({});
  const [productInfo, setProductInfo] = useState("state register");
  const [transactionId, setTransactionId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  const isStepSkipped = (step: any) => skipped.has(step);
  const navigate = useNavigate();

  const { firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, playingEvents, stateUnit, profilePhoto, birthProof } = athleteRegisteredData.slideOne;
  const { motherName, fatherName, address, pincode, cityName, stateName, addressProof } = athleteRegisteredData.slideTwo;
  const { membershipNumber, passportNumber } = athleteRegisteredData.slideThree;

  const firstSlideRequiredFields = { stateUnit, firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, playingEvents, profilePhoto, birthProof };
  const secondSlideRequiredFields = { motherName, fatherName, address, pincode, cityName, stateName, addressProof };
  const thirdSlideRequiredFields = { membershipNumber };

  // Check all the fields before next button call -----
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
        const hasErrors = Object.values(errors).some((value) => value !== undefined && value !== null && value !== "");

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
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = async (type: any) => {
    let newSkipped = skipped;

    if (activeStep === steps.length - 1) {
      if (type === "save&view") {
        console.log("type save");

        if (isSlideThreeFieldsFilled) {
          const registerDetails = await checkRegistrationDetailsQRY(email, stateUnit, passportNumber, null);
          if (registerDetails?.data.detailsAlreadyUsed) {
            registerDetails?.data.missingFields?.map((e: any) => notifyMessage.warning(`This ${e} is already registerd.`));

            return;
          } else {

            sendResponse();
          }
        } else {
          notifyMessage.error("All fields are required");
        }
      } else if (type === "pay&continue") {
        await handleOpenDialog();
        await handlePaymentAndContinue();
      }
    }
    if (activeStep === 0) {
      try {
        const registerDetails = await checkRegistrationDetailsQRY(email, stateUnit, null, null);
        if (registerDetails?.data.detailsAlreadyUsed) {
          registerDetails?.data.missingFields?.map((e: any) => notifyMessage.warning(`This ${e} is already registerd.`));

          return;
        }

      } catch (error) {
        if (error && activeStep) {
          setActiveStep(0);
          setCurrentStep(0);
        }
      }
    }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentStep((prevStep) => prevStep + 1);
    setSkipped(newSkipped);
  };

  //generating Trans ID for payment URL --
  const generateRandomTxnid = () => {
    const newTxnid = nanoid(40);
    setTransactionId(newTxnid);

    return newTxnid;
  };

  //to check the email status on backend side for the same email payment.
  const checkEmailPaymentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/check-email-payment-status/${email}?stateunit=${stateUnit}&productInfo=${productInfo}&tnxId=${transactionId}`,
      );
      // const response = await checkEmailPaymentStatusQRY(email, stateUnit, productInfo, transactionId)

      return response.data.emailAlreadyUsed;
    } catch (error) {
      console.error("Error checking email payment status:", error);

      return false;
    }
  };

  //check the payment status based on trans ID
  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-payment-status/${transactionId}?stateunit=${stateUnit}`);

      return response.data.success;
    } catch (error) {
      console.error("Error checking payment status:", error);

      return false;
    }
  };

  //Check the user data for registration before making payment for registration.
  const checkRegistrationDetailsBeforeSend = async () => {
    try {
      const response = await checkRegistrationDetailsQRY(email, stateUnit, passportNumber, contactNumber)

      const { detailsAlreadyUsed, missingFields } = response.data;
      console.log(response.data, 'data --');

      if (detailsAlreadyUsed) {
        console.warn(`Registration details already used. Missing fields: ${missingFields.join(", ")}`);
      }

      return response.data;
    } catch (error) {
      console.error("Error checking registration details:", error);

      return false;
    }
  };

  const handlePaymentAndContinue = async () => {
    console.log("type pay");
    window.open(paymentUrl, "_blank");

    await sendResponse();

    handleCloseDialog();
  };

  const handleOpenDialog = async () => {
    try {
      //check email if payment is already done with this email for this registration stored in payment_log table, in working --
      const emailAlreadyUsed = await checkEmailPaymentStatus();
      //check if the shooters data is already stored in DB, check primary values; Email, passport & Contact.
      const registerDetails = await checkRegistrationDetailsBeforeSend();

      if (emailAlreadyUsed) {
        notifyMessage.warning("This email has already been used for payment");

        return;
      } else if (registerDetails.detailsAlreadyUsed) {
        registerDetails?.missingFields?.map((e: any) => notifyMessage.warning(`Your ${e} is already registerd.`));

        return;
      } else {
        setDialogOpen(true);

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pay?stateunit=${stateUnit}`, {
          txnid: generateRandomTxnid(),
          amount: 1.0,
          email: email,
          phone: contactNumber,
          firstname: firstName,
          productinfo: "State Athlete Registration",
          surl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${stateUnit}`,
          furl: `${process.env.REACT_APP_BASE_URL}/api/payment-response?stateunit=${stateUnit}`,
        });

        console.log(response, "for pay");
        const paymentUrl = response.data;

        setPaymentUrl(paymentUrl);
        setReturnedPaymentResponse(response.data);
      }
    } catch (error) {
      console.error("Error posting data to payment API:", error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const finalResponse = {
    ...athleteRegisteredData.slideOne,
    ...athleteRegisteredData.slideTwo,
    ...athleteRegisteredData.slideThree,
  };

  console.log(finalResponse, "FInal Response --")

  const sendResponse = async () => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(finalResponse)) {
        if (key === "fireArms" || key === "coachDetails") {
          (value as any[]).forEach((item: any, index: number) => {
            Object.entries(item).forEach(([subKey, subValue]) => {
              formData.append(`${key}[${index}][${subKey}]`, subValue as string | Blob);
            });
          });
        } else if (key === "playingEvents") {
          Object.entries(value as any).forEach(([weapon, isEnabled]) => {
            formData.append(`playingEvents[${weapon}]`, isEnabled ? "true" : "false");
          });
        } else {
          formData.append(key, value as any);
        }
      }

      dispatch(createAthleteData({ formData, navigate }))
        .unwrap()
        .then((data: any) => {
          console.log(data, "response data");
        })
        .catch((error: any) => {
          if (error) {
            notifyMessage.error("Registration failed:" + error);

            if (activeStep && error) {
              setActiveStep(0);
              setCurrentStep(0);
            }
          }
        })
        .finally(() => {
          console.log("final check --");
        });
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <PageContainer title="Athlete login" description="this is Login page">
        <Grid container spacing={0}>
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
                    <img src={ShooterImg} style={{ width: "100%", height: "80%", objectFit: "contain" }} alt={`Image-shooter`} />
                  </Box>
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} lg={8} xl={8} mb={2} display="flex" justifyContent="center" alignItems="center">
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
              {activeStep === steps.length ? (
                <>
                  <Stack spacing={2} mt={3}>
                    <Alert sx={{ display: "flex", alignItems: "center" }} severity="success">Stay connected with us, While Your informations are being processed. {<CircularProgress color="inherit" size={24} />}</Alert>
                  </Stack>
                </>
              ) : (
                // null
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

                    <Button size="large" onClick={() => handleNext("save&view")} variant="contained" disabled={disabled} color={"primary"}>
                      <Typography variant="subtitle2" mr={1}>
                        {activeStep === steps.length - 1 ? "Save & View" : "Next"}
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

export default AthleteRegesterForm;
