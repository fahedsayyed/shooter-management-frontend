import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Grid, FormControl, FormHelperText, MenuItem, Select, InputAdornment, Button, Stack, Box, FormControlLabel, Checkbox } from "@mui/material";
import { IconUser, IconAddressBook, IconPin, IconStretching, IconBookDownload, IconPhone } from "@tabler/icons";
import { RequiredStar } from "src/components/required-star";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { setFiles } from "src/store/athlete-register-formdata/AthleteFormDataSlice";
import { setSlideTwoFormData } from "src/store/clubRegister/AthleteFormDataSlice";
import { fetchStateCitiesById, fetchStatesAndCities } from "src/store/athlete-register-formdata/common/ThunkSlideForms";
import { notifyMessage } from "src/utils/toastNotify";
import FileUpload from "src/components/upload-file/UploadFile";
import { AppDispatch, AppState } from "src/store/Store";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { useParams } from "react-router";

const Slide2 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { allStates, allCities, stateCities } = useSelector((state: AppState) => state.utilFormSlice);

  const { athleteId } = useParams();
  const { athleteResponse, isLoading } = useSelector((state: AppState) => state.viewClubAthlete);
  console.log(athleteResponse, "for file");
  console.log(allStates, "statesss");

  const initialFormData = {
    //clubName: "club_arjuna",
    aadhar: "123456789098",
    membership: "Annual",
    address: "Mumbai",
    pincode: "400057",
    cityName: "",
    stateName: "",
    profilePhoto: null,
    addressProof: null,
    agreement: false,
    conscent: false,
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  useEffect(() => {
    if (athleteId && athleteResponse) {
      setFormData((prevData: any) => ({
        ...prevData,
        //clubName: athleteResponse.club_name,
        membership: athleteResponse.membership_type,
        address: athleteResponse.address,
        pincode: athleteResponse.pincode,
        cityName: athleteResponse.city,
        stateName: athleteResponse.state_id,
        aadhar: athleteResponse.aadhar_card,
        profilePhoto: athleteResponse.profile_photo,
        addressProof: athleteResponse.address_proof,
        agreement: true,
        conscent: true,
      }));
    }
  }, [athleteId, athleteResponse]);

  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    dispatch(fetchStatesAndCities());
  }, [dispatch]);


  console.log(formData.profilePhoto, formData.addressProof, "file at update");

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;

    if (name === "aadhar" && type === "number" && value.length > 12) {
      return;
    }


    setFormData((prevData: any) => ({ ...prevData, [name]: type === "checkbox" ? { ...prevData[name], [value]: checked } : value }));

    if (name === "stateName") {
      setFormData((prevData: any) => ({ ...prevData, cityName: "" }));
    }
  };

  useEffect(() => {
    if (formData.stateName) {
      dispatch(fetchStateCitiesById(formData.stateName));
    }
  }, [formData.stateName, dispatch]);

  useEffect(() => {
    dispatch(setSlideTwoFormData(formData));
  }, [formData, dispatch]);

  console.log(formData, "slide2");

  const singleError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };
  const createFieldHandlers = (fieldName: string) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
    // onFocus: () => handleFocus(fieldName),
  });
  const handleProfilePhotoUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: "slideTwo", fileType: "profilePhoto", fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        profilePhoto: uploadedFile,
      }));
    }
  };

  const handleAddressProofUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      dispatch(setFiles({ slideName: "slideTwo", fileType: "addressProof", fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        addressProof: uploadedFile,
      }));
    }
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container columnSpacing={3} marginTop={2}>
        {/* Include fields from Slide3 */}
        {/* <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-clubName">
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
        </Grid> */}

        <Grid item xs={12} md={6}>
          <FormControl error={!!error.membership} fullWidth>
            <CustomFormLabel htmlFor="country-text">
              MembershipType <RequiredStar />
            </CustomFormLabel>
            <CustomSelect id="membership" name="membership" value={formData.membership} fullWidth variant="outlined" {...createFieldHandlers("membership")}>
              <MenuItem value="Annual">Annual</MenuItem>
              <MenuItem value="Life">Life</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </CustomSelect>
            {error.membership && <FormHelperText>Select a membership (this field is required).</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="aadhar">
            Aadhar Number <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            id="aadhar"
            startadornment={
              <InputAdornment position="start">
                <IconPhone size="20" />
              </InputAdornment>
            }
            placeholder="Your aadhar.. "
            name="aadhar"
            value={formData.aadhar}
            type="number"
            error={!!error.aadhar}
            helperText={error.aadhar && "Please enter exactly 12 digits"}
            {...createFieldHandlers("aadhar")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-address">
            Address
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconAddressBook size="20" />
              </InputAdornment>
            }
            name="address"
            value={formData.address}
            error={!!error.address}
            helperText={error.address}
            {...createFieldHandlers("address")}
            placeholder="Your Address.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={!!error.stateName} fullWidth>
            <CustomFormLabel htmlFor="state-text">
              State Name <RequiredStar />
            </CustomFormLabel>
            <CustomSelect
              id="stateName"
              name="stateName"
              value={formData.stateName}
              fullWidth
              variant="outlined"
              {...createFieldHandlers("stateName")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select State</em>
              </MenuItem>
              {allStates &&
                allStates.map((states: any) => (
                  <MenuItem key={states.id} value={states.id}>
                    {states.name}
                  </MenuItem>
                ))}
            </CustomSelect>

            {error.stateName && <FormHelperText>Select a State (this field is required).</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl error={!!error.cityName} fullWidth>
            <CustomFormLabel htmlFor="state-text">
              City Name
              <RequiredStar />
            </CustomFormLabel>
            <CustomSelect
              id="cityName"
              name="cityName"
              value={formData.cityName}
              fullWidth
              variant="outlined"
              {...createFieldHandlers("cityName")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select City</em>
              </MenuItem>
              {stateCities &&
                stateCities.map((city: any) => (
                  <MenuItem key={city.id} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
            </CustomSelect>

            {error.cityName && <FormHelperText>Select a City (this field is required).</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-pincode">
            PinCode
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconPin size="20" />
              </InputAdornment>
            }
            name="pincode"
            value={formData.pincode}
            error={!!error.pincode}
            helperText={error.pincode}
            {...createFieldHandlers("pincode")}
            placeholder="Enter Pincode.."
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {athleteId
            ? <FileUpload title="Profile Photo" viewUploaded={formData.profilePhoto} required={true} onFileUpload={handleProfilePhotoUpload} />
            : <FileUpload title="Profile Photo" required={true} onFileUpload={handleProfilePhotoUpload} />
          }
        </Grid>

        <Grid item xs={12} md={6}>
          {athleteId
            ? <FileUpload title="Address Proof" viewUploaded={formData.profilePhoto} required={true} onFileUpload={handleAddressProofUpload} />
            : <FileUpload title="Address Proof" required={true} onFileUpload={handleAddressProofUpload} />
          }
        </Grid>

        <Grid item xs={12} lg={12} mt={4} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
              I agree the terms & Conditions
            </CustomFormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="agreement"
                  //value={checked}
                  checked={formData.agreement}
                  onClick={handleChange}
                  sx={{ marginLeft: "5px" }}
                />
              }
              label=""
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12} mt={2} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
              I confirm that the information provided is accurate
            </CustomFormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="conscent"
                  //value={checked}
                  checked={formData.conscent}
                  onClick={handleChange}
                  sx={{ marginLeft: "5px" }}
                />
              }
              label=""
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Slide2;
