import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, MenuItem, FormControlLabel, Checkbox, Button, FormControl, FormHelperText } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BlankCard from "src/components/shared/BlankCard";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import TableHead from "src/components/table-head";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import { Box, Stack } from "@mui/system";
import { useParams } from "react-router";
import { RequiredStar } from "src/components/required-star";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { useDispatch, useSelector } from "../../../store/Store";
import { EventDetail } from "../../../types/Championship/index";
import {
  getAllCompetitionCategories,
  getAllAgeGroups,
  getEventType,
  createEvent,
  updateEventById,
  getEventsBySelectedEventType,
  getEventById,
} from "../ChampionshipUtils/functionUtils";
import { Padding } from "@mui/icons-material";
import { fetchMatchDataSuccess } from "src/store/championship-reducer/getMatchData";

type CompetitionCategory = {
  id: number;
  category_name: string;
  is_national: boolean | null;
};

type ageGroup = {
  id: number;
  label: string;
};

type eventType = {
  id: number;
  event_name: string;
};

type eventTypeName = {
  id: number;
  name: string;
};

type Qualification = {
  stage: string;
  nof: number;
  nos: number;
  maxShot: number;
};

const AddEvent = () => {
  const [checked, setChecked] = useState();
  const [ageGroups, setAgeGroups] = useState<ageGroup[]>([]);
  const [eventType, setEventType] = useState<eventType[]>([]);
  const [eventTypeName, setEventTypeName] = useState<eventTypeName[]>([]);
  const [competitionCategories, setCompetitionCategories] = useState<CompetitionCategory[]>([]);
  const [showQualification, setShowQualification] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchData: any = useSelector((state) => state.matchData.matchData);
  //const dropdownValue = useSelector((state: AppState) => state.dropdown.dropdownValue);
  // console.log(matchData.competition_id, "from red ind");
  const { competition_id } = matchData;
  console.log(competition_id, "from red ind");
  const { id } = useParams();

  const [detail, setDetail] = React.useState<EventDetail>({
    competitionCategory: "",
    eventType: "",
    eventTypeName: "",
    eventNumber: "",
    eventName: "",
    ageGroup: "",
    isMixed: false,
    isPara: false,
    eventFee: "",
    teamFee: "",
    penaltyPercentage: "",
    stateMQS: "",
    isFinal: false,
    numberOfFinals: "",
    numberOfShots: "",
    maxShots: "",
    qualification: [{ stage: "", nof: "", nos: "", maxShot: "" }],
  });

  const errorInitialState: any = generateErrorInitialState(detail);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    //const newErrors = id ? validateForm(editformData) : validateForm(detail);
    const newErrors = validateForm(detail);
    setError(newErrors);
  };
  const checkError = (fieldName: keyof EventDetail) => {
    const newErrors: any = validateForm({ [fieldName]: detail[fieldName] });
    //const newErrors: any = validateForm({ ...detail, ...editformData, [fieldName]: detail[fieldName] });
    //setError((prevErrors: any) => ({ ...prevErrors, ...newErrors }));
    // setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };
  const createFieldHandlers = (fieldName: keyof EventDetail) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleNext: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const check = Object.values(detail).every((e) => e !== "");
    try {
      if (id) {
        if (!check) {
          notifyMessage.error("Check all mandatory fields");
          wholeError();
        } else {
          await updateEventById(id, detail);
          notifyMessage.success("Event updated successfully");
          console.log("send data");
        }
      } else if (!check) {
        notifyMessage.error("Check all mandatory fields");
        wholeError();
      } else {
        await createEvent(detail);
        notifyMessage.success("Event created successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleCheckValue: any = (e: any) => {
    const { name, checked } = e.target;
    setChecked(checked);
    setDetail((prevDetail: any) => ({ ...prevDetail, [name]: checked }));
  };

  const fetchEventTypeName = async () => {
    try {
      if (detail.eventType) {
        const eventsTypeName = await getEventsBySelectedEventType(detail.eventType);
        console.log(eventsTypeName, "in addevent");
        setEventTypeName(eventsTypeName);
      } else if (id) {
        console.log(id, "for id");
        const eventId = parseInt(id, 10);
        const eventData = await getEventById(eventId);
        dispatch(fetchMatchDataSuccess(eventData));
        console.log(eventData, "id data");
        setDetail((prevDetail: any) => ({
          ...prevDetail,
          // ...eventData,
          competitionCategory: eventData.category_name,
          eventTypeName: eventData.event_name,
          eventNumber: eventData.match_no,
          eventName: eventData.name,
          ageGroup: eventData.label,
          isMixed: eventData.is_mixed,
          isPara: eventData.is_para,
          eventFee: eventData.fees,
          teamFee: eventData.team_entry_fee,
          penaltyPercentage: eventData.percent_penalty,
          stateMQS: eventData.qualifying_score,
          isFinal: eventData.finals,
          numberOfFinals: eventData.nof,
          numberOfShots: eventData.nos,
          maxShots: eventData.max_shots,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEventTypeName();
  }, [id, detail.eventType]);

  const handleQualificationChange = (index: number, field: keyof Qualification, value: string) => {
    const updatedQualifications = [...detail.qualification];
    updatedQualifications[index][field] = value;
    setDetail((prevDetail) => ({ ...prevDetail, qualification: updatedQualifications }));
  };

  const handleAddQualification = () => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      qualification: [...prevDetail.qualification, { stage: "", nof: "", nos: "", maxShot: "" }],
    }));
  };

  const handleRemoveQualification = (index: number) => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      qualification: prevDetail.qualification.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleQualificationClick = () => {
    setShowQualification(!showQualification);
  };

  const handleBack = (competition_id: any) => {
    //navigate(-1);
    navigate(`${APP_ROUTES.CHAMPIONS}/edit-competition/${competition_id}`, { state: { step: 1 } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAgeGroups = await getAllAgeGroups();
        setAgeGroups(fetchedAgeGroups);
        const categories = await getAllCompetitionCategories();
        setCompetitionCategories(categories);
        const fetchEventType = await getEventType();
        setEventType(fetchEventType);
      } catch (error) {
        console.error("Failed to fetch age groups", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BackLink title="Back to the championship" route={`${APP_ROUTES.CHAMPIONS}`} onClick={() => handleBack(competition_id)} />
      {/* <TableHead title="Add Event" /> */}
      {/* <BackLink title="Back to the championship" onClick={handleBack} /> */}
      <TableHead title={id ? "Edit Event" : "Add Event"} />
      <BlankCard>
        <form>
          <Grid container spacing={3} marginTop={2}>
            <Grid item xs={12}>
              <Grid container spacing={3} sx={{ padding: "22px" }}>
                <Grid item xs={12}>
                  <FormControl error={!!error.competitionCategory} fullWidth>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                      Competition Category <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect
                      id="country-select"
                      className="custom-select"
                      name="competitionCategory"
                      value={detail.competitionCategory}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      helperText={error.competitionCategory}
                      {...createFieldHandlers("competitionCategory")}
                    >
                      {competitionCategories.map((category) => (
                        <MenuItem key={category.id} value={category.category_name}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {error.competitionCategory && <FormHelperText>Select Compition Category(this field is required)</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl error={!!error.eventType} fullWidth>
                    <CustomFormLabel htmlFor="event-type">
                      Event Type
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect
                      id="event-type"
                      className="custom-select"
                      name="eventType"
                      value={detail.eventType}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      helperText={error.eventType}
                      {...createFieldHandlers("eventType")}
                    >
                      {eventType.map((type) => (
                        <MenuItem key={type.id} value={type.event_name}>
                          {type.event_name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {error.eventType && <FormHelperText>Select Event Type(this field is required)</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl error={!!error.eventTypeName} fullWidth>
                    <CustomFormLabel htmlFor="target">
                      Event Type Name
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect
                      id="event-typename"
                      className="custom-select"
                      name="eventTypeName"
                      value={detail.eventTypeName}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      helperText={error.eventTypeName}
                      {...createFieldHandlers("eventTypeName")}
                    >
                      <MenuItem value="Select" disabled>
                        Select Event Type Name
                      </MenuItem>
                      {/* {eventTypeOptions[id ? editformData.eventType : detail.eventType]?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))} */}

                      {eventTypeName.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {error.eventTypeName && <FormHelperText>Select Event Type Name(this field is required)</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-eventnumber">
                    {" "}
                    Event Number
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="bi-eventnumber"
                    name="eventNumber"
                    placeholder=""
                    onChange={handleChange}
                    fullWidth
                    value={detail.eventNumber}
                    error={!!error.eventNumber}
                    helperText={error.eventNumber}
                    {...createFieldHandlers("eventNumber")}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-eventname">
                    {" "}
                    Event Name
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="bi-eventname"
                    placeholder="Event Name"
                    name="eventName"
                    onChange={handleChange}
                    fullWidth
                    value={detail.eventName}
                    error={!!error.eventName}
                    helperText={error.eventName}
                    {...createFieldHandlers("eventName")}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="agegroup">
                    Age Group with gender
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomSelect
                    id="agegroup"
                    className="custom-select"
                    name="ageGroup"
                    value={detail.ageGroup}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    error={!!error.ageGroup}
                    helperText={error.ageGroup}
                    {...createFieldHandlers("ageGroup")}
                  >
                    <MenuItem value="Select" disabled>
                      Select
                    </MenuItem>

                    {ageGroups.map((age) => (
                      <MenuItem key={age.label} value={age.label}>
                        {age.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>

                <Grid item alignSelf="end" xs={6}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
                        Is mixed?
                      </CustomFormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="isMixed"
                            value={checked}
                            checked={detail.isMixed}
                            onClick={handleCheckValue}
                            sx={{ marginLeft: "5px" }}
                          />
                        }
                        label=""
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
                        Is para?
                      </CustomFormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="isPara"
                            value={checked}
                            checked={detail.isPara}
                            onClick={handleCheckValue}
                            sx={{ marginLeft: "5px" }}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-eventfee"> Event Fees(in Rs.)</CustomFormLabel>
                  <CustomTextField id="bi-eventfee" name="eventFee" type="number" placeholder="" fullWidth onChange={handleChange} value={detail.eventFee} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-teamfee"> Team Fees(in Rs.)</CustomFormLabel>
                  <CustomTextField id="bi-teamfee" name="teamFee" placeholder="" type="number" fullWidth onChange={handleChange} value={detail.teamFee} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-penalty"> % Of Penalty</CustomFormLabel>
                  <CustomTextField id="bi-penalty" type="number" name="penaltyPercentage" placeholder="" onChange={handleChange} fullWidth value={detail.penaltyPercentage} />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-statemqs">
                    {" "}
                    State MQS
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="bi-statemqs"
                    name="stateMQS"
                    placeholder=""
                    fullWidth
                    onChange={handleChange}
                    value={detail.stateMQS}
                    error={!!error.stateMQS}
                    helperText={error.stateMQS}
                    {...createFieldHandlers("stateMQS")}
                  />
                </Grid>

                <Button variant="contained" color="primary" onClick={handleQualificationClick} sx={{ marginTop: 3, ml: 2 }}>
                  Qualification
                </Button>

                {showQualification && (
                  <Grid item xs={12} lg={12}>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", top: "-50px", right: "0px", display: "flex", alignItems: "center" }}>
                        <Button variant="outlined" sx={{ width: "20px", marginTop: 2, textAlign: "center", mr: 1 }} onClick={handleAddQualification}>
                          <AddIcon />
                        </Button>
                        {detail.qualification.length > 1 && (
                          <Button
                            variant="outlined"
                            sx={{ width: "20px", marginTop: 2, textAlign: "center", ml: 0.5 }}
                            onClick={() => handleRemoveQualification(detail.qualification.length - 1)}
                          >
                            <RemoveIcon />
                          </Button>
                        )}
                      </div>
                      {detail.qualification.map((qualification: any, i: any) => (
                        <Grid container spacing={2} mt={1} key={i}>
                          <Grid item xs={12} lg={3}>
                            <FormControl fullWidth>
                              <CustomTextField
                                id={`stage-${i}`}
                                label="Stage"
                                name={`qualification${i}-stage`}
                                value={qualification.stage}
                                onChange={(e: any) => handleQualificationChange(i, "stage", e.target.value)}
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} lg={3}>
                            <FormControl fullWidth>
                              <CustomTextField
                                id={`nof-${i}`}
                                label="NOF"
                                name={`qualification${i}-nof`}
                                value={qualification.nof}
                                onChange={(e: any) => handleQualificationChange(i, "nof", e.target.value)}
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} lg={3}>
                            <FormControl fullWidth>
                              <CustomTextField
                                id={`nos-${i}`}
                                label="NOS"
                                name={`qualification${i}-nos`}
                                value={qualification.nos}
                                onChange={(e: any) => handleQualificationChange(i, "nos", e.target.value)}
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} lg={3}>
                            <FormControl fullWidth>
                              <CustomTextField
                                id={`maxShot-${i}`}
                                label="Max Shot"
                                name={`qualification${i}-maxShot`}
                                value={qualification.maxShot}
                                onChange={(e: any) => handleQualificationChange(i, "maxShot", e.target.value)}
                                fullWidth
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </Grid>
                )}

                <Grid container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
                  <Grid item>
                    <CustomFormLabel htmlFor="fname-text">Final</CustomFormLabel>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          sx={{ marginTop: 2 }}
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          name="isFinal"
                          onClick={handleCheckValue}
                          checked={detail.isFinal}
                        />
                      }
                      label=""
                    />
                  </Grid>
                </Grid>
                {detail.isFinal && (
                  <>
                    <Grid item xs={12} lg={4}>
                      <CustomFormLabel htmlFor="bi-finals"> No of Finals</CustomFormLabel>
                      <CustomTextField id="bi-finals" name="numberOfFinals" placeholder="" fullWidth onChange={handleChange} value={detail.numberOfFinals} />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <CustomFormLabel htmlFor="bi-shots"> No of shots</CustomFormLabel>
                      <CustomTextField id="bi-shots" name="numberOfShots" placeholder="" fullWidth onChange={handleChange} value={detail.numberOfShots} />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <CustomFormLabel htmlFor="bi-maxshots"> Max shots</CustomFormLabel>
                      <CustomTextField id="bi-max shots" name="maxShots" placeholder="" fullWidth onChange={handleChange} value={detail.maxShots} />
                    </Grid>
                  </>
                )}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 5 }}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </BlankCard>
    </>
  );
};

export default AddEvent;
