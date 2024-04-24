import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Button,
  Card,
  Typography,
  FormGroup,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";

import TableHead from "src/components/table-head";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import validateForm, { generateErrorInitialState, generativeFieldErrorCheck } from "src/utils/FormValidate";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import { RequiredStar } from "src/components/required-star";
import { notifyMessage } from "src/utils/toastNotify";

const EditEquipment = () => {
  const [formData, setFormData] = React.useState<any>(() => {
    const storedState = localStorage.getItem("generatedField");
    
    return storedState
      ? JSON.parse(storedState)
      : {
          shooterId: "",
          shootingShoes: "",
          shootingGloves: "",
          waistBelt: "",
          underClothingJacket: "",
          underClothingtrousers: "",
          caseCatcher: "",
          frontBlinder: "",
          sideBlinder: "",
          dateTesting: "",
          examinerName: "",
          fireArms: [{ gunType: "", make: "", model: "", caliber: "", serialNo: "", stickerNo: "" }],
        };
  });

  const errorInitialState: any = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  useEffect(() => {
    localStorage.setItem("generatedField", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFields = () => {
    setFormData((prev: any) => ({
      ...prev,
      fireArms: [...prev.fireArms, { gunType: "", make: "", model: "", caliber: "", serialNo: "", stickerNo: "" }],
    }));
  };

  const handleRemoveFields = () => {
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

  //TODO: To make changes for input fields for errors
  const checkFireArmsError = (fieldName: any, value: any, index: number) => {
    setError((prevErrors: any) => generativeFieldErrorCheck(prevErrors, fieldName, value, index));
  };

  //TODO: All in one field ---
  const createFieldHandlers = (i: number) => ({
    onBlur: (e: any) => {
      const fieldName = e.target.name;
      checkFireArmsError(fieldName, formData.fireArms[i][fieldName], i);
    },
    onChange: (e: any) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        fireArms: prev.fireArms.map((fireArm: any, index: number) => (index === i ? { ...fireArm, [name]: value } : fireArm)),
      }));
      //! Show error messages based on Id
      checkFireArmsError(name, value, i);
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
    <>
      <BackLink title="Back to equipment control sheet" route={APP_ROUTES.EQUIPMENT_CONTROL_SHEET} />
      <TableHead title="Edit Equipments" />
      <Grid container spacing={4} mt={{ lg: 1.5, sm: 1 }}>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
              Shooter ID <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              placeholder="Shooter Id"
              name="shooterId"
              value={formData.shooterId}
              error={!!error.shooterId}
              helperText={error.shooterId}
              onChange={handleChange}
              onBlur={() => checkError("shooterId")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Card sx={{ boxShadow: 2 }}>
            <Typography variant="subtitle1" marginBottom={0.8}>
              Firearms
            </Typography>
            <FormGroup sx={{ position: "relative" }}>
              <Paper sx={{ background: "none", boxShadow: "none" }}>
                <div style={{ display: "flex", width: "150px", alignItems: "center", position: "absolute", top: "-35px", right: "0px" }}>
                  <Button variant="outlined" sx={{ width: "20px", textAlign: "center" }} onClick={handleAddFields}>
                    <AddIcon />
                  </Button>
                  {formData.fireArms.length > 1 && (
                    <Button variant="outlined" sx={{ width: "20px", textAlign: "center", ml: 0.5 }} onClick={handleRemoveFields}>
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
                            {...createFieldHandlers(i)}
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
                            {...createFieldHandlers(i)}
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
                            {...createFieldHandlers(i)}
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
                            {...createFieldHandlers(i)}
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
                            {...createFieldHandlers(i)}
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
                            {...createFieldHandlers(i)}
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
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<GridExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Your Equipments/Clothing & Accessories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Shooting shoes R/P"
                      placeholder="Sticker No."
                      name="shootingShoes"
                      value={formData.shootingShoes}
                      error={!!error.shootingShoes}
                      helperText={error.shootingShoes}
                      onChange={handleChange}
                      onBlur={() => checkError("shootingShoes")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Shooting gloves"
                      placeholder="Sticker No."
                      name="shootingGloves"
                      value={formData.shootingGloves}
                      error={!!error.shootingGloves}
                      helperText={error.shootingGloves}
                      onChange={handleChange}
                      onBlur={() => checkError("shootingGloves")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Waist belt"
                      placeholder="Sticker No."
                      name="waistBelt"
                      value={formData.waistBelt}
                      error={!!error.waistBelt}
                      helperText={error.waistBelt}
                      onChange={handleChange}
                      onBlur={() => checkError("waistBelt")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Under clothing jacket"
                      placeholder="Sticker No."
                      name="underClothingJacket"
                      value={formData.underClothingJacket}
                      error={!!error.underClothingJacket}
                      helperText={error.underClothingJacket}
                      onChange={handleChange}
                      onBlur={() => checkError("underClothingJacket")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Under clothing trousers"
                      placeholder="Sticker No."
                      name="underClothingtrousers"
                      value={formData.underClothingtrousers}
                      error={!!error.underClothingtrousers}
                      helperText={error.underClothingtrousers}
                      onChange={handleChange}
                      onBlur={() => checkError("underClothingtrousers")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Case catcher"
                      placeholder="Sticker No."
                      name="caseCatcher"
                      value={formData.caseCatcher}
                      error={!!error.caseCatcher}
                      helperText={error.caseCatcher}
                      onChange={handleChange}
                      onBlur={() => checkError("caseCatcher")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Front blinder"
                      placeholder="Sticker No."
                      name="frontBlinder"
                      value={formData.frontBlinder}
                      error={!!error.frontBlinder}
                      helperText={error.frontBlinder}
                      onChange={handleChange}
                      onBlur={() => checkError("frontBlinder")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3}>
                  <FormControl fullWidth>
                    <CustomTextField
                      id="make-weapon"
                      label="Side blinder"
                      placeholder="Sticker No."
                      name="sideBlinder"
                      value={formData.sideBlinder}
                      error={!!error.sideBlinder}
                      helperText={error.sideBlinder}
                      onChange={handleChange}
                      onBlur={() => checkError("sideBlinder")}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
              {" "}
              Date of testing <b style={{ color: "red" }}>*</b>{" "}
            </CustomFormLabel>
            <CustomTextField
              type="date"
              name="dateTesting"
              value={formData.dateTesting}
              error={!!error.dateTesting}
              helperText={error.dateTesting}
              onChange={handleChange}
              onBlur={() => checkError("dateTesting")}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
              {" "}
              Examiner Name <b style={{ color: "red" }}>*</b>{" "}
            </CustomFormLabel>
            <CustomTextField
              placeholder="Examiner Name"
              name="examinerName"
              value={formData.examinerName}
              error={!!error.examinerName}
              helperText={error.examinerName}
              onChange={handleChange}
              onBlur={() => checkError("examinerName")}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EditEquipment;
