import React, { useEffect } from "react";
import { Grid, Box, Typography, Button, Avatar, Stack, styled, Tab, Paper, InputBase, IconButton, Skeleton, Theme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SubjectIcon from "@mui/icons-material/Subject";
import VisibilityIcon from "@mui/icons-material/Visibility";
import userimg from "src/assets/images/profile/user-1.jpg";
import BlankCard from "src/components/shared/BlankCard";
import { Link } from "react-router-dom";
import APP_ROUTES from "src/routes/routePaths";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AppDispatch, AppState } from "src/store/Store";
//import { fetchAthleteData,  setShooterId} from "src/store/athlete-register-formdata/AthleteViewAndEdit";
import { fetchClubAthleteData, setShooterId } from "src/store/clubRegister/ClubAthleteViewEdit";
import { useDispatch } from "react-redux";
import { formatDate } from "src/utils/basicFormaters";

const ClubProfileView = () => {
  const { athleteId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { athleteResponse, isLoading } = useSelector((state: AppState) => state.viewClubAthlete);
  console.log(athleteId, athleteResponse, isLoading);
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50B2FC,#F44C66)",
    borderRadius: "50%",
    width: "145px",
    height: "145px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));
  const [value, setValue] = React.useState("1");
   const [selectedDocument, setSelectedDocument] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


 const handleViewDocument = (documentType: string) => {
    setSelectedDocument(documentType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };






  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken, "decoded");
      if (decodedToken) {
        const { userId } = decodedToken;
        dispatch(setShooterId(userId));
        dispatch(fetchClubAthleteData({ id: userId }));
      }
    }
  }, [dispatch]);
  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" animation="wave" width="100%" height={"20vh"}></Skeleton>
        <Skeleton variant="rectangular" sx={{ mb: 1 }} animation="wave" width="100%" height={"20vh"}></Skeleton>
        <Skeleton variant="rectangular" animation="wave" width="100%" height={"30vh"}></Skeleton>
      </>
    );
  }
  console.log(athleteResponse, "from mappings");

  const formattedDateOfBirth = formatDate(athleteResponse.dOB);

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.ATHLETE_CLUB_ONLY}`}>
        {" "}
        <KeyboardBackspaceIcon /> Back to the Athletes
      </Link>
      <BlankCard>
        <Box sx={{ height: "140px", minHeight: "140px", borderRadius: "none", backgroundColor: (theme) => theme.palette.grey[100] }}></Box>
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
                  Email:<Typography color="textSecondary"> {athleteResponse?.email}</Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  Contact Number:<Typography color="textSecondary">{athleteResponse?.phone}</Typography>
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
                    src={athleteResponse.profile_photo}
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
                    {athleteResponse?.first_name + " " + athleteResponse?.last_name}
                  </Typography>
                  <Typography color="textSecondary" variant="caption" fontWeight={400}>
                    UNDER CLUB APPROVEL
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
              <Button color="success" component={Link} to={`${APP_ROUTES.ATHLETE_CLUB_EDIT}/${athleteId}`} variant="contained">
                Edit Your Profile
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Box className="athleteBox" mt={1} sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ width: "40%", paddingX: "15px", paddingBottom: "20px" }}>
            <Typography fontWeight={600} variant="h4" mb={2}>
              Athlete&apos;s Intro
            </Typography>
            <Stack direction="column" gap={0.4} alignItems="flex-start" mb={0.7}>
              <span style={{ color: "#000", display: "flex" }}>
                State:
                <Typography mx={1} color="textSecondary">
                  {athleteResponse?.state_unit}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Gender:
                <Typography mx={1} color="textSecondary">
                  {athleteResponse?.gender}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                DOB:
                <Typography mx={1} color="textSecondary">
                  {" "}
                  {formattedDateOfBirth}{" "}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Events:
                <Typography mx={1} color="textSecondary" sx={{ textTransform: "capitalize" }}>
                  {athleteResponse?.event}{" "}
                </Typography>
              </span>
            </Stack>
            {/* <Stack direction="row" gap={2} alignItems="center" mb={1}>
                <IconMapPin size="21" />
                <Typography variant="h6">Newyork, USA - 100001</Typography>
            </Stack> */}
          </Box>
          <Box
            justifyContent={"end"}
            display="flex"
            flexDirection="column"
            sx={{ overflow: "auto", paddingLeft: "10px", borderLeft: "1px solid #ccc", width: { xs: "333px", sm: "auto", md: "70%" } }}
          >
            <TabContext value={value}>
              <Box sx={{ borderRadius: "0" }}>
                <TabList sx={{ color: (theme: Theme) => theme.palette.grey[100] }} onChange={handleChange} aria-label="lab API tabs example">
                  <Tab sx={{ width: "25%" }} icon={<PersonPinIcon />} iconPosition="start" label="User Info" value="1" />
                  <Tab sx={{ width: "25%" }} icon={<PinDropIcon />} iconPosition="start" label="Location" value="2" />
                  <Tab sx={{ width: "25%" }} icon={<SubjectIcon />} iconPosition="start" label="Documents" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">       
              <Typography variant="body1"> Aadhar : {athleteResponse.aadhar_card}</Typography>
                <Typography variant="body1"> Membership : {athleteResponse.membership_type}</Typography>              
                  </TabPanel>
              <TabPanel value="2">  
              <Typography variant="body1"> Address : {athleteResponse.address}</Typography>
             {/* <Typography variant="body1"> State : {athleteResponse.state}</Typography> */}
                  <Typography variant="body1"> City : {athleteResponse.city}</Typography>
                  <Typography variant="body1"> Pincode : {athleteResponse.pincode}</Typography>
             
              </TabPanel>
              <TabPanel value="3">
                  <Stack direction={"row"} spacing={1}>
                    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300, maxWidth: 300 }}>
                      <InputBase sx={{ ml: 1, flex: 1 }} value="Address Proof" />
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleViewDocument('address_proof')}>
                        <VisibilityIcon />
                      </IconButton>
                    </Paper>
                    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300, maxWidth: 300 }}>
                      <InputBase sx={{ ml: 1, flex: 1 }} value="profile_photo" />
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleViewDocument('profile_photo')}>
                        <VisibilityIcon />
                      </IconButton>
                    </Paper>
                  </Stack>
                  <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle>{selectedDocument === 'address_proof' ? 'Address Proof' : 'profile_photo'}</DialogTitle>
                    <DialogContent>
                      {selectedDocument === 'address_proof' && (
                        <img src={athleteResponse.address_proof} alt="Address Proof" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                      )}
                      {selectedDocument === 'profile_photo' && (
                        <img src={athleteResponse.profile_photo} alt="profile_photo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>
                  </Dialog>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </BlankCard>
    </>
  );
};
export default ClubProfileView;
