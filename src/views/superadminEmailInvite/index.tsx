
import React, { useEffect, useState } from "react";
import { Paper, TableContainer, Grid, Autocomplete, Button, Box } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import BlankCard from "src/components/shared/BlankCard";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { sendEmailToTenantRequest } from "src/store/reducers/TenentSlice";
import { useDispatch } from "react-redux";

const EmailInvite = () => {
const [userEmail,setuserEmail] = useState()
const [fullName,setFullName] = useState()
const dispatch = useDispatch()

  const lgUp = useMediaQuery((theme:any) => theme.breakpoints.up("lg"));

  const saveEmail = (e:any) =>{
    setuserEmail(e.target.value)
  }
  

  const handleNavigateToTenant = (item:any) =>{
    console.log(item,"item")
    const associatedWith = item
    dispatch(sendEmailToTenantRequest({userEmail,associatedWith,fullName}))
  }

  const saveTenantName = (e:any) =>{
    setFullName(e.target.value)
  }

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
        <TableHead title="Invite Association" />
        <Grid container sx={{ p: 1, mb: 1 }} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={12} lg={8}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="text-address"
            >
              Send Email <RequiredStar />
            </CustomFormLabel>
            <Box width="35vw" sx={{display:"flex", justifyContent:"space-between"}}>
            <CustomTextField
              id="text-address"
              name="send email"
              onChange = {saveEmail}
              value = {userEmail}
              fullWidth
            />

           
            </Box>
          </Grid>

        </Grid>
        <Grid container sx={{ p: 1, mb: 1 }} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={12} lg={8}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="text-address"
            >
              Associate Full Name <RequiredStar />
            </CustomFormLabel>
            <Box width="35vw" sx={{display:"flex", justifyContent:"space-between"}}>
            <CustomTextField
              id="text-address"
              name="send email"
              onChange = {saveTenantName}
              value = {fullName}
              sx ={{width:'50%'}}
              fullWidth
                          />
      
            <Box ml={0}>
            <PopupState variant="popover" popupId="demo-popup-menu" >
          {(popupState: any) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)} > 
               send
              </Button>
              <Menu {...bindMenu(popupState)} /* onClick={()=>handleNavigateToTenant()} */>
                <MenuItem onClick={() => handleNavigateToTenant('State')}> State </MenuItem>
                <MenuItem onClick={() => handleNavigateToTenant('Club')}> Club </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
            </Box>
            </Box>
          </Grid>

        </Grid>
      </BlankCard>
    </Paper>
  </PageContainer>
  );
};

export default EmailInvite;
