import {
  Button,
  Typography,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Card,
  FormControl,
  FormHelperText,
  Select,
  Paper,
  RadioGroup,
} from "@mui/material";
import { IconUser, IconMail, IconPhone, IconBookDownload, IconCalendarEvent, IconBuildingSkyscraper } from "@tabler/icons";

import React, { useEffect, useState, useCallback } from "react";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomRadio from "src/utils/theme-elements/CustomRadio";
import { RequiredStar } from "src/components/required-star";
import { useSelector, useDispatch } from "react-redux";
import { setSlideOneFormData, setFiles } from "src/store/athlete-register-formdata/AthleteFormDataSlice";
import { AppDispatch, AppState } from "src/store/Store";
import FileUpload from "src/components/upload-file/UploadFile";
import { notifyMessage } from "src/utils/toastNotify";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { fetchAthleteData, setShooterId } from "src/store/athlete-register-formdata/AthleteViewAndEdit";
import { fetchStateUnits } from "src/store/athlete-register-formdata/common/ThunkSlideForms";
import { capitalizeFirstLetter } from "src/utils/basicFormaters";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";

interface FormSlideOneProps {
  data?: any;
}

const FormSlideOne = () => {
  const combinedSlideone: any = useSelector((state: AppState) => state.athleteRegister.slideOne);
  const { allStateUnits } = useSelector((state: AppState) => state.utilFormSlice);
  const { athleteResponse, athleteId, isLoading }: any = useSelector((state: AppState) => state.viewAthlete);

  const [tokenstate, setTokenstate] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const { stateUnit, first_name, last_name, main_event, playing_events, education, date_of_birth, place_of_birth, email, contact_number, alternate_contact_number, gender, profile_photo, birth_proof, action_photo } = athleteResponse;
  // console.log(profile_photo, athleteId, 'from api --');

  const formattedDateOfBirth = date_of_birth ? format(new Date(date_of_birth), 'yyyy-MM-dd') : '';
  // console.log(main_event, playing_events, 'from edit --');

  const initialFormData = {
    stateUnit: stateUnit,
    firstName: first_name,
    lastName: last_name,
    mainEvent: main_event,
    playingEvents: playing_events,
    education: education,
    dateOfBirth: formattedDateOfBirth,
    placeOfBirth: place_of_birth,
    email: email,
    contactNumber: contact_number,
    alternateContactNumber: alternate_contact_number,
    gender: gender,
    profilePhoto: profile_photo,
    actionPhoto: action_photo,
    birthProof: birth_proof,
  } || {
    stateUnit: "",
    firstName: "",
    lastName: "",
    mainEvent: "rifle",
    playingEvents: {
      rifle: false,
      pistol: false,
      shotgun: false,
      bigbore: false,
    },
    education: "",
    dateOfBirth: "",
    placeOfBirth: "",
    email: "",
    contactNumber: "",
    alternateContactNumber: "",
    gender: "male",
    profilePhoto: null,
    actionPhoto: null,
    birthProof: null,
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const updateFormData = useCallback(() => {
    dispatch(setSlideOneFormData(formData));
    console.log(formData, 'form one');
  }, [combinedSlideone]);

  useEffect(() => {
    updateFormData();
  }, [formData, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // console.log(token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      // console.log(decodedToken, 'decoded');

      if (decodedToken) {
        const { userId, state } = decodedToken;

        setTokenstate(state)
      }
    }
  }, [dispatch]);

  useEffect(() => { dispatch(fetchStateUnits(tokenstate)) }, [dispatch]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;

    setFormData((prevData: any) => {
      let newData;

      if (type === "checkbox") {
        newData = { ...prevData, [name]: { ...prevData[name], [value]: checked } };
      } else {
        newData = { ...prevData, [name]: value };
      }

      dispatch(setSlideOneFormData({ [name]: value }));

      return newData;
    });
  };

  const createFieldHandlers = (fieldName: string) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
  });

  const singleError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const finalError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  const handleSaveAndDraft = () => {
    finalError();
    const { firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, education, birthProof, profilePhoto, gender } = formData;
    const requiredFields = { firstName, lastName, email, dateOfBirth, placeOfBirth, contactNumber, education, profilePhoto, gender };

    const check = Object.values(requiredFields).every((mes: any) => mes !== "" && mes !== undefined && mes !== null);
    !check ? notifyMessage.error("Select all the required fields") : notifyMessage.success("Draft Saved");

  };

  const handleProfilePhotoUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideOne', fileType: 'profilePhoto', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        profilePhoto: uploadedFile,
      }));
    }
  };

  const handleUpdateProfilePhoto = (updatedFile: File) => {
    // Implement the logic to update the profile photo here
    console.log("Updating profile photo:", updatedFile);
    // Dispatch an action or call a function to update the profile photo
  };

  const handleBirthProofUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      // const fileURL = URL.createObjectURL(uploadedFile);

      dispatch(setFiles({ slideName: 'slideOne', fileType: 'birthProof', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        birthProof: uploadedFile,
      }));

    }
  };

  const handleActionPhotoUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideOne', fileType: 'actionPhoto', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        actionPhoto: uploadedFile,
      }));
    }
  };

  return (
    <>
      <Paper sx={{ padding: "20px" }}>
        <Grid container columnSpacing={3} marginTop={2}>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.stateUnit} fullWidth>
              <CustomFormLabel sx={{ mt: 0, color: "#ccc" }}  htmlFor="state-unit-text">
                State/Unit representation <RequiredStar />
              </CustomFormLabel>
              <Select
                id="stateUnit"
                name="stateUnit"
                value={formData.stateUnit}
                {...createFieldHandlers("stateUnit")}
                disabled
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
                {allStateUnits ? allStateUnits?.map((stateUnit: any) => (
                  <MenuItem key={stateUnit.id} value={stateUnit.name}>
                    {stateUnit.name}
                  </MenuItem>
                )) : (
                  <MenuItem>"NO STATE/UNITS FOUND"</MenuItem>
                )}
              </Select>
              {error.stateUnit && (
                <FormHelperText>
                  Select a State/Unit representation (this field is required).
                </FormHelperText>
              )}
            </FormControl>
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
              <Typography variant="subtitle2" marginBottom={0.8} sx={{}}> MAIN EVENT (TO BE REFLECTED IN ID CARD) <RequiredStar /></Typography>
              <RadioGroup row aria-label="position" name="mainEvent" value={formData.mainEvent} onChange={handleChange}>
                {['rifle', 'pistol', 'shotgun', 'bigbore'].map((event) => (
                  <FormControlLabel
                    key={event}
                    name="mainEvent"
                    value={event}
                    control={<CustomRadio color="primary" />}
                    label={capitalizeFirstLetter(event)}
                  />
                ))}
              </RadioGroup>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ marginTop: "25px", backgroundColor: (theme: any) => theme.palette.grey[100] }}>
              <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>PLAYING EVENTS <RequiredStar /></Typography>
              <div>
                {['rifle', 'pistol', 'shotgun', 'bigbore'].map((weapon) => (
                  <FormControlLabel
                    key={weapon}
                    control={<CustomCheckbox color="primary" name="playingEvents" value={weapon} checked={formData.playingEvents[weapon] === true} onChange={handleChange} />}
                    label={capitalizeFirstLetter(weapon)}
                  />
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-email" sx={{ color: "#ccc"}}>
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
              disabled
              {...createFieldHandlers("email")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="contactNumber" sx={{ color: "#ccc"}}>
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
              error={!!error.contactNumber}
              helperText={error.contactNumber}
              disabled
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
            <FileUpload
              title="Profile Photo"
              required={true}
              viewUploaded={profile_photo}
              onFileUpload={handleProfilePhotoUpload}
              updateImageFunction={handleUpdateProfilePhoto}
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload title="Birth Proof" viewUploaded={birth_proof} required={true} onFileUpload={handleBirthProofUpload} />
            {/* <FormHelperText>"BIrth proof is a required field"</FormHelperText> */}
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
            <CustomFormLabel htmlFor="bi-placebirth">
              Place Of Birth <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconBuildingSkyscraper size="20" />
                </InputAdornment>
              }
              id="bi-placebirth"
              placeholder="Your Birth Place"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              error={!!error.placeOfBirth}
              helperText={error.placeOfBirth}
              {...createFieldHandlers("placeOfBirth")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.gender} fullWidth>
              <CustomFormLabel htmlFor="country-text">
                Gender <RequiredStar />
              </CustomFormLabel>
              <Select id="gender" name="gender" value={formData.gender} {...createFieldHandlers("gender")}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
              {error.gender && <FormHelperText>Select a gender (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload 
              title="Action picture"
              required={false}
              viewUploaded={action_photo}
              onFileUpload={handleActionPhotoUpload} />
          </Grid>
          {/* <Grid item xs={12} lg={12} mt={1} textAlign='right'>
            <Grid item lg={12} textAlign='right'>
              <Button variant="contained" color="primary" onClick={handleSaveAndDraft}>
                Save & Draft
              </Button>
            </Grid>
          </Grid> */}
        </Grid>
      </Paper>
    </>
  );
};

export default FormSlideOne;
