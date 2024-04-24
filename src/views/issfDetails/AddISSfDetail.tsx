import React, { useState, useEffect } from "react";
import { Grid, Button, Autocomplete } from "@mui/material";

import PageContainer from "../../components/page-container/PageContainer";
// import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate, useParams } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import TableHead from "src/components/table-head";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
// import EditISSFdetail from "./EditISSFdetail";
import { notifyMessage } from "src/utils/toastNotify";
import { IIssfDetails } from "src/types/IssfDetails";

interface currencyType {
  value: string;
  label: string;
}

const Actions = () => {
  const [action, setAction] = React.useState<IIssfDetails>({
    id: 0,
    shooterId: "",
    shootername: "",
    rank: "",
    competition: "",
    eventname: "",
    score: "",
    finalscore: "",
    total: "",
  });

  const errorInitialState = generateErrorInitialState(action);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(action);
    setError(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAction({ ...action, [name]: value });
  };

  const checkError = (fieldName: keyof IIssfDetails) => {
    const newErrors: any = validateForm({ [fieldName]: action[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IIssfDetails) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleCreate = () => {
    // Perform data validation here

    const check = Object.values(action).every((e) => e !== "");
    console.log(check, "check");
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      notifyMessage.success("Saved Successfully");
    }
  };

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "params");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateToBack = () => {
    navigate(`${APP_ROUTES.ISSF_DETAILS}`);
  };

  const shootername: currencyType[] = [
    {
      value: "Tom Cruise",
      label: "Tom Cruise",
    },
    {
      value: "Mike Tyson",
      label: "Mike Tyson",
    },
    {
      value: "Gus Fring",
      label: "Gus Fring",
    },
    {
      value: "Lionel Messi",
      label: "Lionel Messi",
    },
    {
      value: "Jackie Chan",
      label: "Jackie Chan",
    },
  ];

  return (
    <>
      <PageContainer title="" description="this is Custom Form page">
        {/* <ParentCard title=""> */}
        <>
          <Grid sx={{ marginTop: "-35px" }}>
            <TableHead title="Add ISSF Details" />
          </Grid>
          <CustomFormLabel
            sx={{
              mt: 4,
            }}
            htmlFor="text-location"
          >
            Select Shooter
            <RequiredStar />
          </CustomFormLabel>
          <Autocomplete
            id="text-email"
            options={shootername}
            getOptionLabel={(option) => option.label}
            // value={shootername.find((option) => option.value === action) || null}
            value={shootername.find((option) => option.value === action.shootername) || null}
            // onChange={(event, newValue) => setAction(newValue ? newValue.value : "")}
            onChange={(event, newValue) => newValue && setAction({ ...action, shootername: newValue.value })}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                name="shootername"
                value={action.shootername}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                sx={{ mt: 0, width: "50%" }}
                error={!!error.shootername}
                helperText={error.shootername}
                {...createFieldHandlers("shootername")}
              />
            )}
          />
          <form>
            <Grid item lg={12} md={12} xs={12}>
              <Grid container spacing={3} mb={3}>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">
                    Rank
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    type="number"
                    id="fname-text"
                    variant="outlined"
                    name="rank"
                    value={action.rank}
                    onChange={handleInputChange}
                    error={!!error.rank}
                    helperText={error.rank}
                    {...createFieldHandlers("rank")}
                    fullWidth
                    margin="normal"
                  />
                  <CustomFormLabel htmlFor="fname-text">
                    Competition
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    id="fname-text"
                    variant="outlined"
                    name="competition"
                    value={action.competition}
                    onChange={handleInputChange}
                    error={!!error.competition}
                    helperText={error.competition}
                    {...createFieldHandlers("competition")}
                    margin="normal"
                    fullWidth
                  />
                  <CustomFormLabel htmlFor="fname-text">
                    Event Name
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    id="fname-text"
                    variant="outlined"
                    name="eventname"
                    value={action.eventname}
                    onChange={handleInputChange}
                    error={!!error.eventname}
                    helperText={error.eventname}
                    {...createFieldHandlers("eventname")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="lname-text">
                    Score
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    type="number"
                    id="fname-text"
                    variant="outlined"
                    name="score"
                    value={action.score}
                    onChange={handleInputChange}
                    error={!!error.score}
                    helperText={error.score}
                    {...createFieldHandlers("score")}
                    margin="normal"
                    fullWidth
                  />
                  <CustomFormLabel htmlFor="fname-text">
                    Final Score
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    type="number"
                    id="fname-text"
                    variant="outlined"
                    name="finalscore"
                    value={action.finalscore}
                    onChange={handleInputChange}
                    error={!!error.finalscore}
                    helperText={error.finalscore}
                    {...createFieldHandlers("finalscore")}
                    margin="normal"
                    fullWidth
                  />
                  <CustomFormLabel htmlFor="fname-text">
                    Total
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{
                      mt: 0,
                    }}
                    type="number"
                    id="fname-text"
                    variant="outlined"
                    name="total"
                    value={action.total}
                    onChange={handleInputChange}
                    error={!!error.total}
                    helperText={error.total}
                    {...createFieldHandlers("total")}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
              onClick={navigateToBack}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Submit
            </Button>
          </form>
        </>
        {/* </ParentCard> */}
      </PageContainer>
    </>
  );
};

export default Actions;
