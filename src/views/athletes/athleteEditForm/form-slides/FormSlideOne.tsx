import { Button, Typography, FormControlLabel, Grid, InputAdornment, MenuItem, Card, FormControl, FormHelperText, Paper, RadioGroup } from "@mui/material";
import { IconUser, IconMail, IconPhone, IconBookDownload, IconCalendarEvent, IconBuildingSkyscraper } from "@tabler/icons";

import React, { useState } from "react";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomRadio from "src/utils/theme-elements/CustomRadio";
import { RequiredStar } from "src/components/required-star";
import FileUpload from "src/components/upload-file/UploadFile";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { notifyMessage } from "src/utils/toastNotify";

interface FormSlideOneProps {
  submitForm?(data: any): void;
}

interface FormData {
  gender: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  birthPlace: string;
  altContact: string;
  contactNo: string;
  education: string;
  mainEvent: string;
  uploadedFiles: {
    birthProof: string | null;
    actionProof: string | null;
    actionPicture: string | null;
  };
}

const FormSlideOne: React.FC<FormSlideOneProps> = ({ submitForm }) => {
  const [formData, setFormData] = useState<FormData>({
    gender: "male",
    country: "india",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    birthPlace: "",
    altContact: "",
    contactNo: "",
    education: "",
    mainEvent: "rifle",
    uploadedFiles: {
      birthProof: null,
      actionProof: null,
      actionPicture: null,
    },
  });

  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const singleError = (fieldName: keyof FormData) => {
    const newErrors: { [key in keyof FormData]?: string } = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: { [key in keyof FormData]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof FormData) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name as string]: value };
      if (submitForm) {
        submitForm(newData);
      }

      return newData;
    });
  };

  const finalError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  const handleSaveAndDraft = () => {
    finalError();
    const { firstName, lastName, email, dob, birthPlace, contactNo, education } = formData;
    const requiredFields = { firstName, lastName, email, dob, birthPlace, contactNo, education };

    const check = Object.values(requiredFields).every((mes: any) => mes !== "" && mes !== undefined && mes !== null);
    !check ? notifyMessage.error("Select all the required fields") : notifyMessage.success("Draft Saved");
  };

  const handleFileUpload1 = (files: File[] | null) => {
    if (files) {
      console.log("Group 3 Files:", files);
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: {
          ...prev.uploadedFiles,
          actionPicture: files[0]?.name || null,
        },
      }));
    } else {
      // Handle null case if needed
    }
  };
  const handleFileUpload2 = (files: File[] | null) => {
    if (files) {
      console.log("Group 3 Files:", files);
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: {
          ...prev.uploadedFiles,
          actionPicture: files[0]?.name || null,
        },
      }));
    } else {
      // Handle null case if needed
    }
  };
  const handleFileUpload3 = (files: File[] | null) => {
    if (files) {
      console.log("Group 3 Files:", files);
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: {
          ...prev.uploadedFiles,
          actionPicture: files[0]?.name || null,
        },
      }));
    } else {
      // Handle null case if needed
    }
  };

  return (
    <>
      <Paper sx={{ padding: "20px" }}>
        <Grid container columnSpacing={3} marginTop={2}>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.country} fullWidth>
              <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                Country <RequiredStar />
              </CustomFormLabel>
              <CustomSelect id="country" name="country" value={formData.country} {...createFieldHandlers("country")}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="india">India</MenuItem>
                <MenuItem value="usa">USA</MenuItem>
              </CustomSelect>
              {error.country && <FormHelperText>Select a state (this field is required).</FormHelperText>}
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
            <Card sx={{ marginTop: "25px" }}>
              <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
                MAIN EVENT (TO BE REFLECTED IN ID CARD)
                <RequiredStar />
              </Typography>
              <RadioGroup row aria-label="position" name="mainEvent" value={formData.mainEvent} onChange={handleChange}>
                <FormControlLabel value="rifle" control={<CustomRadio />} label="Rifle" />
                <FormControlLabel value="pistol" control={<CustomRadio />} label="Pistol" />
                <FormControlLabel value="shotgun" control={<CustomRadio />} label="Shotgun" />
                <FormControlLabel value="bigbore" control={<CustomRadio />} label="Bigbore" />
              </RadioGroup>
            </Card>
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
            <CustomFormLabel htmlFor="bi-mobile">
              Mobile Number <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="bi-mobile"
              startadornment={
                <InputAdornment position="start">
                  <IconPhone size="20" />
                </InputAdornment>
              }
              placeholder="Your contact.. "
              name="contactNo"
              value={formData.contactNo}
              error={!!error.contactNo}
              helperText={error.contactNo}
              {...createFieldHandlers("contactNo")}
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
              name="altContact"
              value={formData.altContact}
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
            <FileUpload title="Profile picture" required={true} onFileUpload={handleFileUpload1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="bi-dob">
              DOB <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-dob"
              type="Date"
              name="dob"
              value={formData.dob}
              error={!!error.dob}
              helperText={error.dob}
              {...createFieldHandlers("dob")}
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
              name="birthPlace"
              value={formData.birthPlace}
              error={!!error.birthPlace}
              helperText={error.birthPlace}
              {...createFieldHandlers("birthPlace")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload title="Birth Proof" required={true} onFileUpload={handleFileUpload2} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl error={!!error.gender} fullWidth>
              <CustomFormLabel htmlFor="country-text">
                Gender <RequiredStar />
              </CustomFormLabel>
              <CustomSelect id="gender" name="gender" value={formData.gender} {...createFieldHandlers("gender")}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </CustomSelect>
              {error.gender && <FormHelperText>Select a gender (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload title="Action picture" required={false} onFileUpload={handleFileUpload3} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid lg={12} sx={{ margin: "20% 0 0 70%" }}>
              <Button variant="contained" color="primary" onClick={handleSaveAndDraft}>
                Save & Draft
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FormSlideOne;
