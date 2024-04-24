import React, { useEffect } from "react";
import { Button, Paper, Grid, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import { notifyMessage } from "src/utils/toastNotify";
import { IDetails } from "src/types/Details";
import PageContainer from "src/components/page-container/PageContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { setDetailsInReducer } from "src/store/reducers/detailsSlice";
import { useParams } from "react-router";
import { fetchCompetitionByIdStart } from "src/store/reducers/matchParticipationSlice";
import { fetchMatchGroupListStart } from "src/store/reducers/scoreEntry";
import { parseISO, isValid } from "date-fns";

interface FormSlideOneProps {
  athletesOfcompetitionAndMatchGroup: any;
  step: number;
  createFieldHandlers: (fieldName: keyof IDetails) => { onBlur: () => void };
  wholeError: any;
  errors: any;
}

const FormSlideOne: React.FC<FormSlideOneProps> = ({ athletesOfcompetitionAndMatchGroup, step, createFieldHandlers, errors, wholeError }) => {
  const dispatch = useDispatch();
  const detailsFromReducer = useSelector((state: AppState) => state.details.details.formSlideOne);
  const competitionDetail = useSelector((state: AppState) => state.competition.competitionDetail);
  const matchGroupDetail = useSelector((state: AppState) => state.scoreEntry.matchGroups);
  const { competition_name, event_group, lane, reserved_lane, defective_lane, start_date, end_date, preparation_time, event_time, changeover_time } = detailsFromReducer;

  const params = useParams();

  useEffect(() => {
    if (params.comp_id) {
      Promise.all([dispatch(fetchCompetitionByIdStart(params.comp_id)), dispatch(fetchMatchGroupListStart({ comp_id: params.comp_id }))]).catch((error) => {
        console.error("Error dispatching actions:", error);
      });
    }
  }, [params.comp_id, dispatch]);

  useEffect(() => {
    if (competitionDetail) {
      const { name } = competitionDetail;

      dispatch(setDetailsInReducer({ competition_name: name, comp_id: params.comp_id }));
    }
  }, [competitionDetail, dispatch, params.comp_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetails: IDetails = { [name]: value } as unknown as IDetails;
    dispatch(setDetailsInReducer(updatedDetails));
  };

  const handleDraft = (e: React.FormEvent) => {
    e.preventDefault();

    const check = Object.values(detailsFromReducer).every((e) => e !== "");
    if (!competition_name && !event_group && !lane && !reserved_lane && !defective_lane && !start_date && !end_date) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      notifyMessage.success("Saved Draft Successfully");
    }

    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(detailsFromReducer);
    localStorage.setItem("details", JSON.stringify(details));
  };

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
              id="text-lane"
              variant="outlined"
              name="competition_name"
              value={detailsFromReducer.competition_name}
              disabled
              fullWidth
              onChange={handleInputChange}
              error={!!errors.competition_name}
              helperText={errors.competition_name}
              {...createFieldHandlers("competition_name")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Event Group
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              select
              className="custom-select"
              id="text-event_group"
              variant="outlined"
              name="event_group"
              value={event_group}
              fullWidth
              onChange={handleInputChange}
              error={!!errors.event_group}
              helperText={errors.event_group}
              {...createFieldHandlers("event_group")}
            >
              {matchGroupDetail?.map((matchGroup: any) => (
                <MenuItem key={matchGroup.id} value={matchGroup.id}>
                  {matchGroup.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-lane"
              variant="outlined"
              name="lane"
              value={lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!errors.lane}
              helperText={errors.lane}
              {...createFieldHandlers("lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Reserved Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-reserved_lane"
              variant="outlined"
              name="reserved_lane"
              value={reserved_lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!errors.reserved_lane}
              helperText={errors.reserved_lane}
              {...createFieldHandlers("reserved_lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Defective Lane
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-defective_lane"
              variant="outlined"
              name="defective_lane"
              value={defective_lane}
              type="number"
              fullWidth
              onChange={handleInputChange}
              error={!!errors.defective_lane}
              helperText={errors.defective_lane}
              {...createFieldHandlers("defective_lane")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              Start Date
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-start_date"
              variant="outlined"
              name="start_date"
              type="date"
              value={start_date}
              inputFormat="dd/MM/yyyy"
              fullWidth
              onChange={handleInputChange}
              error={!!errors.start_date}
              helperText={errors.start_date}
              {...createFieldHandlers("start_date")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">
              End Date
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-end_date"
              variant="outlined"
              name="end_date"
              type="date"
              value={end_date}
              inputFormat="dd/MM/yyyy"
              fullWidth
              onChange={handleInputChange}
              error={!!errors.end_date}
              helperText={errors.end_date}
              {...createFieldHandlers("end_date")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Preparation Time</CustomFormLabel>
            <CustomTextField id="text-preparation_time" variant="outlined" name="preparation_time" value={preparation_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Event Time</CustomFormLabel>
            <CustomTextField id="text-event_time" variant="outlined" name="event_time" value={event_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel htmlFor="text-email">Changeover Time</CustomFormLabel>
            <CustomTextField id="text-changeover_time" variant="outlined" name="changeover_time" value={changeover_time} fullWidth onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack justifyContent="flex-end" direction="row">
              <Button type="submit" onClick={handleDraft} variant="contained" color={"secondary"}>
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
