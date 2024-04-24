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
  TextField,
  DialogContent,
  DialogActions,
  PaperProps,
} from "@mui/material";

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
import { IProfileBannerProps } from "src/types/Athletes";
import { useDispatch } from "react-redux";
import { fetchSingleAthleteRequest, updateAthleteStatusStart } from "src/store/reducers/atheleteSlice";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { formatDateWithMoment } from "src/utils/basicFormaters";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ProfileBanner: React.FC<IProfileBannerProps> = ( {athleteId} ) => {
  const [blockAthlete, setBlockAthlete] = useState(false);
  const [reason, setReason] = useState("");
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

  const [value, setValue] = React.useState<string>("1");
  const dispatch = useDispatch();
  const athlete = useSelector((state:AppState)=>state.athelete.Athlete)
  console.log(athlete,"athlete")
  const response = useSelector((state:AppState)=>state.athelete.response)
  console.log(response,"resss")
  const {first_name,last_name,email,address,mother_name,father_name,pincode,place_of_birth,contact_number,gender,is_approved,is_rejected,date_of_birth,main_event} = athlete
  const id = athleteId.athleteId

  useEffect(()=>{

    if(id){
      dispatch(fetchSingleAthleteRequest(id))

    }
  },[id,dispatch])
  

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenReject = () => {
    setBlockAthlete(true);
  };
  const handleClose = () => {
    setBlockAthlete(false);
    setReason("")
    dispatch(fetchSingleAthleteRequest(id))

    // setAthletePassword(false);
  };
  const handleChangeStatus = (status: any) => {
    if (status === "stateAdmin") {
      dispatch(updateAthleteStatusStart({ id, data: { approved_by: status, rejected_reason: null, block_reason: null } }));
      dispatch(fetchSingleAthleteRequest(id))


    } else {
      dispatch(updateAthleteStatusStart({ id, data: { approved_by: null, rejected_reason: reason, block_reason: null } }));
      setReason("")
      setBlockAthlete(false);
      dispatch(fetchSingleAthleteRequest(id))
    }
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
        to={`${APP_ROUTES.ATHLETES}`}
      >
        {" "}
        <KeyboardBackspaceIcon /> Back to the Athletes
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
            <Dialog open={blockAthlete} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
              <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
                Rejection Reason
              </DialogTitle>
              <DialogContent>
                <TextField required fullWidth id="outlined-required" onChange={(e) => setReason(e.target.value)} value={reason} name="reason" placeholder="Add Block Reason.." />
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                
                <Button color="error" variant="outlined" onClick={handleChangeStatus} >
                  Reject
                </Button>
              </DialogActions>
            </Dialog>
            <Stack direction="column" textAlign="left" justifyContent="center" gap={6} m={2}>
              <Box>
                <span style={{ color: "#000", display: "flex" }}>
                  Email Id:
                  <Typography color="textSecondary"> {email} </Typography>
                </span>
                <span style={{ color: "#000", display: "flex" }}>
                  Contact Number:<Typography color="textSecondary">9320058123</Typography>
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
                    {first_name} {last_name}
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
              <Button color="success" variant="contained" onClick={() => handleChangeStatus("stateAdmin")} disabled={is_approved !== null}>
                Approve
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleOpenReject()} disabled={is_rejected !== null}>
                Reject
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
                  Maharashtra
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
                  {formatDateWithMoment(date_of_birth)}
                </Typography>
              </span>
              <span style={{ color: "#000", display: "flex" }}>
                Main Event:
                <Typography mx={1} color="textSecondary">
                  {" "}
                  {main_event}
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
                  <Tab sx={{ width: "25%" }} icon={<PersonPinIcon />} iconPosition="start" label="User Info" value="1" />
                  <Tab sx={{ width: "25%" }} icon={<PinDropIcon />} iconPosition="start" label="Location" value="2" />
                  <Tab sx={{ width: "25%" }} icon={<SubjectIcon />} iconPosition="start" label="Documents" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">User Info</TabPanel>
              <TabPanel value="2">Locations</TabPanel>
              <TabPanel value="3">
                <Stack direction={"row"} spacing={1}>
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
                    <InputBase sx={{ ml: 1, flex: 1 }} value="Birth Proof" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                      {" "}
                      <VisibilityIcon />
                    </IconButton>
                  </Paper>
                </Stack>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
