import { Grid, IconButton, Box, Typography, Avatar, FormControl, MenuItem, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import TableHead from "src/components/table-head";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import ParentCard from "src/components/shared/ParentCard";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import userimg from "src/assets/images/profile/user-1.jpg";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import FileError from "../../assets/images/backgrounds/file error.png";
import PageContainer from "../../components/page-container/PageContainer";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { notifyMessage } from "src/utils/toastNotify";
import { IAddAwardees, ISelectAward, ISelectShooterName } from "src/types/Awardees";
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
// interface Film {
//   title: string;
//   year: number;
// }

// function sleep(duration: number): Promise<void> {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }

function AddAwardee() {
  // const [openShooter, setOpenShooter] = React.useState(false);
  // const [openAwards, setOpenAwards] = React.useState(false);
  const [shooters, setShooters] = React.useState<IAddAwardees>({
    shootername: "",
    award: "",
    certificate: "",
    description: "",
  });
  // const [Awards, setAwards] = React.useState<readonly Film[]>([]);
  const [base64Image, setBase64Image] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();
  // const loading = openShooter && shooters.length === 0;
  // const AwardsLoading = openShooter && Awards.length === 0;

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

  const checkError = (fieldName: keyof IAddAwardees) => {
    const newErrors: any = validateForm({ [fieldName]: shooters[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IAddAwardees) => ({
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
  const handleCancel = () => {
    navigate(`${APP_ROUTES.AWARDEES}`);
  };
  console.log(base64Image);

  const shootername: ISelectShooterName[] = [
    {
      value: "Pablo Escobar",
      label: "Pablo Escobar",
    },
    {
      value: "Don Hector",
      label: "Don Hector",
    },
    {
      value: "Ethan Hunt",
      label: "Ethan Hunt",
    },
    {
      value: "Tom Cruise",
      label: "Tom Cruise",
    },
  ];
  const award: ISelectAward[] = [
    {
      value: "Arjuna Award",
      label: "Arjuna Award",
    },
    {
      value: "Dronacharya Award",
      label: "Dronacharya Award",
    },
    {
      value: "National Award",
      label: "National Award",
    },
    {
      value: "International Award",
      label: "International Award",
    },
  ];

  return (
    <PageContainer>
      {/* <TableHead title='Edit User' /> */}
      <BackLink title="Back to the Awardees Page" route={APP_ROUTES.AWARDEES} />
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
              sx={{
                ml: 1,
              }}
              onClick={handleCancel}
            >
              cancel
            </Button>
          </>
        }
      >
        <>
          <Grid sx={{ marginTop: "-35px" }}>
            <TableHead title="ADD ARJUNA/INTERNATIONAL AWARDEES" />
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid>
                <CustomFormLabel htmlFor="lname-text">
                  Select Shooter
                  <RequiredStar />
                </CustomFormLabel>

                <Autocomplete
                  id="text-emailss"
                  options={shootername}
                  getOptionLabel={(option) => option.label || ""}
                  value={shootername.find((option) => option.value === shooters.shootername) || null}
                  // onChange={(event, newValue) => handleChange2({ target: { name: "shootername", value: newValue?.value || "" } })}
                  onChange={(event, newValue) => setShooters(newValue ? { ...shooters, shootername: newValue.value } : { ...shooters, shootername: "" })}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      name="shootername"
                      fullWidth
                      margin="normal"
                      sx={{ mt: 0 }}
                      error={!!error.shootername}
                      helperText={error.shootername}
                      {...createFieldHandlers("shootername")}
                    />
                  )}
                />
              </Grid>
              <Grid>
                <FormControl error={!!error.award} fullWidth>
                  <CustomFormLabel htmlFor="lname-text">
                    Select Award
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomSelect
                    id="standard-select-currency"
                    name="award"
                    className="custom-select"
                    value={shooters.award}
                    onChange={handleChange2}
                    fullWidth
                    variant="outlined"
                    {...createFieldHandlers("award")}
                  >
                    {award.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {error.award && <FormHelperText>Award Type field is required.</FormHelperText>}
                </FormControl>
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
                  buttonText="Close"
                  disabled={false}
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
                  Description
                  <RequiredStar />
                </CustomFormLabel>
                <TextField
                  id="outlined-multiline-static"
                  //   label="Multiline"
                  multiline
                  rows={4}
                  sx={{ width: 450 }}
                  name="description"
                  value={shooters.description}
                  onChange={handleChange2}
                  error={!!error.description}
                  helperText={error.description}
                  {...createFieldHandlers("description")}
                  variant="outlined"
                  margin="normal"
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
    </PageContainer>
  );
}

export default AddAwardee;
