import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import TableHead from "src/components/table-head";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { IDetails } from "src/types/Details";
import { useLocation } from "react-router";
import PageContainer from "src/components/page-container/PageContainer";

interface FormSlideOneProps {
  // getSlideError: (callback: () => void) => void;
  step: number;
}

const FormSlideOne: React.FC<FormSlideOneProps> = ({ step }) => {
  const [detail, setDetail] = useState<IDetails>({
    comp_id: 0,
    competition_name: "",
    event_group: "",
    lane: "",
    reserved_lane: "",
    defective_lane: "",
    start_date: "",
    end_date: "",
    preparation_time: "",
    event_time: "",
    changeover_time: "",
  });
  const errorInitialState: any = generateErrorInitialState(detail);
  const [error, setError] = useState(errorInitialState);
  const { competition_name, event_group, lane, reserved_lane, defective_lane, start_date, end_date, preparation_time, event_time, changeover_time } = detail;

  const location: any = useLocation();
  const row = location.state.row;
  console.log("data", row);

  useEffect(() => {
    if (row) {
      setDetail(row);
    }
  }, [row]);

  const wholeError = () => {
    const newErrors = validateForm(detail);
    setError(newErrors);
  };

  useEffect(() => {
    console.log(step);
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const checkError = (fieldName: keyof IDetails) => {
    const newErrors: { [key in keyof IDetails]?: string } = validateForm({ [fieldName]: detail[fieldName] });
    setError((prevErrors: { [key in keyof IDetails]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IDetails) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleDraft = (e: React.FormEvent) => {
    e.preventDefault();

    const check = Object.values(detail).every((e) => e !== "");
    console.log(check, "check");
    if (!competition_name && !event_group && !lane && !reserved_lane && !defective_lane && !start_date && !end_date) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      notifyMessage.success("Saved Draft Successfully");
    }

    // Save the association data to local storage
    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(detail);
    localStorage.setItem("details", JSON.stringify(details));
  };

  //   const handleNext = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const check = Object.values(detail).every((e) => e !== "");
  //     console.log(check, "check");
  //     if (!competition_name && !event_group && !lane && !reserved_lane && !defective_lane && !start_date && !end_date) {
  //       notifyMessage.error("Check all the required fields");
  //       wholeError();
  //     } else {
  //       navigate("/details/create/page2");
  //       console.log("send data");
  //       // notifyMessage.success("Saved Successfully");
  //     }
  //   };

  return (
    <PageContainer>
      <Paper>
        <Grid container p={2} columnSpacing={3}>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Competition Name
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              select
              className="custom-select"
              id="text-email"
              variant="outlined"
              name="competition_name"
              value={competition_name}
              fullWidth
              onChange={handleInputChange}
              error={!!error.competition_name}
              helperText={error.competition_name}
              {...createFieldHandlers("competition_name")}
            >
              <MenuItem value="Mumbai Shooting Championship">Mumbai Shooting Championship</MenuItem>
              <MenuItem value="Pune Shooting Championship">Pune Shooting Championship</MenuItem>
              <MenuItem value="Nashik Shooting Championship">Nashik Shooting Championship</MenuItem>
              <MenuItem value="Thane Shooting Championship">Thane Shooting Championship</MenuItem>
              <MenuItem value="Kolhapur Shooting Championship">Kolhapur Shooting Championship</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Event Group
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              select
              className="custom-select"
              id="text-email"
              variant="outlined"
              name="event_group"
              value={event_group}
              fullWidth
              onChange={handleInputChange}
              error={!!error.event_group}
              helperText={error.event_group}
              {...createFieldHandlers("event_group")}
            >
              <MenuItem value="10m Rifle Event">10m Rifle Event</MenuItem>
              <MenuItem value="30m Rifle Event">30m Rifle Event</MenuItem>
              <MenuItem value="50m Rifle Event">50m Rifle Event</MenuItem>
              <MenuItem value="100m Rifle Event">100m Rifle Event</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="lane"
              value={lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!error.lane}
              helperText={error.lane}
              {...createFieldHandlers("lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Reserved Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="reserved_lane"
              value={reserved_lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!error.reserved_lane}
              helperText={error.reserved_lane}
              {...createFieldHandlers("reserved_lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Defective Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="defective_lane"
              value={defective_lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!error.defective_lane}
              helperText={error.defective_lane}
              {...createFieldHandlers("defective_lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Start Date
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="start_date"
              type="date"
              value={start_date}
              fullWidth
              onChange={handleInputChange}
              error={!!error.start_date}
              helperText={error.start_date}
              {...createFieldHandlers("start_date")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              End Date
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="end_date"
              type="date"
              value={end_date}
              fullWidth
              onChange={handleInputChange}
              error={!!error.end_date}
              helperText={error.end_date}
              {...createFieldHandlers("end_date")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Preparation Time</CustomFormLabel>
            <CustomTextField id="text-email" variant="outlined" name="preparation_time" value={preparation_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Event Time</CustomFormLabel>
            <CustomTextField id="text-email" variant="outlined" name="event_time" value={event_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Changeover Time</CustomFormLabel>
            <CustomTextField id="text-email" variant="outlined" name="changeover_time" value={changeover_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack justifyContent="flex-end" direction="row">
              <Button onClick={handleDraft} variant="contained" color={"secondary"}>
                Save Draft
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default FormSlideOne;
