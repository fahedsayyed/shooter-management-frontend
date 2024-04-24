import React, { useState } from "react";

import { useParams } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import { Button, FormControl, Grid } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import BackLink from "src/components/back-link";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import CustomTextField from "src/utils/theme-elements/CustomTextField";

const SafetyCourseEdit = () => {
  const formID = useParams();
  console.log(formID);

  interface FormData {
    name: string;
    dayOfSafetyCourse: string;
    limit: string;
    registrationStartDate: string;
    registrationEndDate: string;
  }

  const [formData, setFormData] = useState<FormData | any>({
    name: "",
    dayOfSafetyCourse: "",
    limit: "",
    registrationStartDate: "",
    registrationEndDate: "",
  });

  const errorInitialState: any = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkError = (fieldName: any) => {
    setError((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: validateForm({ [fieldName]: formData[fieldName] })[fieldName],
    }));
  };

  const wholeError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

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
      <BackLink title=" Back to the Safety Course" route={`${APP_ROUTES.SAFETY_COURSE}/safety-course-list`} />
      <BlankCard>
        <TableHead title="Edit Safety Course" />
        <Grid container columnSpacing={2} padding={2}>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <CustomFormLabel>
                Name <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="name"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                error={!!error.name}
                helperText={error.name}
                onChange={handleChange}
                onBlur={() => checkError("name")}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <CustomFormLabel>
                Day of safety course <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="name"
                placeholder="Day of safety course"
                name="dayOfSafetyCourse"
                value={formData.dayOfSafetyCourse}
                error={!!error.dayOfSafetyCourse}
                helperText={error.dayOfSafetyCourse}
                onChange={handleChange}
                onBlur={() => checkError("dayOfSafetyCourse")}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <CustomFormLabel>
                Limit <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="name"
                placeholder="Your Limit"
                name="limit"
                value={formData.limit}
                error={!!error.limit}
                helperText={error.limit}
                onChange={handleChange}
                onBlur={() => checkError("limit")}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <CustomFormLabel>
                Registration Start date <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id=""
                type="date"
                name="registrationStartDate"
                value={formData.registrationStartDate}
                error={!!error.registrationStartDate}
                helperText={error.registrationStartDate}
                onChange={handleChange}
                onBlur={() => checkError("registrationStartDate")}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <CustomFormLabel>
                Registration end date <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id=""
                type="date"
                name="registrationEndDate"
                value={formData.registrationEndDate}
                error={!!error.registrationEndDate}
                helperText={error.registrationEndDate}
                onChange={handleChange}
                onBlur={() => checkError("registrationEndDate")}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} textAlign={"right"}>
            <Button sx={{ marginRight: { lg: "40px", md: "20px" } }} onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </BlankCard>
    </>
  );
};

export default SafetyCourseEdit;
