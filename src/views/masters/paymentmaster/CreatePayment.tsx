import React, { useEffect, useState } from "react";
import { Grid, Button, RadioGroup, Switch } from "@mui/material";

// import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from "src/components/page-container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import TableHead from "src/components/table-head";
import { useSelector } from "react-redux";
// import {  handleAddpaymentReducer } from 'src/store/admin-tenents/TenentSlice';

const CreatePayment = () => {
  const [formData, setFormData] = useState({ payment_module: "", status: false });
  const stateRows = useSelector((state: any) => state.tenent.stateRows);
  console.log(stateRows, "stateRows at create");

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateToPaymentMaster: any = () => {
    navigate(`${APP_ROUTES.MASTERS}/payment-master`);
  };
  const handleChange = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleStatus = (e: any) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddPayment = () => {
    // const newPayment:any = { id: stateRows.length + 1, ...formData };
    //    dispatch(handleAddpaymentReducer(newPayment))
    navigate(`${APP_ROUTES.MASTERS}/payment-master`);
  };

  return (
    <PageContainer title="" description="this is Custom Form page">
      <ParentCard title="">
        <>
          <Grid sx={{ marginTop: "-35px" }}>
            <TableHead title="Create Payment" />
          </Grid>

          <form>
            <Grid item lg={12} md={12} xs={12}>
              <Grid container spacing={3} mb={3}>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Module master</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth name="payment_module" value={formData.payment_module} onChange={handleChange} />
                  <CustomFormLabel>Status</CustomFormLabel>
                  <RadioGroup row aria-label="position" name="areYouArjunaAwardee" defaultValue="top">
                    <Switch onChange={handleStatus} checked={formData.status} name="status" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
              onClick={navigateToPaymentMaster}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddPayment}>
              Submit
            </Button>
          </form>
        </>
      </ParentCard>
    </PageContainer>
  );
};

export default CreatePayment;
