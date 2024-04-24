import React from "react";
import { Grid, Box, Typography, Button, Avatar, Stack, styled, Tab, Paper, InputBase, IconButton, Skeleton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

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
import { AppState } from "src/store/Store";
import { formatDate } from "src/utils/basicFormaters";

const ViewOnlyAthlete = () => {
  const { athleteId } = useParams();
  const { athleteResponse, isLoading } = useSelector((state: AppState) => state.viewAthlete);

  const { email, place_of_birth, contact_number, first_name, last_name, 
    stateName, date_of_birth, address_proof, birth_proof, gender, main_event,
    father_name, mother_name, playing_events
  } = athleteResponse;

  const playingEventKeys = Object.entries(playing_events)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const playingEventsString = playingEventKeys.join(', ');

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
  const [selectedDocument, setSelectedDocument] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleViewDocument = (documentType: string) => {
    setSelectedDocument(documentType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" animation="wave" width="100%" height={"20vh"}></Skeleton>
        <Skeleton variant="rectangular" sx={{ mb: 1 }} animation="wave" width="100%" height={"20vh"}></Skeleton>
        <Skeleton variant="rectangular" animation="wave" width="100%" height={"30vh"}></Skeleton>
      </>
    );
  }

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.ATHLETE_ONLY}`}>

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
                  Email:<Typography color="textSecondary"> {email}</Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  Contact Number:<Typography color="textSecondary">{contact_number}</Typography>
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
                    {first_name + " " + last_name}
                  </Typography>
                  <Typography color="textSecondary" variant="caption" fontWeight={400}>
                    UNDER STATE APPROVEL
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
              <Button color="success" component={Link} to={`${APP_ROUTES.ATHLETE_ONLY}/edit/athlete/${athleteId}`} variant="contained">
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
                  {stateName}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Gender:
                <Typography mx={1} color="textSecondary">
                  {gender}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                DOB:
                <Typography mx={1} color="textSecondary">

                  {formatDate(date_of_birth)}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Main Event:
                <Typography mx={1} color="textSecondary" sx={{ textTransform: "capitalize" }}>
                  {main_event}
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
                <TabList sx={{ color: (theme) => theme.palette.grey[100] }} onChange={handleChange} aria-label="lab API tabs example">
                  <Tab sx={{ width: "25%" }} icon={<PersonPinIcon />} iconPosition="start" label="User Info" value="1" />
                  <Tab sx={{ width: "25%" }} icon={<PinDropIcon />} iconPosition="start" label="Location" value="2" />
                  <Tab sx={{ width: "25%" }} icon={<SubjectIcon />} iconPosition="start" label="Documents" value="3" />
                </TabList>
              </Box>
              <Box sx={{ minHeight: "160px" }} >
                <TabPanel value="1">
                  <Typography variant="body1"> Place Of Birth : {place_of_birth}</Typography>
                  <Typography variant="body1"> Father Name : {father_name}</Typography>
                  <Typography variant="body1"> Mother Name : {mother_name}</Typography>
                  <Typography variant="body1"> Playing Events : {playingEventsString}</Typography>

                </TabPanel>
                <TabPanel value="2">Locations</TabPanel>
                <TabPanel value="3">
                  <Stack direction={"row"} spacing={1}>
                    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300, maxWidth: 300 }}>
                      <InputBase sx={{ ml: 1, flex: 1 }} value="Address Proof" />
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleViewDocument('address_proof')}>
                        <VisibilityIcon />
                      </IconButton>
                    </Paper>
                    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300, maxWidth: 300 }}>
                      <InputBase sx={{ ml: 1, flex: 1 }} value="Birth Proof" />
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => handleViewDocument('birth_proof')}>
                        <VisibilityIcon />
                      </IconButton>
                    </Paper>
                  </Stack>
                  <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle>{selectedDocument === 'address_proof' ? 'Address Proof' : 'Birth Proof'}</DialogTitle>
                    <DialogContent>
                      {selectedDocument === 'address_proof' && (
                        <img src={address_proof} alt="Address Proof" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                      )}
                      {selectedDocument === 'birth_proof' && (
                        <img src={birth_proof} alt="Birth Proof" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </BlankCard>
    </>
  );
};

export default ViewOnlyAthlete;
