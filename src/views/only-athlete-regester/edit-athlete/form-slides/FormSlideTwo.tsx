import React, { useState, useCallback, useEffect } from "react";
import { Button, Grid, InputAdornment, MenuItem, Paper, FormControl, FormHelperText, Select } from "@mui/material";

import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { IconUser, IconAddressBook, IconPin, IconStretching } from "@tabler/icons";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import { setFiles, setSlideTwoFormData } from "src/store/athlete-register-formdata/AthleteFormDataSlice";
import { notifyMessage } from "src/utils/toastNotify";
import FileUpload from "src/components/upload-file/UploadFile";
import { fetchStateCitiesById, fetchStatesAndCities } from "src/store/athlete-register-formdata/common/ThunkSlideForms";

const FormSlideTwo = () => {
  const combinedSlideTwo: any = useSelector((state: AppState) => state.athleteRegister.slideTwo);
  const { allStates, allCities, stateCities } = useSelector((state: AppState) => state.utilFormSlice);
  const { athleteResponse, isLoading }: any = useSelector((state: AppState) => state.viewAthlete);
  const dispatch: AppDispatch = useDispatch();

  const { mother_name, father_name, spause_name, tshirt_size, shoes_size, cityName, stateName, address_proof, track_suit, marital_status, state_id } = athleteResponse

  const initialFormData = {
    maritalStatus: marital_status,
    motherName: mother_name,
    fatherName: father_name,
    spauseName: spause_name,
    address: athleteResponse?.address,
    pincode: athleteResponse?.pincode,
    weight: athleteResponse?.weight,
    height: athleteResponse?.height,
    tshirtSize: tshirt_size,
    trackSuit: track_suit,
    shoesSize: shoes_size,
    cityName: cityName,
    stateName: state_id,
    addressProof: address_proof,
  } || {
    maritalStatus: "single",
    motherName: "",
    fatherName: "",
    spauseName: "",
    address: "",
    pincode: "",
    weight: "",
    height: "",
    tshirtSize: "",
    trackSuit: "",
    shoesSize: "",
    cityName: "",
    stateName: "",
    addressProof: "",
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const { motherName, fatherName, pincode, address } = formData;
  const selectedFields = { motherName, fatherName, address, pincode };

  const updateFormData = useCallback(() => { dispatch(setSlideTwoFormData(formData)) }, [combinedSlideTwo]);

  useEffect(() => { updateFormData() }, [formData]);
  useEffect(() => { dispatch(fetchStatesAndCities()) }, [dispatch]);

  const singleError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: string) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
  });

  const finalError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  const handleSaveAndDraft = () => {
    finalError();

    const check = Object.values(selectedFields).every((mes: any) => mes !== "");
    !check ? notifyMessage.error("Select all the required fields") : notifyMessage.success("Draft Saved");
    !check ? console.log("error") : console.log("no error");
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
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
    console.log(combinedSlideTwo, "combined 2 data");
  }, [formData, dispatch]);


  const handleAddressProofUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideTwo', fileType: 'addressProof', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        addressProof: uploadedFile,
      }));
    }
  };


  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container columnSpacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="bi-motherName">
            Mother Name
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            name="motherName"
            value={formData.motherName}
            error={!!error.motherName}
            helperText={error.motherName}
            {...createFieldHandlers("motherName")}
            placeholder="Mother Name.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="bi-fatherName">
            Father Name
            <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            name="fatherName"
            value={formData.fatherName}
            error={!!error.fatherName}
            helperText={error.fatherName}
            {...createFieldHandlers("fatherName")}
            placeholder="Father's Name.."
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={!!error.maritalStatus} fullWidth>
            <CustomFormLabel htmlFor="marital-status"> Marital Status </CustomFormLabel>
            <CustomSelect
              id="marital-status"
              name="maritalStatus"
              defaultValue={formData.maritalStatus}
              value={formData.maritalStatus}
              {...createFieldHandlers("maritalStatus")}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="single"> Single </MenuItem>
              <MenuItem value="unmarried"> Unmarried </MenuItem>
              <MenuItem value="married"> Married </MenuItem>
            </CustomSelect>
            {error.maritalStatus && <FormHelperText>Select Your Marital Status (this field is required).</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-spause" style={{ color: formData.maritalStatus === "unmarried" || formData.maritalStatus === "single" ? "#ccc" : "#000" }}>
            Spause Name
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-spause"
            placeholder="Spause Name.."
            name="spauseName"
            value={formData.spauseName}
            // error={!!error.spauseName}
            // helperText={error.spauseName}
            {...createFieldHandlers("spauseName")}
            disabled={formData.maritalStatus === "unmarried" || formData.maritalStatus === "single"}
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
          <FormControl error={!!error.stateName} fullWidth>
            <CustomFormLabel htmlFor="state-text">
              State Name <RequiredStar />
            </CustomFormLabel>
            <Select
              id="stateName"
              name="stateName"
              value={formData.stateName}
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
            </Select>

            {error.stateName && (
              <FormHelperText>
                Select a State (this field is required).
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={!!error.cityName} fullWidth>
            <CustomFormLabel htmlFor="state-text">
              City Name<RequiredStar />
            </CustomFormLabel>
            <Select
              id="cityName"
              name="cityName"
              value={formData.cityName}
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
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
            </Select>

            {error.cityName && (
              <FormHelperText>
                Select a City (this field is required).
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload title="Address Proof" required={true} onFileUpload={handleAddressProofUpload} viewUploaded={address_proof} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-height">Height</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-height"
            placeholder="heigth size.."
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-tracksuit">Track Suit Size</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-tracksuit"
            placeholder="Track Suit Size.."
            name="trackSuit"
            value={formData.trackSuit}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-shoes">Shoes Size</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            id="bi-shoes"
            placeholder="Shoes Size.."
            name="shoesSize"
            value={formData.shoesSize}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-weight">Weight </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconStretching size="20" />
              </InputAdornment>
            }
            id="bi-weight"
            placeholder="Your Weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormLabel htmlFor="bi-tshirt">T-shirt Size</CustomFormLabel>
          <CustomTextField
            id="bi-tshirt"
            startadornment={
              <InputAdornment position="start">
                <IconUser size="20" />
              </InputAdornment>
            }
            placeholder="Your T-shirt Size.. "
            name="tshirtSize"
            value={formData.tshirtSize}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSlideTwo;
