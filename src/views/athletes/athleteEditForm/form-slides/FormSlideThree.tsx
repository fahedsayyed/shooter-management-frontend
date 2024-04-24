import React, { useState } from "react";
import {
  Button,
  Typography,
  FormControlLabel,
  Stack,
  Grid,
  InputAdornment,
  MenuItem,
  RadioGroup,
  FormGroup,
  Card,
  Paper,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { IconUser, IconFileDescription, IconCalendar, IconBuildingSkyscraper } from "@tabler/icons";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomRadio from "src/utils/theme-elements/CustomRadio";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState, /* generativeFieldErrorCheck, */ generativeFieldErrorCheckForManyTypes } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import FileUpload from "src/components/upload-file/UploadFile";

const FormSlideThree = () => {
  const initialFormData = {
    passportNumber: "",
    passportDateIssue: "",
    passportDateAuthority: "",
    membertype: "mramember",
    membershipType: "student",
    rifleClubDistrict: "rifleClub",
    nameOfRifleClubDistrict: "rajaShivajiVidyalay",
    selectLifeOthers: "life",
    membershipNumber: "",
    nraiShooterId: "",
    passportDateExpiry: "",
    passportPlaceIssue: "",
    passportValidity: "",
    arjunaAwardee: "",
    internationalAwardee: "",
    fireArms: [{ gunType: "", make: "", model: "", caliber: "", serialNo: "", stickerNo: "" }],
    coachDetails: [{ coachName: "", coachFromDate: "", coachToDate: "" }],
    bondSubmissionDate: "",
    paymentRemark: "",
    gender: "male",
    city: "India",
    state: "Maharashtra",
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState: any = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const handleAddFields = (type: string) => {
    if (type === "fireArms") {
      setFormData((prev: any) => ({
        ...prev,
        fireArms: [...prev.fireArms, { gunType: "", make: "", model: "", caliber: "", serialNo: "", stickerNo: "" }],
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        coachDetails: [...prev.coachDetails, { coachName: "", coachFromDate: "", coachToDate: "" }],
      }));
    }
  };

  const handleRemoveFields = (type: string) => {
    if (type === "string") {
      if (formData.fireArms.length > 1) {
        setFormData((prev: any) => {
          const updatedFireArms = [...prev.fireArms];
          updatedFireArms.pop();
         
          return {
            ...prev,
            fireArms: updatedFireArms,
          };
        });
      }
    } else {
      if (formData.coachDetails.length > 1) {
        setFormData((prev: any) => {
          const updatedCoachDetails = [...prev.coachDetails];
          updatedCoachDetails.pop();
         
          return {
            ...prev,
            coachDetails: updatedCoachDetails,
          };
        });
      }
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };
     
      return newData;
    });
  };

  const checkError = (fieldName: any) => {
    setError((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: validateForm({ [fieldName]: formData[fieldName] })[fieldName],
    }));
  };

  //TODO: Check All the input fields errors at once --
  const wholeError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  //TODO: Get the errors based on Id and fields
  const checkGenerativeFieldsErrors = (fieldName: any, value: any, index: number, fieldType: string) => {
    setError((prevErrors: any) => generativeFieldErrorCheckForManyTypes(prevErrors, fieldName, value, index, fieldType));
  };

  //TODO: All in one for fields ---
  const createFieldHandlers = (i: number, fieldType: string) => ({
    onBlur: (e: any) => {
      const fieldName = e.target.name;
      checkGenerativeFieldsErrors(fieldName, formData[fieldType][i][fieldName], i, fieldType);
    },
    onChange: (e: any) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [fieldType]: prev[fieldType].map((item: any, index: number) => (index === i ? { ...item, [name]: value } : item)),
      }));

      // dispatch(setSlideThreeFormData(selectedField));
      //! Show error messages based on Id and fieldType
      checkGenerativeFieldsErrors(name, value, i, fieldType);
    },
  });

  //TODO: Submit the form ---
  const handleSubmit = (e: any) => {
    e.preventDefault();
    wholeError();

    if (error) {
      notifyMessage.error("Please fill all the fields");
    } else {
      notifyMessage.success("Success");
    }
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="bi-passport">
            Passport Number <RequiredStar />
          </CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconFileDescription size="20" />
              </InputAdornment>
            }
            id="bi-passport"
            placeholder="Passport Number.."
            name="passportNumber"
            value={formData.passportNumber}
            error={!!error.passportNumber}
            helperText={error.passportNumber}
            onBlur={() => checkError("passportNumber")}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FileUpload title="passport" required={true} onFileUpload={() => {}} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="passport-Expiry"> Passport Date of Expiry</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconCalendar size="20" />
              </InputAdornment>
            }
            id="bi-passport"
            type="Date"
            placeholder="Passport Expiry Date .."
            name="passportDateExpiry"
            error={!!error.passportDateExpiry}
            helperText={error.passportDateExpiry}
            value={formData.passportDateExpiry}
            onChange={handleChange}
            onBlur={() => checkError("passportDateExpiry")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="passport-issue"> Passport Date of issue</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconCalendar size="20" />
              </InputAdornment>
            }
            id="bi-passport"
            type="Date"
            placeholder="Passport Issue Date .."
            name="passportDateIssue"
            error={!!error.passportDateIssue}
            helperText={error.passportDateIssue}
            value={formData.passportDateIssue}
            onChange={handleChange}
            onBlur={() => checkError("passportDateIssue")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="passport-place"> Place Of Issue</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconBuildingSkyscraper size="20" />
              </InputAdornment>
            }
            id="passport-place"
            placeholder="Place Of Issue.."
            name="passportPlaceIssue"
            error={!!error.passportPlaceIssue}
            helperText={error.passportPlaceIssue}
            value={formData.passportPlaceIssue}
            onChange={handleChange}
            onBlur={() => checkError("passportPlaceIssue")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="Passport-authority"> Passport Issuing Authority</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconFileDescription size="20" />
              </InputAdornment>
            }
            id="bi-passport"
            placeholder="Passport Issuing Authority .."
            name="passportDateAuthority"
            error={!!error.passportDateAuthority}
            helperText={error.passportDateAuthority}
            value={formData.passportDateAuthority}
            onChange={handleChange}
            onBlur={() => checkError("passportDateAuthority")}
            type="Date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="Passport-authority"> Types Of Member</CustomFormLabel>
            <CustomSelect
              id="Passport-authority"
              name="membertype"
              defaultValue={formData.membertype}
              value={formData.membertype}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="mramember"> MRA Member</MenuItem>
              <MenuItem value="mraaffilates"> MRA Affilates </MenuItem>
            </CustomSelect>
            <FormHelperText></FormHelperText>
          </FormControl>
        </Grid>
        {formData.membertype === "mramember" ? (
          <>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-membershipType">
                Select Type of Memberships <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-membershipType"
                name="membershipType"
                defaultValue={formData.membershipType}
                value={formData.membershipType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Others">Others</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="Elite"> Elite </MenuItem>
                <MenuItem value="ias">IAS</MenuItem>
              </CustomSelect>
            </Grid>
            {/*  */}
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="membership-number">
                Membership No <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconUser size="20" />
                  </InputAdornment>
                }
                id="bi-membershipNumber"
                name="membershipNumber"
                error={!!error.membershipNumber}
                helperText={error.membershipNumber}
                value={formData.membershipNumber}
                onChange={handleChange}
                onBlur={() => checkError("membershipNumber")}
                placeholder="membership Number .."
                fullWidth
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="nrai-shooter">
                NRAI Shooter ID <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconUser size="20" />
                  </InputAdornment>
                }
                id="bi-nrai-shooter"
                placeholder="NRAI Shooter id .."
                name="nraiShooterId"
                error={!!error.nraiShooterId}
                helperText={error.nraiShooterId}
                value={formData.nraiShooterId}
                onChange={handleChange}
                onBlur={() => checkError("nraiShooterId")}
                fullWidth
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-rifleClubDistrict">
                Select Rifle Club District <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-rifleClubDistrict"
                name="rifleClubDistrict"
                defaultValue={formData.rifleClubDistrict}
                value={formData.rifleClubDistrict}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="rifleClub">Rifle Club</MenuItem>
                <MenuItem value="districtRifleAssociation">District Rifle Association</MenuItem>
                <MenuItem value="registerUnit"> Registered Units </MenuItem>
                <MenuItem value="mraiMember">NRAI Member</MenuItem>
              </CustomSelect>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-nameOfRifleClubDistrict">
                Name Of Rifle Club/District/Registered Units <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-nameOfRifleClubDistrict"
                name="nameOfRifleClubDistrict"
                defaultValue={formData.nameOfRifleClubDistrict}
                value={formData.nameOfRifleClubDistrict}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="rajaShivajiVidyalay">Raja Shivaji Vidyalay</MenuItem>
                <MenuItem value="rajaShivajiVidyalay">Raja Shivaji Vidyalay</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-selectLifeOthers">
                Select Life/Others <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-selectLifeOthers"
                name="selectLifeOthers"
                defaultValue={formData.selectLifeOthers}
                value={formData.selectLifeOthers}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="life">Life</MenuItem>
                <MenuItem value="others">Others (1yr, 2yr, etc)</MenuItem>
              </CustomSelect>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="nrai-shooter">
                NRAI Shooter ID <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconUser size="20" />
                  </InputAdornment>
                }
                id="bi-nrai-shooter"
                name="nraiShooterId"
                error={!!error.nraiShooterId}
                helperText={error.nraiShooterId}
                value={formData.nraiShooterId}
                onChange={handleChange}
                onBlur={() => checkError("nraiShooterId")}
                placeholder="NRAI Shooter id .."
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Card sx={{ padding: 0, paddingTop: "5px", boxShadow: "none" }}>
            <Typography mt={2} variant="subtitle2" fontSize={12} color="red">
              NOTE: Membership Association Certificate should be of affiliated MRA/DRA/RC/Registered Unit (RU)
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FileUpload title="Membership association certificate" required={true} onFileUpload={() => {}} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="passport-place"> Valid Up To</CustomFormLabel>
          <CustomTextField
            startadornment={
              <InputAdornment position="start">
                <IconCalendar size="20" />
              </InputAdornment>
            }
            id="passport-place"
            placeholder="Valid Date.."
            type="Date"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ my: 2 /* backgroundColor: (theme) => theme.palette.grey[50] */ }}>
            <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
              Are You Arjuna Awardee
            </Typography>
            <RadioGroup row aria-label="position" name="areYouArjunaAwardee" defaultValue="top">
              <FormControlLabel value="yes" control={<CustomRadio />} label="Yes" />
              <FormControlLabel value="no" control={<CustomRadio />} label="No" />
            </RadioGroup>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ my: 2 /* backgroundColor: (theme) => theme.palette.grey[50] */ }}>
            <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
              Are You International Awardee
            </Typography>
            <RadioGroup row aria-label="position" name="areYouinternationalAwardee" defaultValue="top">
              <FormControlLabel value="yes" control={<CustomRadio />} label="Yes" />
              <FormControlLabel value="no" control={<CustomRadio />} label="No" />
            </RadioGroup>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12} my={2}>
          <Card sx={{ boxShadow: 2 }}>
            <Typography variant="subtitle1" marginBottom={0.8}>
              Weapon Details
            </Typography>
            <FormGroup sx={{ position: "relative" }}>
              <Paper sx={{ background: "none", boxShadow: "none" }}>
                <div style={{ display: "flex", width: "150px", alignItems: "center", position: "absolute", top: "-35px", right: "0px" }}>
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center" }} onClick={() => handleAddFields("fireArms")}>
                    <AddIcon />
                  </Button>
                  {formData.fireArms.length > 1 && (
                    <Button variant="outlined" sx={{ width: "20px", textAlign: "center", ml: 0.5 }} onClick={() => handleRemoveFields("fireArms")}>
                      <RemoveIcon />
                    </Button>
                  )}
                </div>
                {formData?.fireArms?.map((arms: any, i: any) => {
                  return (
                    <Grid container spacing={2} mt={0.3} key={i}>
                      <Grid item xs={12} lg={2}>
                        <FormControl fullWidth error={!!error.fireArms?.[i]?.gunType}>
                          <InputLabel id="demo-multiple-name-label">Type</InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name="gunType"
                            value={arms.gunType}
                            // {...createFieldHandlers(i)}
                            {...createFieldHandlers(i, "fireArms")}
                            input={<OutlinedInput label="Type" />}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                  width: 250,
                                },
                              },
                            }}
                          >
                            <MenuItem value="10meter"> 10 Meter Rifle </MenuItem>
                            <MenuItem value="20meter"> 20 Meter Rifle </MenuItem>
                            <MenuItem value="30meter"> 30 Meter Rifle </MenuItem>
                          </Select>
                          {error.fireArms?.[i]?.gunType && <FormHelperText>Select a gunType field.</FormHelperText>}
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id={`make-${i}`}
                            label="Make"
                            name={`make`}
                            value={arms.make}
                            error={!!error.fireArms?.[i]?.make}
                            helperText={error.fireArms?.[i]?.make}
                            // {...createFieldHandlers(i)}
                            {...createFieldHandlers(i, "fireArms")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="Model"
                            name="model"
                            value={arms.model}
                            error={!!error.fireArms?.[i]?.model}
                            helperText={error.fireArms?.[i]?.model}
                            {...createFieldHandlers(i, "fireArms")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="Caliber"
                            name="caliber"
                            value={arms.caliber}
                            error={!!error.fireArms?.[i]?.caliber}
                            helperText={error.fireArms?.[i]?.caliber}
                            {...createFieldHandlers(i, "fireArms")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="Serial No"
                            name="serialNo"
                            value={arms.serialNo}
                            error={!!error.fireArms?.[i]?.serialNo}
                            helperText={error.fireArms?.[i]?.serialNo}
                            {...createFieldHandlers(i, "fireArms")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="sticker No"
                            name="stickerNo"
                            value={arms.stickerNo}
                            error={!!error.fireArms?.[i]?.stickerNo}
                            helperText={error.fireArms?.[i]?.stickerNo}
                            {...createFieldHandlers(i, "fireArms")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  );
                })}
              </Paper>
            </FormGroup>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12} my={2}>
          <Card sx={{ boxShadow: 2 }}>
            <Typography variant="subtitle1" marginBottom={0.8}>
              Coach Details Details
            </Typography>
            <FormGroup sx={{ position: "relative" }}>
              <Paper sx={{ background: "none", boxShadow: "none" }}>
                <div style={{ display: "flex", width: "150px", alignItems: "center", position: "absolute", top: "-35px", right: "0px" }}>
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center" }} onClick={() => handleAddFields("coachDetails")}>
                    <AddIcon />
                  </Button>
                  {formData.coachDetails.length > 1 && (
                    <Button variant="outlined" sx={{ width: "20px", textAlign: "center", ml: 0.5 }} onClick={() => handleRemoveFields("coachDetails")}>
                      <RemoveIcon />
                    </Button>
                  )}
                </div>
                {formData?.coachDetails?.map((coach: any, i: any) => {
                  return (
                    <Grid container spacing={2} mt={0.3} key={i}>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id={`coachname-${i}`}
                            label="Coach Name"
                            name={`coachName`}
                            value={coach.coachName}
                            error={!!error.coachDetails?.[i]?.coachName}
                            helperText={error.coachDetails?.[i]?.coachName}
                            {...createFieldHandlers(i, "coachDetails")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id={`coachname-${i}`}
                            label="From Date"
                            name={`coachFromDate`}
                            value={coach.coachFromDate}
                            error={!!error.coachDetails?.[i]?.coachFromDate}
                            helperText={error.coachDetails?.[i]?.coachFromDate}
                            {...createFieldHandlers(i, "coachDetails")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id={`coachname-${i}`}
                            label="To Date"
                            name={`coachToDate`}
                            value={coach.coachToDate}
                            error={!!error.coachDetails?.[i]?.coachToDate}
                            helperText={error.coachDetails?.[i]?.coachToDate}
                            {...createFieldHandlers(i, "coachDetails")}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  );
                })}
              </Paper>
            </FormGroup>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography mt={2} variant="subtitle2" fontSize={13} color="red">
            NOTE: Shooters who have completed their safety course on or after 18/05/2019, upload their undertaking cum indemnity bond with proper date.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Grid item xs={6} lg={6}>
              <CustomFormLabel htmlFor="passport-Expiry">BOND SUBMISSION DATE</CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconCalendar size="20" />
                  </InputAdornment>
                }
                id="bi-passport"
                placeholder="Passport Expiry Date .."
                name="bondSubmissionDate"
                error={!!error.bondSubmissionDate}
                helperText={error.bondSubmissionDate}
                value={formData.bondSubmissionDate}
                onChange={handleChange}
                onBlur={() => checkError("bondSubmissionDate")}
                type="Date"
                fullWidth
              />
            </Grid>

            <Grid item xs={6} lg={6}>
              <CustomFormLabel htmlFor="passport-Expiry">
                PAYMENT REMARK <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconCalendar size="20" />
                  </InputAdornment>
                }
                id="bi-passport"
                placeholder="Passport Expiry Date .."
                name="paymentRemark"
                error={!!error.paymentRemark}
                helperText={error.paymentRemark}
                value={formData.paymentRemark}
                onChange={handleChange}
                onBlur={() => checkError("paymentRemark")}
                type="Date"
                fullWidth
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FileUpload title="Safety course identity bond" required={true} onFileUpload={() => {}} />
        </Grid>
        <Grid lg={12} sx={{ margin: "0% 0 0 82%" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save & Draft
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSlideThree;
