import { Grid, IconButton, Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import TableHead from "src/components/table-head";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import ParentCard from "src/components/shared/ParentCard";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import userimg from "src/assets/images/profile/user-1.jpg";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import FileError from "../../assets/images/backgrounds/file error.png";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { IEditAwardees } from "src/types/Awardees";
import BackLink from "src/components/back-link";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditAwardee() {
  const [base64Image, setBase64Image] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const [shooters, setShooters] = React.useState<IEditAwardees>({
    name: "",
    event: "",
  });

  const errorInitialState: any = generateErrorInitialState(shooters);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(shooters);
    setError(newErrors);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCurrency(event.target.value);
    const { name, value } = e.target;
    setShooters({ ...shooters, [name]: value });
  };

  const checkError = (fieldName: keyof IEditAwardees) => {
    const newErrors: any = validateForm({ [fieldName]: shooters[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IEditAwardees) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform data validation here
    const check = Object.values(shooters).every((e) => e !== ""); //
    console.log(check, "check"); // If all values are non-empty, check will be true; otherwise, false.
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      // navigate("/railway-concession-certificate");
      notifyMessage.success("Saved successfully!!!");
    }
  };

  const handleOpenAlert = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseAlert();
  };
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50b2fc,#f44c66)",
    borderRadius: "50%",
    width: "110px",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: any = reader.result;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(base64Image);

  const handleCancel = () => {
    navigate(`${APP_ROUTES.AWARDEES}`);
  };

  return (
    <>
      <BackLink title="Back to the Awardees Page" route={APP_ROUTES.AWARDEES} />
      <Box
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
          marginTop: "0px",
        }}
      >
        {/* <TableHead title='Edit User' /> */}

        <ParentCard
          title=""
          footer={
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 1,
                }}
                onClick={handleCreate}
              >
                Save
              </Button>
              <Button variant="contained" color="primary" onClick={handleCreate}>
                Save and Add More
              </Button>
              <Button
                color="error"
                onClick={handleCancel}
                sx={{
                  ml: 1,
                }}
              >
                cancel
              </Button>
            </>
          }
        >
          <>
            <TableHead title="EDIT ARJUNA/INTERNATIONAL AWARDEES" />
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", boxShadow: "lg" }}>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <Grid sx={{ display: "flex" }}>
                  <CustomFormLabel htmlFor="lname-text">Shooter Name :</CustomFormLabel>
                  <span style={{ marginTop: "28px", marginLeft: "8px" }}>ANUSHKA PATIL</span>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <CustomFormLabel htmlFor="lname-text">Awarded Type :</CustomFormLabel>
                  <span style={{ marginTop: "28px", marginLeft: "8px" }}>INTERNATIONAL</span>
                </Grid>

                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <CustomFormLabel htmlFor="lname-text">
                      Certificate
                      <RequiredStar />
                    </CustomFormLabel>
                  </Grid>
                  <Grid item onClick={handleOpenAlert}>
                    <IconButton sx={{ marginTop: "20px", marginLeft: "-10px" }}>
                      <VisibilityRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch"></Grid>
                <Grid>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                  </Button>

                  <AlertBox
                    open={alertOpen}
                    title="Awardee Certificate"
                    disabled={false}
                    buttonText="Save"
                    message={
                      <Grid>
                        {base64Image ? <img src={base64Image} alt="Your Image" width="500" height="300" /> : <img src={FileError} alt="Your Image" width="500" height="300" />}
                      </Grid>
                    }
                    onClose={handleCloseAlert}
                    onConfirm={handleConfirmAction}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel htmlFor="lname-text">
                    Name
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ width: 450 }}
                    id="fname-text"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={shooters.name}
                    onChange={handleChange2}
                    error={!!error.name}
                    helperText={error.name}
                    {...createFieldHandlers("name")}
                  />
                </Grid>
                <Grid>
                  <CustomFormLabel htmlFor="lname-text">
                    Event
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ width: 450 }}
                    id="fname-text"
                    variant="outlined"
                    fullWidth
                    name="event"
                    value={shooters.event}
                    onChange={handleChange2}
                    error={!!error.event}
                    helperText={error.event}
                    {...createFieldHandlers("event")}
                  />
                </Grid>
              </Grid>
              <Grid item sx={{ marginTop: "100px", marginRight: "150px" }}>
                <Box>
                  <ProfileImage>
                    {base64Image ? (
                      <Avatar
                        src={base64Image}
                        alt={userimg}
                        sx={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          border: "4px solid #fff",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={userimg}
                        alt={userimg}
                        sx={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          border: "4px solid #fff",
                        }}
                      />
                    )}
                  </ProfileImage>
                  <Box mt={1}>
                    <Typography fontWeight={600} variant="h5">
                      Name : Mathew Anderson
                    </Typography>
                    <Typography color="textSecondary" variant="h6" fontWeight={400}>
                      awardee : Designer
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        </ParentCard>
      </Box>
    </>
  );
}

export default EditAwardee;
