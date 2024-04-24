import React, { useEffect, useState, useCallback } from "react";
import { Typography, FormControlLabel, Grid, InputAdornment, MenuItem, Card, FormControl, FormHelperText, Paper, Stack, Box, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IconUser, IconMail, IconPhone, IconBookDownload, IconCalendarEvent, IconBuildingSkyscraper } from "@tabler/icons";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomRadio from "src/utils/theme-elements/CustomRadio";
import { setLocalFormData } from "src/services/localStorage/localServices";
import { RequiredStar } from "src/components/required-star";
import { useSelector, useDispatch } from "react-redux";
import { setSlideOneFormData } from "src/store/clubRegister/AthleteFormDataSlice";
import { AppDispatch, AppState } from "src/store/Store";
import { notifyMessage } from "src/utils/toastNotify";
import { jwtDecode } from "jwt-decode";
import { checkEmailAdharStatus } from "../apiCall/clubregisterUtil";
import { fetchStateUnits } from "src/store/athlete-register-formdata/common/ThunkSlideForms";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { capitalizeFirstLetter, formatDate } from "src/utils/basicFormaters";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { useParams } from "react-router";
import axios from "axios";

const Slide1 = () => {
  const combinedSlideone: any = useSelector((state: AppState) => state.athleteFormData.slideOne);

  const { athleteId } = useParams();
  const { athleteResponse, isLoading } = useSelector((state: AppState) => state.viewClubAthlete);
  const { allStateUnits } = useSelector((state: AppState) => state.utilFormSlice);
  const [checked, setChecked] = useState(false);
  const [tokenstate, setTokenstate] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const initialFormData = {
    clubName: "club_arjuna",
    stateUnit: "MAHARASHTRA",
    firstName: "deep",
    lastName: "singh",
    playingEvents: {
      rifle: false,
      pistol: false,
      shotgun: false,
    },
    education: "BE",
    dateOfBirth: "",
    email: "check@gmail.com",
    contactNumber: "1234567890",
    alternateContactNumber: "9876543210",
    gender: "male",
    safetyCourse: false,
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  useEffect(() => {
    if (athleteId && athleteResponse) {
      const formattedDateOfBirth = formatDate(athleteResponse.dOB);
      const capitalizedState = athleteResponse.state_unit.toUpperCase();
      setFormData((prevData: any) => ({
        ...prevData,
        clubName: athleteResponse.club_name,
        stateUnit: capitalizedState,
        firstName: athleteResponse.first_name,
        lastName: athleteResponse.last_name,
        education: athleteResponse.education,
        dateOfBirth: formattedDateOfBirth,
        email: athleteResponse.email,
        contactNumber: athleteResponse.phone,
        alternateContactNumber: athleteResponse.alternate_no,
        safetyCourse: athleteResponse.safety_course,
        playingEvents: {
          rifle: athleteResponse.event.includes("Rifle"),
          pistol: athleteResponse.event.includes("Pistol"),
          shotgun: athleteResponse.event.includes("Shotgun"),
        },
      }));
    }
  }, [athleteId, athleteResponse]);

  console.log(formData, "form one");

  const updateFormData = useCallback(() => {
    dispatch(setSlideOneFormData(formData));
  }, [formData, dispatch]);

  useEffect(() => {
    setLocalFormData("slide1club", formData);
    updateFormData();
  }, [formData, updateFormData]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token, "in one -- tk");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken, "decoded");

      if (decodedToken) {
        const { athlete_id, state } = decodedToken;
        setTokenstate(state);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchStateUnits(tokenstate));
  }, [dispatch, tokenstate]);

  //to check the email status on backend side for the same email payment.

  // const singleError = (fieldName: any) => {
  //   const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
  //   setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  // };

  const singleError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
    console.log(newErrors, fieldName, "all erros");
  };

  const createFieldHandlers = (fieldName: string) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
    // onFocus: () => handleFocus(fieldName),
  });



  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
   

    if ((name === "contactNumber" || name === "alternateContactNumber") && type === "number" && value.length > 10) {
      return;
    }


    setFormData((prevData: any) => {
      let newData;

      if (type === "checkbox") {
        newData = {
          ...prevData,
          [name]: checked,
          playingEvents: {
            // Update playingEvents without overwriting its previous state
            ...prevData.playingEvents,
            [value]: checked,
          },
        };
      } else {
        newData = { ...prevData, [name]: value };
      }
      dispatch(setSlideOneFormData(newData));

      return newData;
    });
  };

  const finalError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  // const handleCheckValue: any = (e: any) => {
  //   const { name, checked } = e.target;
  //   setChecked(checked);
  // };

  return (
    <>
      <Paper sx={{ padding: "20px" }}>
        <Grid container columnSpacing={3} marginTop={2}>

           <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-clubName" sx={{ mt: 0 }} >
            Club Name <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconBookDownload size="20" />
              </InputAdornment>
            }
            id="bi-clubName"
            placeholder=""
            name="clubName"
            value={formData.clubName}
            error={!!error.clubName}
            helperText={error.clubName}
            {...createFieldHandlers("clubName")}
            fullWidth
            disabled
          />
        </Grid>
          <Grid item lg={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <CustomFormLabel htmlFor="bi-name" sx={{ mt: 0 }}>
                  First Name <RequiredStar />
                </CustomFormLabel>
                <CustomTextField
                  startadornment={
                    <InputAdornment position="start">
                      <IconUser size="20" />
                    </InputAdornment>
                  }
                  id="bi-name"
                  placeholder="John "
                  name="firstName"
                  value={formData.firstName}
                  error={!!error.firstName}
                  helperText={error.firstName}
                  {...createFieldHandlers("firstName")}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6} lg={6}>
                <CustomFormLabel htmlFor="bi-name" sx={{ mt: 0 }}>
                  Last Name <RequiredStar />
                </CustomFormLabel>
                <CustomTextField
                  startadornment={
                    <InputAdornment position="start">
                      <IconUser size="20" />
                    </InputAdornment>
                  }
                  id="bi-name"
                  placeholder="Doe"
                  name="lastName"
                  value={formData.lastName}
                  error={!!error.lastName}
                  helperText={error.lastName}
                  {...createFieldHandlers("lastName")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
            <Grid item xs={12} md={6}>
            <Card sx={{ marginTop: "25px", backgroundColor: (theme: any) => theme.palette.grey[100] }}>
              <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
                EVENTS <RequiredStar />
              </Typography>
              <div>
                {["rifle", "pistol", "shotgun"].map((weapon) => (
                  <FormControlLabel
                    key={weapon}
                    control={
                      <CustomCheckbox
                        color="primary"
                        name="playingEvents"
                        value={weapon}
                        checked={formData.playingEvents && formData.playingEvents[weapon] === true}
                        onChange={handleChange}
                      />
                    }
                    label={capitalizeFirstLetter(weapon)}
                  />
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.stateUnit} fullWidth disabled>
              <CustomFormLabel sx={{ mt: 3 }} htmlFor="state-unit-text">
                State/Unit representation <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="stateUnit"
                name="stateUnit"
                value={formData.stateUnit}
                fullWidth
                variant="outlined"
                {...createFieldHandlers("stateUnit")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allStateUnits ? (
                  allStateUnits?.map((stateUnit: any) => (
                    <MenuItem key={stateUnit.id} value={stateUnit.name}>
                      {stateUnit.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>"NO STATE/UNITS FOUND"</MenuItem>
                )}
              </CustomSelect>
              {error.stateUnit && <FormHelperText>Select a State/Unit representation (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>
       
      
           
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-email">
              Email ID <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconMail size="20" />
                </InputAdornment>
              }
              id="bi-email"
              placeholder="Your Email.."
              name="email"
              value={formData.email}
              error={!!error.email}
              helperText={error.email}
              {...createFieldHandlers("email")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="contactNumber">
              Mobile Number <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="contactNumber"
              startadornment={
                <InputAdornment position="start">
                  <IconPhone size="20" />
                </InputAdornment>
              }
              placeholder="Your contact.. "
              name="contactNumber"
              value={formData.contactNumber}
              type="number"
              error={!!error.contactNumber}
              helperText={error.contactNumber}
              {...createFieldHandlers("contactNumber")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-phone">ALT.Contact No</CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconPhone size="20" />
                </InputAdornment>
              }
              id="bi-phone"
              name="alternateContactNumber"
              value={formData.alternateContactNumber}
              type="number"
              error={!!error.alternateContactNumber}
              helperText={error.alternateContactNumber && "Please enter exactly 10 digits"}
              {...createFieldHandlers("alternateContactNumber")}
              onChange={handleChange}
              placeholder="412 2150 451"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-education">
              Education <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconBookDownload size="20" />
                </InputAdornment>
              }
              id="bi-education"
              placeholder="Your Education"
              name="education"
              value={formData.education}
              error={!!error.education}
              helperText={error.education}
              {...createFieldHandlers("education")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-dob">
              Date Of Birth <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-dob"
              type="Date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              error={!!error.dateOfBirth}
              helperText={error.dateOfBirth}
              {...createFieldHandlers("dateOfBirth")}
              placeholder="Enter Birth Date.."
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.gender} fullWidth>
              <CustomFormLabel htmlFor="country-text">
                Gender <RequiredStar />
              </CustomFormLabel>
              <CustomSelect id="gender" name="gender" value={formData.gender} fullWidth variant="outlined" {...createFieldHandlers("gender")}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </CustomSelect>
              {error.gender && <FormHelperText>Select a gender (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item alignSelf="end" xs={6}>
            <Stack direction="row" spacing={6} alignItems="center">
              <Box sx={{ display: "flex", alignItems: "center"  }}>
                <CustomFormLabel sx={{ marginTop: 2 }} htmlFor="fname-text">
                  If shooter has completed any safety certifications or courses?
                </CustomFormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      name="safetyCourse"
                      value={checked}
                      checked={formData.safetyCourse}
                      onChange={handleChange}
                      sx={{ marginLeft: "5px", marginTop: 2  }}
                    />
                  }
                  label=""
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Slide1;
