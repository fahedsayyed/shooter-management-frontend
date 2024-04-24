import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Alert, Stack, Grid, Dialog, DialogTitle, Typography, DialogContent, DialogActions } from "@mui/material";

import Personalinfo from "./formInfos/Personalinfo";
import ContractInfo from "./formInfos/TenantInfo";
// import PageContainer from 'src/views/CoachingCamp/PageContainer';
import ParentCard from "src/components/shared/ParentCard";
import TableHead from "src/components/table-head";
import APP_ROUTES from "src/routes/routePaths";
import {  useNavigate, useParams } from "react-router";
import Charges from "./formInfos/Charges";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import BackLink from "src/components/back-link";
import PageContainer from "src/components/page-container/PageContainer";
import { useDispatch } from "react-redux";
import { addTenantRequest, editTenantRequest } from "src/store/reducers/TenentSlice";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { SlideOneInterface, SlideThreeInterface, SlideTwoInterface } from "src/types/superAdmin";
import Contract from "./formInfos/contract";
import axios from "axios";
import { nanoid } from "nanoid";

const steps = ["Association Info", "Contact Info", "Subscription & Plan"];

const TenentsSliderForm = () => {
  const detailsFromReducer = useSelector((state: AppState) => state.tenent.formData.slideOne);
  const detailsFromReducerSlideTwo = useSelector((state: AppState) => state.tenent.formData.slideTwo);
  const detailsFromReducerSlideThree : SlideThreeInterface  = useSelector((state: AppState) => state.tenent.formData.slideThree);
console.log(detailsFromReducerSlideThree,"detailsFromReducerSlideThree")

  const errorInitialState: any = generateErrorInitialState(detailsFromReducer);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  // const [currentStep, setCurrentStep] = React.useState(0);
  const [disabled, setDisabled] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [returnedPaymentResponse, setReturnedPaymentResponse] = useState({});
  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = React.useState(errorInitialState);
  const slides = useSelector((state: AppState) => state.tenent.formData);

  const dispatch = useDispatch();
  const params = useParams();

  const isStepSkipped = (step: any) => skipped.has(step);
  const navigate = useNavigate();
  const tenant = useSelector((state: AppState) => state.tenent.tenant);

  const associatedWith = params.AssociatedWith
  const { tenentType, name, state, address, address2, address3, pincode, city,memoRandomProof } = slides.slideOne;
  const { contactPerson, email, phoneNo, alternateContactPerson, alternateEmail, alternatePhoneNo } = slides.slideTwo;
  const {subscriptionAndPlanId,transactionNumber } = slides.slideThree;
  // const contracts = useSelector((state: AppState) => state.tenent.contract);

  const data: Record<string, any> = {
    tenantType: associatedWith,
    name: name,
    state: state,
    address: address,
    addressTwo: address2,
    addressThree: address3,
    city: city,
    pincode: pincode ? parseInt(pincode, 10) : null,
    contactPerson: contactPerson,
    alternateContactPerson: alternateContactPerson,
    email: email,
    alternateEmail: alternateEmail,
    contactNumber: phoneNo ? parseInt(phoneNo, 10) : null,
    alternateContactNumber: alternatePhoneNo ? parseInt(alternatePhoneNo, 10) : null,
    memoRandomProof : memoRandomProof,
    // contractName: contractName,
    // contractStatus: contractStatus,
    // contract_start_date: contract_start_date,
    // contract_end_date: contract_end_date,
    // contract_document: contract_document,
    password: "1234",
    flag: "finish",
  };

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Append each item in the array individually
      value.forEach((item, index) => {
        Object.entries(item).forEach(([subKey, subValue]: any) => {
          const subKeyWithIndex = `${key}[${index}].${subKey}`;
          formData.append(subKeyWithIndex, subValue);
        });
      });
    } else {
      formData.append(key, value);
    }
  });

  // for (const key in data) {
  //   if (data[key] !== undefined && data[key] !== null) {
  //     if (key === 'contracts' && Array.isArray(data[key])) {
  //       data[key].forEach((contract: Record<string, any>, index: number) => {
  //         for (const contractKey in contract) {
  //           if (contract[contractKey] !== undefined && contract[contractKey] !== null) {
  //             formData.append(`contracts[${index}][${contractKey}]`, contract[contractKey]);
  //           }
  //         }
  //       });
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  // }
  // formData.append('contract_document', contract_image);
  // const areAllFieldsFilled = (...slide: any) => {
  //   return Object.values(slide).every((value) => value !== "");
  // };

  const areAllFieldsFilled = (...slide: any) => {
    return Object.values(slide).every((value) => value !== "");
  };

  useEffect(() => {
    const isSlideOneFieldsFilled = areAllFieldsFilled(name, state, address, pincode, city, memoRandomProof);
    const isSlideTwoFieldsFilled = areAllFieldsFilled(contactPerson, email, phoneNo);
    const isSlideThreeFieldsFilled = areAllFieldsFilled(subscriptionAndPlanId, transactionNumber);
console.log(isSlideThreeFieldsFilled,"isSlideThreeFieldsFilled")
    switch (activeStep) {
      case 0:
        setHasError(isSlideOneFieldsFilled);
        break;

      case 1:
        setHasError(isSlideTwoFieldsFilled);
        break;
      case 2:
        setHasError(isSlideThreeFieldsFilled);
        break;
          

      default:
        setHasError(true);
    }
  }, [activeStep, detailsFromReducer, detailsFromReducerSlideTwo,detailsFromReducerSlideThree]);

  const checkError = (fieldName: keyof SlideOneInterface) => {
    const newErrors: { [key in keyof SlideOneInterface]?: string } = validateForm({ [fieldName]: detailsFromReducer[fieldName] });
    setError((prevErrors: { [key in keyof SlideOneInterface]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const checkErrorForSlideTwo = (fieldName: keyof SlideTwoInterface) => {
    const newErrors: { [key in keyof SlideTwoInterface]?: string } = validateForm({ [fieldName]: detailsFromReducerSlideTwo[fieldName] });
    setError((prevErrors: { [key in keyof SlideTwoInterface]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };
  const checkErrorForSlideThree = (fieldName: keyof SlideThreeInterface) => {
    const newErrors: { [key in keyof SlideThreeInterface]?: string } = validateForm({ [fieldName]: detailsFromReducerSlideThree[fieldName] });
    setError((prevErrors: { [key in keyof SlideThreeInterface]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: any) => ({
    onBlur: () => checkError(fieldName),
  });
  const createFieldHandlersSlideTwo = (fieldName: any) => ({
    onBlur: () => checkErrorForSlideTwo(fieldName),
  });
  const createFieldHandlersSlideThree = (fieldName: any) => ({
    onBlur: () => checkErrorForSlideThree(fieldName),
  });

  const wholeError = () => {
    if (activeStep == 0) {
      const newErrors = validateForm(detailsFromReducer);
      setError(newErrors);
    } else if (activeStep == 1) {
      const newErrors = validateForm(detailsFromReducerSlideTwo);
      setError(newErrors);
    }
    else if(activeStep == 2){
      const newErrors = validateForm(detailsFromReducerSlideThree);
      setError(newErrors);
    }
  };

  // {
  //   activeStep === steps.length ? navigate(`${APP_ROUTES.TENANT}`) : null;
  // }

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
      console.log(transactionId,"transactionId")
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/check-payment-status/${transactionId}`);

      return response.data.success;
    } catch (error) {
      console.error("Error checking payment status:", error);

      return false;
    }
  };

  const handlePaymentAndContinue = async () => {
    console.log("type pay");
    window.open(paymentUrl, "_blank");

    const paymentSuccess = await checkPaymentStatus();

    if (paymentSuccess) {
      handleNext();
    }

    handleCloseDialog();
  };

  const handleOpenDialog = async () => {
    setDialogOpen(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pay`, {
        // txnid: transactionId,
        txnid: generateRandomTxnid(),
        amount: 1.0,
        email: email,
        phone: 82683888380,
        firstname: "sayyed fahed",
        productinfo: "Shooters management",
        surl: "http://localhost:5000/v1/api/payment-success",
        furl: "http://localhost:5000/v1/api/payment-failure",
      });

      console.log(response, "for pay");
      const paymentUrl = response.data;

      setPaymentUrl(paymentUrl);
      setReturnedPaymentResponse(response.data);
    } catch (error) {
      console.error("Error posting data to payment API:", error);
    }
  };

  const handleNext = async () => {
    if (!hasError) {
      wholeError();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // setCurrentStep((prevStep) => prevStep + 1);
      setSkipped(newSkipped);
      // if (activeStep === 2) {
      //   if (params.id && tenant) {
      //     dispatch(
      //       setSlideThreeFormData({
      //         contractName: contractName || "",
      //         contract_status: contractStatus || "",
      //         contract_start_date: contract_start_date || "",
      //         contract_end_date: contract_end_date || "",
      //         contract_document: contract_document || "",
      //       }),
      //     );
      //   }

      // }
      if (activeStep === 2) {
        try {
          if (params.id) {
            const id = parseInt(params.id);
            await dispatch(editTenantRequest({ formData: formData, id: id }));
          } else {
            await dispatch(addTenantRequest(formData));
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // setCurrentStep((prevStep) => prevStep - 1);
  };

  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <Personalinfo params={params} createFieldHandlers={createFieldHandlers} errors={error} wholeError={wholeError} />;
      case 1:
        return <ContractInfo params={params} createFieldHandlersSlideTwo={createFieldHandlersSlideTwo} errors={error} />;
      case 2:
        return <Contract disabled={disabled} params={params} errors={error} createFieldHandlersSlideThree={createFieldHandlersSlideThree} />;
      case 3:
        return <Charges />;
      default:
        break;
    }
  };
  const handleReset = () => {
    navigate(`${APP_ROUTES.TENANT}`);
  };
  const handleBackToAdminDashBoard: any = () => {
    navigate(`${APP_ROUTES.TENANT}`);
    localStorage.clear();
  };

  return (
    <PageContainer>
      <BackLink title="Back to the Association Page" route={APP_ROUTES.TENANT} />

      <ParentCard title="">
        <>
          <Grid sx={{ marginTop: "-35px" }}>
            <TableHead title={params.id ? "Edit Association" : "Add Association"} />
          </Grid>
          <Box width="100%" sx={{ marginTop: "20px", padding: "10px" }}>
            <Stepper activeStep={activeStep}>
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
                  <Alert severity="success">All steps completed - you&apos;re finished</Alert>

                  <Box textAlign="right">
                    <Button onClick={handleReset} variant="contained" color="success">
                      Finish
                    </Button>
                  </Box>
                </Stack>
              </>
            ) : (
              <>
                <Box>{handleSteps(activeStep)}</Box>

                <Box display="flex" flexDirection="row" mt={3}>
                  {activeStep >= 1 ? (
                    <Button color="inherit" variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                  ) : (
                    <Button size="large" variant="text" color="error" onClick={handleBackToAdminDashBoard}>
                      Cancel
                    </Button>
                  )}
                  <Box flex="1 1 auto" />

                  <Button onClick={handleNext} disabled={!hasError || disabled} variant="contained" color={activeStep === steps.length - 1 ? "success" : "secondary"}>
                    {activeStep === steps.length - 1 ? "Next" : "Next"}
                  </Button>
                </Box>
              </>
            )}
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
          </Box>
        </>
      </ParentCard>
    </PageContainer>
  );
};

export default TenentsSliderForm;
