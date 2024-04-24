import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  styled,
  Tab,
  Paper,
  InputBase,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SubjectIcon from "@mui/icons-material/Subject";
import VisibilityIcon from "@mui/icons-material/Visibility";
import userimg from "src/assets/images/profile/Male_Avatar.jpg";
import BlankCard from "src/components/shared/BlankCard";
import { Link, useParams } from "react-router-dom";
import APP_ROUTES from "src/routes/routePaths";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import { editTenantRequest, fetchTenantByIdStart, updateTenantStatusRequest } from "src/store/reducers/TenentSlice";

const TenantProfile = ({ athleteId }: any) => {
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50b2fc,#f44c66)",
    borderRadius: "50%",
    width: "145px",
    height: "145px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));

  const [value, setValue] = React.useState("1");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState("");

  const tenant = useSelector((state: AppState) => state.tenent.tenant);

  const dispatch = useDispatch();
  const params = useParams();

  const {
    state,
    contactPerson,
    alternateContactPerson,
    email,
    alternateEmail,
    contactNumber,
    alternateContactNumber,
    address,
    addressThree,
    addresstwo,
    name,
    tenantType,
    pincode,
    city,
  } = tenant;

  console.log(params, "params");
  console.log(athleteId, "athleteId");
  const { id } = params;

  useEffect(() => {
    dispatch(fetchTenantByIdStart(id));
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
  };

  const handleCloseApproveModal = async () => {
    setApproveModalOpen(false);
  };

  const handleApprove = async () => {
    const data = {
      user_status: "active",
      in_active_reason: null,
      in_active_by: "superAdmin",
    };

    console.log(data, "user_active");

    await dispatch(updateTenantStatusRequest({ data: data, id: id }));
    handleCloseApproveModal();
  };

  const handleOpenRejectModal = () => {
    setRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setRejectModalOpen(false);
    setRejectReason("");
    setRejectReasonError("");
  };

  const handleReject = async () => {
    if (rejectReason.trim() === "") {
      setRejectReasonError("Please provide a reason for rejecting.");

      return;
    } else {
      const data = {
        user_status: "in_active",
        in_active_reason: rejectReason,
        in_active_by: "superAdmin",
      };

      console.log(data, "user_active");

      await dispatch(updateTenantStatusRequest({ data: data, id: id }));
    }

    handleCloseRejectModal();
  };

  return (
    <>
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          color: "#000",
          gap: "10px",
          marginBottom: "16px",
        }}
        to={`${APP_ROUTES.TENANT}`}
      >
        {" "}
        <KeyboardBackspaceIcon /> Back To Association List
      </Link>
      <BlankCard>
        <Box
          sx={{
            height: "140px",
            minHeight: "140px",
            borderRadius: "none",
            backgroundColor: (theme) => theme.palette.grey[100],
          }}
        ></Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: "2",
                sm: "2",
                lg: "1",
              },
            }}
          >
            <Stack direction="column" textAlign="left" justifyContent="center" gap={6} m={2}>
              <Box>
                <span style={{ color: "#000", display: "flex" }}>
                  Tenant Type :
                  <Typography mx={1} color="textSecondary">
                    {tenantType}
                  </Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  {tenantType == "state" ? "state Name" : "club Name"}
                  <Typography mx={1} color="textSecondary">
                    {name}
                  </Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  Email : <Typography color="textSecondary">{email}</Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  Contact Number : <Typography color="textSecondary">{contactNumber}</Typography>
                </span>
              </Box>
            </Stack>
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: "1",
                sm: "1",
                lg: "2",
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: "-85px",
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userimg}
                    alt={userimg}
                    sx={{
                      borderRadius: "50%",
                      width: "140px",
                      height: "140px",
                      border: "4px solid #fff",
                    }}
                  />
                </ProfileImage>
                <Box mt={2}>
                  <Typography fontWeight={600} variant="h6">
                    {contactPerson}
                  </Typography>
                  <Typography color="textSecondary" variant="caption" fontWeight={400}>
                    {name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: "3",
                sm: "3",
                lg: "3",
              },
            }}
          >
            <Stack direction={"row"} gap={2} alignItems="center" justifyContent="flex-end" my={2} px={3}>
              <Button color="success" variant="contained" onClick={handleOpenApproveModal}>
                Approve
              </Button>
              <Button variant="outlined" color="error" onClick={handleOpenRejectModal}>
                Reject
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box className="athleteBox" mt={1} sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ width: "40%", paddingX: "15px", paddingBottom: "20px" }}>
            <Typography fontWeight={600} variant="h4" mb={2}>
              Tenant&apos;s Info
            </Typography>

            <Stack direction="column" gap={0.4} alignItems="flex-start" mb={0.7}>
              <span style={{ color: "#000", display: "flex" }}>
                State:
                <Typography mx={1} color="textSecondary">
                  {state}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Gender:
                <Typography mx={1} color="textSecondary">
                  Male
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                DOB:
                <Typography mx={1} color="textSecondary">
                  28-09-2009
                </Typography>
              </span>
            </Stack>
          </Box>

          <Box
            justifyContent={"end"}
            display="flex"
            flexDirection="column"
            sx={{
              overflow: "auto",
              paddingLeft: "10px",
              borderLeft: "1px solid #ccc",
              width: { xs: "333px", sm: "auto", md: "70%" },
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderRadius: "0" }}>
                <TabList sx={{ color: (theme) => theme.palette.grey[100] }} onChange={handleChange} aria-label="lab API tabs example">
                  <Tab sx={{ width: "25%", textWrap: "noWrap" }} icon={<PersonPinIcon />} iconPosition="start" label="Alternat Tenant Info" value="1" />
                  <Tab sx={{ width: "25%" }} icon={<PinDropIcon />} iconPosition="start" label="Location" value="2" />
                  <Tab sx={{ width: "25%" }} icon={<SubjectIcon />} iconPosition="start" label="Documents" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack direction="column" gap={0.4} alignItems="flex-start">
                      <span style={{ color: "#000", display: "flex" }}>
                        Alternate Contact Person:
                        <Typography mx={1} color="textSecondary">
                          {alternateContactPerson}
                        </Typography>
                      </span>
                      <span style={{ color: "#000", display: "flex" }}>
                        Alternate Contact Number:
                        <Typography mx={1} color="textSecondary">
                          {alternateContactNumber}
                        </Typography>
                      </span>
                      <Stack direction="column" gap={0.4} alignItems="flex-start">
                        <span style={{ color: "#000", display: "flex" }}>
                          State:
                          <Typography mx={1} color="textSecondary">
                            {state}
                          </Typography>
                        </span>
                        <span style={{ color: "#000", display: "flex" }}>
                          Alternate Email:
                          <Typography mx={1} color="textSecondary">
                            {alternateEmail}
                          </Typography>
                        </span>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="2">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      Address:
                      <Typography mx={1} color="textSecondary">
                        {address}
                      </Typography>
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      Address Two:
                      <Typography mx={1} color="textSecondary">
                        {addresstwo}
                      </Typography>
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      Address Three:
                      <Typography color="textSecondary">{addressThree}</Typography>
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      State:
                      <Typography color="textSecondary">{state}</Typography>
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      City:
                      <Typography color="textSecondary">{city}</Typography>
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span style={{ color: "#000", display: "flex" }}>
                      Pin Code:
                      <Typography color="textSecondary">{pincode}</Typography>
                    </span>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="3">
                <Stack /* direction={"row"} */ spacing={1}>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 380,
                      maxWidth: 380,
                    }}
                  >
                    <InputBase sx={{ ml: 1, flex: 1 }} value="Address Proof" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                      {" "}
                      <VisibilityIcon />
                    </IconButton>
                  </Paper>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 380,
                      maxWidth: 380,
                    }}
                  >
                    <InputBase sx={{ ml: 1, flex: 1 }} value="Memorandom Proof" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                      {" "}
                      <VisibilityIcon />
                    </IconButton>
                  </Paper>
                </Stack>
              </TabPanel>
            </TabContext>

            <Dialog open={isApproveModalOpen} onClose={handleCloseApproveModal}>
              <DialogTitle>Confirm Approval</DialogTitle>
              <DialogContent>
                <DialogContentText>Are you sure you want to approve this medalist?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseApproveModal} color="error">
                  No
                </Button>
                <Button onClick={handleApprove} color="primary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            {/* Reject Reason Modal */}
            <Dialog open={isRejectModalOpen} onClose={handleCloseRejectModal}>
              <DialogTitle>Enter Reject Reason</DialogTitle>
              <DialogContent>
                <DialogContentText>Please provide a reason for rejecting:</DialogContentText>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  variant="outlined"
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    setRejectReasonError(""); // Clear the reject reason error on input change
                  }}
                  error={Boolean(rejectReasonError)}
                  helperText={rejectReasonError}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRejectModal} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleReject} color="error">
                  Reject
                </Button>
              </DialogActions>
            </Dialog>

            {/* Modal for displaying certificate */}
            <Dialog
              open={isModalOpen}
              onClose={handleCloseModal}
              sx={{
                width: "90%", // Increase the width of the modal
                height: "90%", // Increase the height of the modal
              }}
            ></Dialog>
          </Box>
        </Box>
      </BlankCard>
    </>
  );
};

export default TenantProfile;
