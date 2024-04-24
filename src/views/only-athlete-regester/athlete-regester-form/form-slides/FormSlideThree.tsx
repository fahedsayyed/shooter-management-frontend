import React, { useState, useCallback, useEffect } from "react";
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
import validateForm, { generateErrorInitialState, generativeFieldErrorCheckForManyTypes } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import FileUpload from "src/components/upload-file/UploadFile";
import { setFiles, setSlideThreeFormData } from "src/store/athlete-register-formdata/AthleteFormDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppState } from "src/store/Store";
import { getLocalFormData, setLocalFormData } from "src/services/localStorage/localServices";

import { fetchEvents, fetchMembershipPlansWithType, fetchMembershipSubTypesAllClubs } from "src/store/athlete-register-formdata/common/ThunkSlideForms";
import CustomOutlinedInput from "src/utils/theme-elements/CustomOutlinedInput";

const FormSlideThree = () => {
  const dispatch: AppDispatch = useDispatch();

  const combinedSlideThree: any = useSelector((state: AppState) => state.athleteRegister.slideThree);
  const { allTypeEvents, allMembershipPlans, allMembershipPlansWithType, allMembershipSubTypesAllClubs } = useSelector((state: AppState) => state.utilFormSlice);

  const initialFormData = getLocalFormData("slideThreeFormData") || {
    passportNumber: "",
    passportImage: null,
    dateOfIssue: "",
    passportDateAuthority: "",
    main: "",
    type: "",
    subtype: "",
    selectLifeOthers: "",
    membershipNumber: "",
    membershipAssociationCertificate: null,
    nraiShooterId: "",
    dateOfExpiry: "",
    passportPlaceIssue: "",
    passportValidity: "",
    arjunaAwardee: "yes",
    internationalAwardee: "no",
    arjunaAwardeeCertificate: null,
    internationalAwardeeCertificate: null,
    fireArms: [{ weapon_type: "", make: "", model: "", calibre: "", serial_no: "", sticker: "" }],
    coachDetails: [{ coach_name: "", from_date: "", to_date: "" }],
    bondSubmissionDate: "",
    paymentRemark: "",
    indemnityBond: null,
    validity: ""
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const errorInitialState: any = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);
  const [passportExpiry, setpassportExpiry] = useState(false);
  const [isPassportDatesDisabled, setIsPassportDatesDisabled] = useState(false);

  const updateFormData = useCallback(() => {
    const { passportImage, arjunaAwardeeCertificate, internationalAwardeeCertificate, membershipAssociationCertificate, indemnityBond, ...restData } = formData;
    setLocalFormData("slideThreeFormData", restData);
    dispatch(setSlideThreeFormData(formData));
  }, [combinedSlideThree]);

  useEffect(() => {
    updateFormData();
    console.log(combinedSlideThree, "combined 3 data");
  }, [formData, dispatch]);

  useEffect(() => { dispatch(fetchEvents()) }, [dispatch])
  useEffect(() => {
    // dispatch(fetchmembershipPlansAndEvents(formData.main))
    if (formData.main) {
      dispatch(fetchMembershipPlansWithType(formData.main));
    }
  }, [formData.main, dispatch]);

  const handleAddFields = (type: string) => {
    if (type === 'fireArms') {
      setFormData((prev: any) => ({
        ...prev,
        fireArms: [...prev.fireArms, { weapon_type: "", make: "", model: "", calibre: "", serial_no: "", sticker: "" }],
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        coachDetails: [...prev.coachDetails, { coach_name: "", from_date: "", to_date: "" }],
      }));
    }
  };

  const handleRemoveFields = (type: string) => {
    if (type === 'fireArms') {
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

  useEffect(() => {
    const isPassportNumberEmpty = !formData.passportNumber.trim();
    const isDateFieldsDisabled = isPassportNumberEmpty;

    setIsPassportDatesDisabled(isDateFieldsDisabled)
  }, [formData.passportNumber]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'main' && newData.main === "MRA") {

        return { ...newData, type: "" };
      }

      if (name === 'main' && newData.main === "MRA_AFFILIATED") {

        return { ...newData, type: "", subType: "" };
      }

      if (name === 'type') {
        const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
        dispatch(fetchMembershipSubTypesAllClubs(formattedValue));

      }

      setLocalFormData("slideThreeFormData", newData);

      return newData;
    });

    dispatch(setSlideThreeFormData(formData));
  };

  const checkError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
    console.log(newErrors, fieldName, 'all erros');
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
        [fieldType]: prev[fieldType].map((item: any, index: number) =>
          index === i ? { ...item, [name]: value } : item
        ),
      }));

      const updatedFields = {
        [fieldType]: {
          index: i,
          [name]: value,
        },
      };

      dispatch(setSlideThreeFormData(updatedFields));
      checkGenerativeFieldsErrors(name, value, i, fieldType);
    },
  });

  //TODO: Submit the form ---
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // wholeError();

    // if (error) {
    //   notifyMessage.error("Please fill all the fields");
    // } else {
    //   notifyMessage.success("Success");
    // }
  };

  const isDateValid = () => {
    const expiryDate = new Date(formData.dateOfExpiry);
    const issueDate = new Date(formData.dateOfIssue);

    return expiryDate >= issueDate;
  };

  const handleBlur = () => {
    setpassportExpiry(!isDateValid());
  };


  const handlePassportPhotoUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideThree', fileType: 'passportImage', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        passportImage: uploadedFile,
      }));
    }
  };

  const handleMembershiptAssociationUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideThree', fileType: 'membershipAssociationCertificate', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        membershipAssociationCertificate: uploadedFile,
      }));
    }
  };

  const handleArjunaAwardeeUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideThree', fileType: 'arjunaAwardeeCertificate', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        arjunaAwardeeCertificate: uploadedFile,
      }));
    }
  };
  const handleInternationalAwardeeUpload = (files: FileList | any) => {
    if (files && files.length > 0) {
      const uploadedFile = files[0];

      dispatch(setFiles({ slideName: 'slideThree', fileType: 'internationalAwardeeCertificate', fileData: uploadedFile }));
      setFormData((prev: any) => ({
        ...prev,
        internationalAwardeeCertificate: uploadedFile,
      }));
    }
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="bi-passport">
            Passport Number
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
            onBlur={() => checkError("passportNumber")}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FileUpload title="passport" required={false} onFileUpload={handlePassportPhotoUpload} />
        </Grid>
        {isPassportDatesDisabled ? null : (
          <>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="passport-issue" sx={{ color: isPassportDatesDisabled ? "#ccc" : "333" }} > Passport Date of issue</CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconCalendar size="20" />
                  </InputAdornment>
                }
                id="bi-passport"
                type="Date"
                placeholder="Passport Issue Date .."
                name="dateOfIssue"
                disabled={isPassportDatesDisabled}
                // error={!!error.dateOfIssue}
                // helperText={error.dateOfIssue}
                value={formData.dateOfIssue}
                onChange={handleChange}
                onBlur={() => checkError("dateOfIssue")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="passport-Expiry" sx={{ color: isPassportDatesDisabled ? "#ccc" : "333" }} > Passport Date of Expiry</CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconCalendar size="20" />
                  </InputAdornment>
                }
                id="bi-passport"
                type="Date"
                placeholder="Passport Expiry Date .."
                name="dateOfExpiry"
                disabled={isPassportDatesDisabled}
                // error={!!error.dateOfExpiry}
                // helperText={error.dateOfExpiry}
                //   helperText={
                //     !isDateValid() && (<span style={{ color: 'red' }}>Expiry date should not be less than the date of issue</span>) || 
                //     (!!error.dateOfExpiry && (<>Expiry Date is required</>))
                // }
                value={formData.dateOfExpiry}
                onChange={handleChange}
                onBlur={() => checkError("dateOfExpiry")}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="passport-place" sx={{ color: isPassportDatesDisabled ? "#ccc" : "333" }}> Place Of Issue</CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconBuildingSkyscraper size="20" />
                  </InputAdornment>
                }
                id="passport-place"
                placeholder="Place Of Issue.."
                name="passportPlaceIssue"
                // error={!!error.passportPlaceIssue}
                // helperText={error.passportPlaceIssue}
                disabled={isPassportDatesDisabled}
                value={formData.passportPlaceIssue}
                onChange={handleChange}
                onBlur={() => checkError("passportPlaceIssue")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="Passport-authority" sx={{ color: isPassportDatesDisabled ? "#ccc" : "333" }}> Passport Issuing Authority</CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconFileDescription size="20" />
                  </InputAdornment>
                }
                id="bi-passport"
                placeholder="Passport Issuing Authority .."
                name="passportDateAuthority"
                // error={!!error.passportDateAuthority}
                // helperText={error.passportDateAuthority}
                disabled={isPassportDatesDisabled}
                value={formData.passportDateAuthority}
                onChange={handleChange}
                onBlur={() => checkError("passportDateAuthority")}
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="Passport-authority"> Types Of Member</CustomFormLabel>
            <CustomSelect
              id="Passport-authority"
              name="main"
              defaultValue={formData.main}
              value={formData.main}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >

              {allMembershipPlans?.map((mainType: any, id: number) => (
                <MenuItem key={id} value={mainType.main}>
                  {mainType.main === 'MRA' ? 'State' : 'State Affiliates'}
                </MenuItem>
              ))}
            </CustomSelect>
            <FormHelperText></FormHelperText>
          </FormControl>
        </Grid>
        {formData.main === `MRA` ? (
          <>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-membershipType">
                Select Type of Memberships <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-membershipType"
                name="type"
                defaultValue={formData.type}
                value={formData.type}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                {allMembershipPlansWithType ?
                  allMembershipPlansWithType?.map((mainType: any, id: number) => (
                    <MenuItem key={id} value={mainType.type}>
                      {mainType.type}
                    </MenuItem>
                  )) : "NO ROWS FOUND"}
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
                NRAI Shooter ID
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
                name="type"
                defaultValue={formData.type}
                value={formData.type}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                {allMembershipPlansWithType ?
                  allMembershipPlansWithType
                    .filter((mainType: any) => mainType.type !== "NRAI MEMBER")
                    .map((mainType: any, id: number) => (
                      <MenuItem key={id} value={mainType.type}>
                        {mainType.type}
                      </MenuItem>
                    )) : "NO ROWS FOUND"}
              </CustomSelect>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="bi-subtype">
                Name Of Rifle Club/District/Registered Units <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="bi-subtype"
                name="subtype"
                defaultValue={formData.subtype}
                value={formData.subtype}
                // disabled={formData.type === ""}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                {allMembershipSubTypesAllClubs ?
                  allMembershipSubTypesAllClubs?.map((subType: any, id: number) => (
                    <MenuItem key={id} value={subType.type}>
                      {subType.type}
                    </MenuItem>
                  )) : "NO ROWS FOUND"}
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
                NRAI Shooter ID
              </CustomFormLabel>
              <CustomTextField
                startadornment={
                  <InputAdornment position="start">
                    <IconUser size="20" />
                  </InputAdornment>
                }
                id="bi-nrai-shooter"
                name="nraiShooterId"
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
              NOTE: Membership Association Certificate should be of affiliated State Rifle Association/DRA/RC/Registered Unit (RU)
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FileUpload title="Membership association certificate" required={false} onFileUpload={handleMembershiptAssociationUpload} />
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
            name="validity"
            // error={!!error.validity}
            // helperText={error.validity}
            value={formData.validity}
            onChange={handleChange}
            onBlur={() => checkError("validity")}
            type="Date"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ my: 2 /* backgroundColor: (theme) => theme.palette.grey[50] */ }}>
            <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
              Are You Arjuna Awardee
            </Typography>
            <RadioGroup row aria-label="position" name="arjunaAwardee" defaultValue="top">
              <FormControlLabel value="yes" name="arjunaAwardee" checked={formData.arjunaAwardee === "yes"} onChange={handleChange} control={<CustomRadio />} label="Yes" />
              <FormControlLabel value="no" name="arjunaAwardee" checked={formData.arjunaAwardee === "no"} onChange={handleChange} control={<CustomRadio />} label="No" />
            </RadioGroup>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ my: 2 /* backgroundColor: (theme) => theme.palette.grey[50] */ }}>
            <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
              Are You International Awardee
            </Typography>
            <RadioGroup row aria-label="position" name="internationalAwardee" defaultValue="top">
              <FormControlLabel value="yes" name="internationalAwardee" checked={formData.internationalAwardee === "yes"} onChange={handleChange} control={<CustomRadio />} label="Yes" />
              <FormControlLabel value="no" name="internationalAwardee" checked={formData.internationalAwardee === "no"} onChange={handleChange} control={<CustomRadio />} label="No" />
            </RadioGroup>
          </Card>
        </Grid>
        {
          formData.arjunaAwardee === "yes" && (
            <Grid item xs={12} lg={6}>
              <FileUpload title="Arjuna awardee certificate" required={false} onFileUpload={handleArjunaAwardeeUpload} />
            </Grid>
          )
        }
        {
          formData.internationalAwardee === "yes" && (
            <Grid item xs={12} lg={6} justifyContent='flex-end'>
              <FileUpload title="International awardee certificate" required={false} onFileUpload={handleInternationalAwardeeUpload} />
            </Grid>
          )
        }
        <Grid item xs={12} lg={12} my={2}>
          <Card sx={{ boxShadow: 2 }}>
            <Typography variant="subtitle1" marginBottom={0.8}>
              Weapon Details
            </Typography>
            <FormGroup sx={{ position: "relative" }}>
              <Paper sx={{ background: "none", boxShadow: "none" }}>
                <div style={{ display: "flex", width: "150px", alignItems: "center", position: "absolute", top: "-35px", right: "0px" }}>
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center" }} onClick={() => handleAddFields('fireArms')}>
                    <AddIcon />
                  </Button>
                  {formData.fireArms.length > 1 && (
                    <Button variant="outlined" sx={{ width: "20px", textAlign: "center", ml: 0.5 }} onClick={() => handleRemoveFields('fireArms')}>
                      <RemoveIcon />
                    </Button>
                  )}
                </div>
                {formData?.fireArms?.map((arms: any, i: any) => {
                  return (
                    <Grid container spacing={2} mt={0.3} key={i}>
                      <Grid item xs={12} lg={2}>
                        <FormControl fullWidth error={!!error.fireArms?.[i]?.weapon_type}>
                          <InputLabel id="demo-multiple-name-label">Type</InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name="weapon_type"
                            value={arms.weapon_type}
                            {...createFieldHandlers(i, 'fireArms')}
                            input={<OutlinedInput label="Type" />}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  width: 250,
                                },
                              },
                            }}
                          >
                            {allTypeEvents &&
                              allTypeEvents.map((events: any) => (
                                <MenuItem key={events.id} value={events.event_name}>
                                  {events.event_name}
                                </MenuItem>
                              ))}
                          </Select>
                          {error.fireArms?.[i]?.weapon_type && <FormHelperText> weapon_type is required.</FormHelperText>}
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
                            {...createFieldHandlers(i, 'fireArms')}
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
                            {...createFieldHandlers(i, 'fireArms')}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="Calibre"
                            name="calibre"
                            value={arms.calibre}
                            error={!!error.fireArms?.[i]?.calibre}
                            helperText={error.fireArms?.[i]?.calibre}
                            {...createFieldHandlers(i, 'fireArms')}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="Serial No"
                            name="serial_no"
                            value={arms.serial_no}
                            error={!!error.fireArms?.[i]?.serial_no}
                            helperText={error.fireArms?.[i]?.serial_no}
                            {...createFieldHandlers(i, 'fireArms')}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={2}>
                        <FormControl fullWidth>
                          <CustomTextField
                            id="make-weapon"
                            label="sticker No"
                            name="sticker"
                            value={arms.sticker}
                            error={!!error.fireArms?.[i]?.sticker}
                            helperText={error.fireArms?.[i]?.sticker}
                            {...createFieldHandlers(i, 'fireArms')}
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
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center" }} onClick={() => handleAddFields('coachDetails')}>
                    <AddIcon />
                  </Button>
                  {formData.coachDetails.length > 1 && (
                    <Button variant="outlined" sx={{ width: "20px", textAlign: "center", ml: 0.5 }} onClick={() => handleRemoveFields('coachDetails')}>
                      <RemoveIcon />
                    </Button>
                  )}
                </div>
                {formData?.coachDetails?.map((coach: any, i: any) => {
                  return (
                    <Grid container columnSpacing={2} mt={0.3} key={i}>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomFormLabel sx={{ mt: 0.2 }} htmlFor="nrai-shooter"> Coach Name</CustomFormLabel>
                          <CustomTextField
                            id={`coachname-${i}`}
                            name={`coach_name`}
                            value={coach.coach_name}
                            // error={!!error.coachDetails?.[i]?.coach_name}
                            // helperText={error.coachDetails?.[i]?.coach_name}
                            {...createFieldHandlers(i, 'coachDetails')}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomFormLabel sx={{ mt: 0.2 }} htmlFor="nrai-shooter"> From Date</CustomFormLabel>
                          <CustomTextField
                            id={`coachname-${i}`}
                            name={`from_date`}
                            value={coach.from_date}
                            // error={!!error.coachDetails?.[i]?.from_date}
                            // helperText={error.coachDetails?.[i]?.from_date}
                            {...createFieldHandlers(i, 'coachDetails')}
                            type="date"
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4} lg={4}>
                        <FormControl fullWidth>
                          <CustomFormLabel sx={{ mt: 0.2 }} htmlFor="nrai-shooter"> To Date</CustomFormLabel>

                          <CustomTextField
                            id={`coachname-${i}`}
                            name={`to_date`}
                            value={coach.to_date}
                            // error={!!error.coachDetails?.[i]?.to_date}
                            // helperText={error.coachDetails?.[i]?.to_date}
                            {...createFieldHandlers(i, 'coachDetails')}
                            type="date"
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
        {/* <Grid item xs={12} lg={12}>
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
          <FileUpload title="Safety course identity bond" required={true} onFileUpload={() => { }} />
        </Grid>
        */}
        {/* <Grid item lg={12} sx={{ margin: "0% 0 0 82%" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save & Draft
          </Button>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default FormSlideThree;
