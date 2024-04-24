import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  FormControl,
  FormHelperText,
  Paper,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  OutlinedInput,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { RequiredStar } from "src/components/required-star";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { IconUser } from "@tabler/icons-react";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { AppState, dispatch } from "src/store/Store";
import {
  addMatchEntryRequest,
  fetchCompetitionByIdStart,
  getMatchDetailListBycompetitionRequest,
  getPreferedLocationByCompetitionRequest,
} from "src/store/reducers/matchParticipationSlice";
import { jwtDecode } from "jwt-decode";
import { fetchAthleteListStart, fetchSingleAthleteRequest } from "src/store/reducers/atheleteSlice";
import { formatDateWithMoment } from "src/utils/basicFormaters";

interface Event {
  id: string;
  eventName: string;
  fees: string;
  mqs: {
    score: string;
    competition: string;
    extra: string;
  };
  year: string;
}

const AthleteEntryForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const initialFormData = {
    competition: "",
    shooter: "",
    preferedLocation: "",
    paraShooter: false,
    paymentNumber: "",
    ReceiptNumber: "",
    PaymentAmount: "",
    shareWeapon: "",
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const [athleteId, setAthleteId] = useState();
  const errorInitialState = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);
  const [selectedMatch, setSelectedMatch] = useState<{
    match_group_id?: string;
  }>({});

  const [events, setEvents] = useState<Event[]>([
    {
      id: "",
      eventName: "",
      fees: "",
      mqs: {
        score: "",
        competition: "",
        extra: "",
      },
      year: "",
    },
  ]);
  const competitionDetail = useSelector((state: AppState) => state.competition.competitionDetail);
  const matchDetailsByCompetition = useSelector((state: AppState) => state.competition.matchDetailsByCompetition);
  const preferredLocation = useSelector((state: AppState) => state.competition.preferedLocation);
  const response = useSelector((state: AppState) => state.competition.response);
  const athlete = useSelector((state: AppState) => state.athelete.Athlete);

  const athleteList = useSelector((state: AppState) => state.athelete.athleteList);
  console.log(athleteList, "enrty response");

  const { is_approved } = athlete;

  console.log(is_approved, "is_approved");
  const { name, in_MQS_applicable, competition_id, from_date, to_date, district_name } = competitionDetail;

  console.log(formatDateWithMoment(to_date), from_date, "---date");

  console.log(matchDetailsByCompetition, "matchDetailsByCompetition");
  const comp_id = competition_id;

  useEffect(() => {
    const id = athleteId;
    if (athleteId) {
      dispatch(fetchSingleAthleteRequest(id));
    }
  }, [athleteId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompetitionByIdStart(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (competition_id) {
      Promise.all([
        dispatch(getMatchDetailListBycompetitionRequest({ comp_id })),
        dispatch(getPreferedLocationByCompetitionRequest({ comp_id })),
        dispatch(fetchAthleteListStart()),
      ]);
    }
  }, [competition_id, comp_id]);

  // useEffect(() => {
  //   const token = localStorage.getItem("refreshToken");
  //   console.log(token, "in one -- tk");
  //   if (token) {
  //     const decodedToken: any = jwtDecode(token);
  //     console.log(decodedToken, "decoded");
  //     if (decodedToken) {
  //       const { athlete_id } = decodedToken;
  //       console.log(athlete_id, "athleteId");
  //       setAthleteId(athlete_id);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (competitionDetail && competitionDetail.category_name) {
  //     dispatch(fetchEventsListStart(competitionDetail.category_name));
  //   }
  // }, [competitionDetail]);

  useEffect(() => {
    if (competitionDetail) {
      setFormData({
        competition: name,
      });
    }
  }, [competitionDetail, id]);

  const singleError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: string) => ({
    onChange: handleChange,
    onBlur: () => singleError(fieldName),
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };

      return newData;
    });
  };
  console.log(formData, "--formData");
  const addEvent = () => {
    const newEvent: Event = {
      id: "",
      eventName: "",
      fees: "",
      mqs: {
        score: "",
        competition: "",
        extra: "",
      },
      year: "",
    };
    setEvents([...events, newEvent]);
  };

  const removeEvent = () => {
    const updatedEvents = [...events];
    updatedEvents.pop();
    setEvents(updatedEvents);
  };

  const handleInputChange = (id: any, field: string, value: string | number) => {
    const updatedEvents: any = events.map((event) => {
      if (event.id === id) {
        if (field.startsWith("mqs.")) {
          const mqsField = field.split(".")[1];

          return {
            ...event,
            mqs: {
              ...event.mqs,
              [mqsField]: value,
            },
          };
        } else if (field == "eventName") {
          const isMatchSelected = events.some((e) => e.id !== id && e.eventName === value);

          if (isMatchSelected) {
            notifyMessage.error("This Match Is Already Selected");

            return event;
          }

          const selectedMatch = matchDetailsByCompetition.find((match: any) => match.id === value);
          setSelectedMatch(selectedMatch);

          return {
            ...event,
            [field]: value,
            fees: selectedMatch ? selectedMatch.fees : "",
            id: selectedMatch ? selectedMatch.match_no : "",
          };
        } else {
          return {
            ...event,
            [field]: value,
          };
        }
      }

      return event;
    });

    setEvents(updatedEvents);
  };
  console.log(athleteId, "athleteId");

  const handleSubmit = async () => {
    try {
      const isValid = validateForm(formData);
      if (!isValid) {
        notifyMessage.error("Form has errors. Please fix them before submitting.");

        return;
      }
      const totalFees = events.reduce((acc, event) => acc + Number(event.fees), 0);
      const requestData = {
        competition_id: competition_id,
        athlete_id: athleteId,
        location_id: formData.preferedLocation,
        is_para: "No",
        total_fees: totalFees,
        is_sharing_weapon: "No",
        events: events.map((event) => ({
          id: event.id,
          match_id: event.eventName,
          match_group_id: selectedMatch ? selectedMatch.match_group_id : "",
          mqs: {
            score: event.mqs.score,
            mqs_comp_id: event.mqs.competition,
            extra: event.mqs.extra,
          },
          year: event.year,
        })),
      };
      if (is_approved == null) {
        notifyMessage.error("You Are Not Approved To Participate");
      } else {
        await dispatch(addMatchEntryRequest(requestData));
      }

      setFormData(initialFormData);
      setEvents([
        {
          id: "",
          eventName: "",
          fees: "",
          mqs: {
            score: "",
            competition: "",
            extra: "",
          },
          year: "",
        },
      ]);

      // notifyMessage.success("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      notifyMessage.error("Error submitting data. Please try again.");
    }
  };

  const selectAthlete = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAthleteId: any = event.target.value;
    console.log(selectedAthleteId, "ddddd");
    setAthleteId(selectedAthleteId);
  };

  console.log(athleteId);

  console.log(formData.preferedLocation, "---location");

  return (
    <>
      <TableHead title="Match Participation Form" />
      <Paper sx={{ padding: "10px 20px" }}>
        <Grid container columnSpacing={3} marginTop={1}>
          <Grid item xs={6} lg={6}>
            <CustomFormLabel htmlFor="bi-competition">
              Competition <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconUser size="20" />
                </InputAdornment>
              }
              id="bi-competition"
              placeholder="Competition name "
              name="competition"
              value={formData.competition}
              error={!!error.competition}
              helperText={error.competition}
              {...createFieldHandlers("competition")}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl error={!!error.shooter} fullWidth>
              <CustomFormLabel htmlFor="state-shooter">
                Shooter's Name <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="shooter"
                name="shooter"
                value={athleteId}
                onChange={selectAthlete}
                className="custom-select"
                // {...createFieldHandlers("shooter")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {!athleteList ? (
                  <MenuItem>No Athlete Found</MenuItem>
                ) : (
                  athleteList.map((athlete: any) => (
                    <MenuItem key={athlete.id} value={athlete.id}>
                      {athlete?.first_name} {athlete?.last_name}
                    </MenuItem>
                  ))
                )}
              </CustomSelect>

              {error.shooter && <FormHelperText>Select a Shooter (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl error={!!error.preferedLocation} fullWidth>
              <CustomFormLabel htmlFor="state-preferedLocation">
                Prefered Location <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="preferedLocation"
                name="preferedLocation"
                className="custom-select"
                value={formData.preferedLocation}
                {...createFieldHandlers("preferedLocation")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {!preferredLocation ? (
                  <MenuItem>No ROWS FOUND</MenuItem>
                ) : (
                  preferredLocation.map((location: any) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))
                )}
              </CustomSelect>

              {error.preferedLocation && <FormHelperText>Select a Prefered Location (this field is required).</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={6} lg={6} sx={{ mt: 4 }}>
            <Typography variant="h6">Duration</Typography>
            <Typography variant="body1" mt={2}>
              {`${formatDateWithMoment(to_date)} \u00A0 To \u00A0 ${formatDateWithMoment(to_date)}`}
            </Typography>
          </Grid>

          <Grid item xs={6} lg={6} sx={{ mt: 4 }}>
            <FormControlLabel control={<CustomCheckbox color="success" name="paraShooter" onChange={() => {}} />} label="Are You Para Shooter ?" />
          </Grid>
          <Grid item xs={6} lg={6} sx={{ mt: 4 }}>
            <Typography variant="h6">Place</Typography>
            <Typography variant="body1" mt={2}>
              {district_name}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
            {events.length > 1 ? (
              <Button variant="outlined" sx={{ mr: 1 }} onClick={removeEvent}>
                {" "}
                <RemoveIcon />{" "}
              </Button>
            ) : (
              ""
            )}
            <Button variant="outlined" onClick={addEvent}>
              {" "}
              <AddIcon />{" "}
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#cccccc4a", color: "#f2f2f2" }}>
                  <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                    Event No
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                    Event Name
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                    Fees
                  </TableCell>
                  {in_MQS_applicable == "Yes" && (
                    <>
                      <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                        MQS
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                        Year
                      </TableCell>
                    </>
                  )}

                  <TableCell sx={{ border: "1px solid #ccc" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell sx={{ border: "1px solid #ccc" }}></TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}></TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}></TableCell>
                {in_MQS_applicable == "Yes" && (
                  <TableCell sx={{ padding: 0 }}>
                    <TableRow
                      sx={
                        {
                          /* display: "flex", justifyContent: "space-between", alignItems: "center" */
                        }
                      }
                    >
                      <TableCell sx={{ border: "1px solid #ccc", width: "20%" }} align="center">
                        Score
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", width: "20%" }} align="center">
                        Competition
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", width: "20%" }} align="center">
                        Competition Name
                      </TableCell>
                    </TableRow>
                  </TableCell>
                )}
                {in_MQS_applicable == "Yes" && (
                  <>
                    <TableCell sx={{ border: "1px solid #ccc" }}></TableCell>
                  </>
                )}
                <TableCell sx={{ border: "1px solid #ccc" }}></TableCell>
                {/* <TableCell sx={{ border: "1px solid #ccc" }} align='center'>Year</TableCell> */}
                {events.map((event) => (
                  <TableRow key={event.id} sx={{ paddingX: "20px" }}>
                    <TableCell sx={{ border: "1px solid #ccc", paddingX: 2, minWidth: "100px" }}>{event.id}</TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      <FormControl fullWidth>
                        <CustomSelect
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={event.eventName}
                          name="eventName"
                          fullWidth
                          onChange={(e: any) => handleInputChange(event.id, "eventName", e.target.value)}
                          sx={in_MQS_applicable === "Yes" ? { width: "100px" } : {}}
                        >
                          {matchDetailsByCompetition.map((match: any) => (
                            <MenuItem key={match.id} value={match.id}>
                              {match.name}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ccc" }}>
                      <CustomTextField
                        type="number"
                        value={event.fees}
                        onChange={(e: any) => handleInputChange(event.id, "fees", Number(e.target.value))}
                        variant="outlined"
                        fullWidth
                        disabled
                        sx={in_MQS_applicable === "Yes" ? { width: "70px" } : {}}
                      />
                    </TableCell>
                    {in_MQS_applicable == "Yes" && (
                      <>
                        <TableCell sx={{ border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                          {/* <TableBody> */}
                          <OutlinedInput
                            type="number"
                            sx={{ border: "1px solid #ccc" }}
                            value={event.mqs.score}
                            onChange={(e: any) => handleInputChange(event.id, "mqs.score", Number(e.target.value))}
                            // variant="standard"
                            // size="small"
                          />
                          <FormControl fullWidth>
                            <CustomSelect
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={event.mqs.competition}
                              name="competition"
                              fullWidth
                              onChange={(e: any) => handleInputChange(event.id, "mqs.competition", e.target.value)}
                            >
                              <MenuItem value={1}>50 Meter Rifle</MenuItem>
                              <MenuItem value={2}>50 Meter Rifle</MenuItem>
                              <MenuItem value={3}>50 Meter Rifle</MenuItem>
                            </CustomSelect>
                          </FormControl>
                          <OutlinedInput
                            value={event.mqs.extra}
                            sx={{ border: "1px solid #ccc" }}
                            onChange={(e: any) => handleInputChange(event.id, "mqs.extra", e.target.value)}
                            // variant="standard"
                            // size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }}>
                          <FormControl fullWidth>
                            <CustomSelect
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={event.year}
                              name="year"
                              fullWidth
                              onChange={(e: any) => handleInputChange(event.id, "year", e.target.value)}
                            >
                              <MenuItem value={2021}>2021</MenuItem>
                              <MenuItem value={2022}>2022</MenuItem>
                              <MenuItem value={2023}>2023</MenuItem>
                            </CustomSelect>
                          </FormControl>
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ccc" }} style={{ textAlign: "center" }}>
                          <Button variant="outlined" disabled={events.length === 1} sx={{ cursor: events.length === 1 ? "not-allowed" : "pointer", mr: 1 }} onClick={removeEvent}>
                            <RemoveIcon />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Grid container columnSpacing={3} marginTop={2}>
          <Grid item xs={6} lg={6}>
            <CustomFormLabel htmlFor="bi-competition">
              Receipt Number <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconUser size="20" />
                </InputAdornment>
              }
              id="bi-competition"
              placeholder="Receipt Number "
              name="ReceiptNumber"
              value={formData.ReceiptNumber}
              error={!!error.ReceiptNumber}
              helperText={error.ReceiptNumber}
              {...createFieldHandlers("ReceiptNumber")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} lg={6}>
            <CustomFormLabel htmlFor="bi-competition">
              Payment Amount <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconUser size="20" />
                </InputAdornment>
              }
              id="bi-competition"
              placeholder="Payment Amount "
              name="paymentAmount"
              value={formData.PaymentAmount}
              error={!!error.PaymentAmount}
              helperText={error.PaymentAmount}
              {...createFieldHandlers("PaymentAmount")}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} lg={12} mt={2}>
            <FormControlLabel control={<CustomCheckbox color="primary" name="shareWeapon" onChange={() => {}} />} label=" Do want to share your weapon with other shooters?" />
          </Grid>
          <Grid lg={12} mt={2} mr={2} textAlign="right">
            <Button variant="contained" color="inherit" /* onClick={handleSubmit} */>
              back
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AthleteEntryForm;
