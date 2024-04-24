import React, { useEffect, useState } from "react";
import { Paper, TableContainer, Grid, Autocomplete, Button } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import BlankCard from "src/components/shared/BlankCard";
import { useNavigate, useParams } from "react-router";
import { fetchTenantListStart } from "src/store/reducers/TenentSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import APP_ROUTES from "src/routes/routePaths";

const SearchTenant = () => {
  const [selectedTenant, setSelectedTenant] = useState({
    label:"",
    value:''
  });
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme:any) => theme.breakpoints.up("lg"));
  const params = useParams();
  const tenantList = useSelector((state: AppState) => state.tenent.tenantList);
  const dispatch = useDispatch();
console.log(selectedTenant,"selectedTenant")


  useEffect(() => {
    dispatch(fetchTenantListStart());
  }, [dispatch]);

  const handleTenantSelection = (event:any, newValue:any) => {
    setSelectedTenant(newValue);
  };

  const handleNavigate = () => {
    if (selectedTenant) {
      const id = selectedTenant.value
      console.log(selectedTenant)
      navigate(`${APP_ROUTES.SUPER_ADMIN_ACCESS_CONTROL}/${id}`);
    }
  };

  return (
    <PageContainer title="user page" description="this is user page">
      <Paper
        sx={{
          flexShrink: 0,
          border: "0",
          borderLeft: "1px",
          borderStyle: "solid",
          right: "0",
          background: (theme) => theme.palette.background.paper,
          boxShadow: "3",
          position: lgUp ? "relative" : "absolute",
          borderColor: (theme) => theme.palette.divider,
          marginTop: "35px",
        }}
      >
        <BlankCard>
          <TableHead title="Tenants" />
          <Grid sx={{ p: 1, mb: 1 }}>
            <CustomFormLabel htmlFor="lname-text">
              Select Tenant
              <RequiredStar />
            </CustomFormLabel>

            <Autocomplete
              id="text-emailss"
              options={tenantList.map((tenant:any) => ({ label: tenant.name, value: tenant.id }))}
              getOptionLabel={(option:any) => option.label || ""}
              value={selectedTenant}
              onChange={handleTenantSelection}
              renderInput={(params) => (
                <CustomTextField {...params} name="shootername" fullWidth margin="normal" sx={{ width: "50%", mt: 0 }} />
              )}
            />
            <Button variant="contained" color="primary" onClick={handleNavigate}>
              Submit
            </Button>
          </Grid>
          <TableContainer>{/* Your table or other components here */}</TableContainer>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default SearchTenant;
