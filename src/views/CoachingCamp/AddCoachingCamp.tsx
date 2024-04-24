import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, CardContent, Grid, Paper, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableHead from "src/components/table-head";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import APP_ROUTES from "src/routes/routePaths";
import { RequiredStar } from "src/components/required-star";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { notifyMessage } from "src/utils/toastNotify";
import { ICoachingCamp, ISelectShooterName } from "src/types/CoachingCamps";
import BackLink from "src/components/back-link";
import PageContainer from "src/components/page-container/PageContainer";

interface IErrors {
  camp_name: boolean;
  place: boolean;
  start_date: boolean;
  end_date: boolean;
}

const AddCoachingCamp: React.FC = () => {
  const [camp, setCamp] = useState<ICoachingCamp>({
    id: 0,
    camp_name: "",
    place: "",
    start_date: "",
    end_date: "",
    shooter_name: "",
  });

  const [errors, setErrors] = useState<IErrors>({
    camp_name: false,
    place: false,
    start_date: false,
    end_date: false,
  });

  const shooter_name: ISelectShooterName[] = [
    {
      value: "Pablo Escobar",
      label: "Pablo Escobar",
    },
    {
      value: "John Wick",
      label: "John Wick",
    },
    {
      value: "Don Eladio",
      label: "Don Eladio",
    },
    {
      value: "Jack Reacher",
      label: "Jack Reacher",
    },
  ];

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCamp({ ...camp, [name]: value });
    // Clear the error when the user starts typing in a field
    setErrors({ ...errors, [name as keyof IErrors]: false });
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();

    // Perform form validation
    const requiredFields: Array<keyof ICoachingCamp> = ["camp_name", "place", "start_date", "end_date"];
    let hasErrors = false;

    const newErrors: IErrors = requiredFields.reduce((acc, field) => {
      if (!camp[field as keyof ICoachingCamp]) {
        acc[field as keyof IErrors] = true;
        hasErrors = true;
      } else {
        acc[field as keyof IErrors] = false;
      }

      return acc;
    }, {} as IErrors);

    setErrors(newErrors);

    // If there are errors, prevent form submission
    if (hasErrors) {
      notifyMessage.error("Check all the required fields");

      return;
    }

    // Save the association data to local storage
    const storedCamps = localStorage.getItem("camps");
    const camps = storedCamps ? JSON.parse(storedCamps) : [];
    camps.push(camp);
    localStorage.setItem("camps", JSON.stringify(camps));

    // Redirect back to the association list page
    // navigate(`${APP_ROUTES.COACHING_CAMP}`);
    notifyMessage.success("Saved Successfully");
  };

  const handleCancel = () => {
    navigate(`${APP_ROUTES.COACHING_CAMP}`);
  };

  return (
    <PageContainer>
      <BackLink title="Back to the Coaching Camp Page" route={APP_ROUTES.COACHING_CAMP} />
      <Paper style={{ padding: "0px", marginTop: "0px" }}>
        <TableHead title="Add Coaching Camp" />
        <Grid item xs={12}>
          <CardContent>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="text-email"
                  >
                    Name of Camp
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="camp_name"
                    value={camp.camp_name}
                    onChange={handleInputChange}
                    error={errors.camp_name}
                    helperText={errors.camp_name && "please enter camp name"}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="text-email"
                  >
                    Place
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="place"
                    value={camp.place}
                    onChange={handleInputChange}
                    error={errors.place}
                    helperText={errors.place && "please enter place"}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Start Date
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="start_date"
                    type="date"
                    value={camp.start_date}
                    onChange={handleInputChange}
                    error={errors.start_date}
                    helperText={errors.start_date && "please enter start date"}
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    End Date
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="end_date"
                    type="date"
                    value={camp.end_date}
                    onChange={handleInputChange}
                    error={errors.end_date}
                    helperText={errors.end_date && "please enter end date"}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Select Shooter
                  </CustomFormLabel>
                  <CustomSelect
                    sx={{ mt: 0 }}
                    className="custom-select"
                    id="text-email"
                    variant="outlined"
                    name="shooter_name"
                    value={camp.shooter_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  >
                    {shooter_name.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
                <Button type="submit" variant="contained" color="primary" onClick={handleCreate} style={{ marginRight: "10px" }}>
                  Save
                </Button>
                <Button type="button" variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default AddCoachingCamp;
