import React, { useEffect, useState } from "react";
import { Grid, MenuItem, FormControlLabel, Checkbox, Button, Card, FormGroup, Paper, FormControl, InputLabel, Select, OutlinedInput, FormHelperText } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import TableHead from "src/components/table-head";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import { Box, Stack } from "@mui/system";
import { useLocation, useParams } from "react-router";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BlankCard from "src/components/shared/BlankCard";
import { AppState, useSelector, useDispatch } from "../../../store/Store";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import NumberDropdown from "src/components/NumberDropdown";
import { setEventData, updateFormData } from "src/store/eventgroups/addEventGroupFormSlice";
import { createEventGroup, updateEventGroupById, getAllSelectedMatches, getEventGroupById, getEventType, getTarget } from "../ChampionshipUtils/functionUtils";
import { notifyMessage } from "src/utils/toastNotify";
import DataTable from "src/components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";

type EventName = {
  id: number;
  name: string;
  match_no: string;
};
type eventType = {
  id: number;
  event_name: string;
};

type target = {
  id: number;
  name: string;
};
const AddEventGroup = () => {
  const [checked, setChecked] = useState();
  const dispatch = useDispatch();
  // const [dropdown, setDropdown] = useState("select category");
  const [targetGroupClicked, setTargetGroupClicked] = useState(false);
  const [events, setEvents] = useState<EventName[]>([]);
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [eventTypes, setEventType] = useState<eventType[]>([]);
  const [targets, setTarget] = useState<target[]>([]);
  const dropdownValue = useSelector((state: AppState) => state.dropdown.dropdownValue);
  const eventData = useSelector((state) => state.addEventGroupForm.eventData);
  // const seriesInputValues = useSelector((state) => state.addEventGroupForm.eventData.seriesTitles.values);
  // const stageTitlesInputValues = useSelector((state) => state.addEventGroupForm.eventData.stageTitles.values);
  const completeData = useSelector((state) => state.addEventGroupForm);
  // console.log(dropdownValue, "dropdownValue", eventData, "eventData");
  // console.log(dropdownValue, "from reducer");
  // console.log(eventData.eventType, "event red");

  // console.log(completeData, "from final ");
  const { id } = useParams();
  const { state } = useLocation();
  const pageType = (state as { pageType: string | undefined })?.pageType;

  // console.log(pageType, "add event");

  const [detail, setDetail] = React.useState<any>({
    competitionName: dropdownValue,
    eventName: "",
    eventType: "",
    isMixed: false,
    numberOfShots: "",
    maxShots: "",
    seriesCount: "",
    shotsInSeries: "",
    seriesTitles: [],
    stageCount: "",
    stageTitles: [],
    targetGroups: [{ target: "", record: "", sighter: "" }],
    matches: [],
  });

  const eventColumns: GridColDef[] = [
    {
      field: "select",
      headerName: "Select",
      width: 150,
      renderCell: (params) => <Checkbox checked={checkedRows.includes(params.row.id)} onChange={() => handleCheckboxChange(params.row.id)} />,
    },
    { field: "id", headerName: " Sr. No", width: 150 },
    { field: "eventNo", headerName: "Event No", width: 150 },
    { field: "eventName", headerName: "Event Name", width: 550 },
  ];

  const eventRows = (events ?? []).map((event) => ({
    id: event.id,
    eventName: event.name,
    eventNo: event.match_no,
  }));

  const handleCheckboxChange = (id: number) => {
    if (checkedRows.includes(id)) {
      setCheckedRows((prev) => prev.filter((rowId) => rowId !== id));

      setDetail((prevDetail: any) => ({
        ...prevDetail,
        matches: prevDetail.matches.filter((matchId: number) => matchId !== id),
      }));
    } else {
      setCheckedRows((prev) => [...prev, id]);

      setDetail((prevDetail: any) => ({
        ...prevDetail,
        matches: [...prevDetail.matches, id],
      }));
    }
  };

  const errorInitialState: any = generateErrorInitialState(detail);
  const [error, setError] = useState(errorInitialState);
  const { eventName, eventType, isMixed, numberOfShots, maxShots, seriesCount, shotsInSeries, seriesTitles, stageCount, stageTitles } = detail;
  // console.log(detail, "detail");
  // console.log(detail.seriesTitles, detail.stageTitles, "detail titile");
  const wholeError = () => {
    // const newErrors = validateForm(detail);
    const newErrors = validateForm(detail);
    setError(newErrors);
  };
  const checkError = (fieldName: any) => {
    const newErrors: any = validateForm({ [fieldName]: detail[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };
  const createFieldHandlers = (fieldName: string) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleNext: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const check = Object.values(detail).every((e) => e !== "");
    try {
      if (id) {
        if (!eventName && !eventType && !isMixed && !numberOfShots && !maxShots && !seriesCount && !shotsInSeries && !seriesTitles && !stageCount && !stageTitles) {
          notifyMessage.error("Check all mandatory fields");
          wholeError();
        } else {
          const updatedDetail = {
            ...detail,
            matches: checkedRows,
            targetGroups: formData.targetGroups,
          };

          await updateEventGroupById(id, updatedDetail);
          notifyMessage.success("EventGroup updated successfully");
          // console.log("send data");
        }
      } else if (!eventName && !eventType && !isMixed && !numberOfShots && !maxShots && !seriesCount && !shotsInSeries && !seriesTitles && !stageCount && !stageTitles) {
        notifyMessage.error("Check all mandatory fields");
        wholeError();
      } else {
        dispatch(updateFormData(eventData));
        await createEventGroup({
          ...detail,
          targetGroups: formData.targetGroups,
        });
        notifyMessage.success("EventGroup created successfully");
        //console.log("send data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchEventType = await getEventType();
        setEventType(fetchEventType);
        const target = await getTarget();
        setTarget(target);
        console.log(target, "events group target selection");
      } catch (error) {
        console.error("Failed to fetch age groups", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name.startsWith("targetGroup")) {
      const index = parseInt(name.replace("targetGroup", ""), 10);
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        targetGroups: prevDetail.targetGroups.map((group: any, i: number) => (i === index ? { ...group, [name]: value } : group)),
      }));
    } else if (name.startsWith("seriesTitles")) {
      const seriesIndex = parseInt(name.replace("seriesTitles", ""), 10);
      const updatedSeriesTitles = [...detail.seriesTitles];
      updatedSeriesTitles[seriesIndex] = value;
      setDetail({ ...detail, seriesTitles: updatedSeriesTitles });
    } else if (name.startsWith("stageTitles")) {
      const stageIndex = parseInt(name.replace("stageTitles", ""), 10);
      const updatedStageTitles = [...detail.stageTitles];
      updatedStageTitles[stageIndex] = value;
      setDetail({ ...detail, stageTitles: updatedStageTitles });
    } else {
      setDetail({ ...detail, [name]: value });
    }
  };

  const [formData, setFormData] = useState({
    targetGroups: [{ target: "", record: "", sighter: "" }],
  });

  const handleAddFields = () => {
    setFormData((prev) => ({
      ...prev,
      targetGroups: [...prev.targetGroups, { target: "", record: "", sighter: "" }],
    }));
  };
  const handleRemoveFields = () => {
    if (formData.targetGroups.length > 1) {
      setFormData((prev) => {
        const updatedTargetGroups = [...prev.targetGroups];
        updatedTargetGroups.pop();

        return {
          ...prev,
          targetGroups: updatedTargetGroups,
        };
      });
    }
  };

  const handleTargetGroupChange = (index: number, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      targetGroups: prev.targetGroups.map((group: any, i: number) => (i === index ? { ...group, [field]: value } : group)),
    }));
  };

  const handleTargetGroupClick = () => {
    setTargetGroupClicked((prev) => !prev);
  };

  const fetchEventName = async () => {
    try {
      const { eventType } = detail;

      if (eventType) {
        const requestBody = {
          competitionName: dropdownValue,
          eventType: eventType,
        };
        const eventNames = await getAllSelectedMatches(requestBody);
        setEvents(eventNames);
      } else if (id) {
        // console.log(id, "for id");
        const eventId = parseInt(id, 10);
        const eventData = await getEventGroupById(eventId);
        //console.log(eventData.target_groups, "id data");
        setDetail((prevDetail: any) => ({
          ...prevDetail,
          // ...eventData,

          eventName: eventData.name,
          eventType: eventData.type,
          isMixed: eventData.is_mixed,
          numberOfShots: eventData.no_of_shots,
          maxShots: eventData.max_value,
          seriesCount: eventData.no_of_series,
          shotsInSeries: eventData.shoots_in_series,
          seriesTitles: eventData.series_titles,
          stageCount: eventData.no_of_stages,
          stageTitles: eventData.stage_titles,
          targetGroups: eventData.target_groups,
          matches: eventData.matches,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEventName();
  }, [id, detail.eventType]);

  const handleNumberDropdownChange = (updatedValues: string[], field: string) => {
    setDetail({ ...detail, [field]: updatedValues });
  };

  const handleCheckValue: any = (e: any) => {
    const { checked } = e.target;
    dispatch(setEventData({ ...eventData, isMixed: checked }));
    setChecked(checked);
    setDetail((prevDetail: any) => ({ ...prevDetail, isMixed: checked }));
  };

  // const fireArmsChange = (index: any, field: any, value: any) => {
  //   setDetail((prev: any) => ({
  //     ...prev,
  //     targetGroups: prev.targetGroups.map((group: any, i: any) => (i === index ? { ...group, [field]: value } : group)),
  //   }));
  // };

  const getBackRoute = () => {
    if (pageType === "eventGroups") {
      return `${APP_ROUTES.EVENT_GROUP}`;
    } else {
      return `${APP_ROUTES.CHAMPIONS}`;
    }
  };

  return (
    <>
      <BackLink title={`Back to ${pageType === "eventGroups" ? "Event Groups" : "Championship"}`} route={getBackRoute()} />

      {/* <TableHead title="Add Event" /> */}
      <TableHead title={id ? "Edit Event Group" : "Add Event Group"} />
      <BlankCard>
        <form>
          <Grid container sx={{ padding: 1 }} spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="events">Competitions</CustomFormLabel>

                  <CustomTextField fullWidth value={id ? dropdownValue : dropdownValue} disabled />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-eventgroupname">
                    {" "}
                    Group Name
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="bi-eventgroupname"
                    name="eventName"
                    placeholder="Enter Group Name"
                    onChange={handleChange}
                    fullWidth
                    value={detail.eventName}
                    error={!!error.eventName}
                    helperText={error.eventName}
                    {...createFieldHandlers("eventName")}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl error={!!error.eventType} fullWidth>
                    <CustomFormLabel htmlFor="event-type">
                      Event Type
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect
                      sx={{ mt: 0 }}
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
                      {/* {firearmTypeOptions.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))} */}

                      {eventTypes.map((type) => (
                        <MenuItem key={type.id} value={type.event_name}>
                          {type.event_name}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    {error.eventType && <FormHelperText>Select Event Type(this field is required)</FormHelperText>}
                  </FormControl>
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
                            // value={checked}
                            checked={detail.isMixed}
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
                  <CustomFormLabel htmlFor="bi-shots">
                    {" "}
                    No of Shots
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="bi-shots"
                    name="numberOfShots"
                    placeholder="Enter No Of Shots"
                    onChange={handleChange}
                    fullWidth
                    value={detail.numberOfShots}
                    error={!!error.numberOfShots}
                    helperText={error.numberOfShots}
                    {...createFieldHandlers("numberOfShots")}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="bi-maxvalue">
                    {" "}
                    Max Value
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="bi-maxvalue"
                    name="maxShots"
                    placeholder="Enter Max Value"
                    onChange={handleChange}
                    fullWidth
                    value={detail.maxShots}
                    error={!!error.maxShots}
                    helperText={error.maxShots}
                    {...createFieldHandlers("maxShots")}
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <CustomFormLabel htmlFor="bi-seriescount">
                    {" "}
                    Series Count
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="bi-seriescount"
                    name="seriesCount"
                    placeholder=""
                    fullWidth
                    type="number"
                    onChange={handleChange}
                    value={detail.seriesCount}
                    error={!!error.seriesCount}
                    helperText={error.seriesCount}
                    {...createFieldHandlers("seriesCount")}
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <CustomFormLabel htmlFor="bi-shotinseries">
                    {" "}
                    Shots in series
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="bi-shotinseries"
                    name="shotsInSeries"
                    placeholder=""
                    fullWidth
                    type="number"
                    onChange={handleChange}
                    value={detail.shotsInSeries}
                    error={!!error.shotsInSeries}
                    helperText={error.shotsInSeries}
                    {...createFieldHandlers("shotsInSeries")}
                  />
                </Grid>

                <Grid item alignSelf="end" xs={6} sx={{ marginTop: 2 }}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
                        Series Titles
                        <RequiredStar />
                      </CustomFormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="seriesTitles"
                            onChange={handleChange}
                            value={detail.seriesTitles}
                            // onClick={handleCheckValue}
                            sx={{ marginLeft: "5px" }}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Stack>
                  <NumberDropdown numberToShow={detail.seriesCount} field="seriesTitles" onInputChange={(values) => handleNumberDropdownChange(values, "seriesTitles")} />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <CustomFormLabel htmlFor="bi-stagecount">
                    {" "}
                    Stage Count
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="bi-stagecount"
                    sx={{ mt: 0 }}
                    name="stageCount"
                    placeholder=""
                    fullWidth
                    type="number"
                    onChange={handleChange}
                    value={detail.stageCount}
                    error={!!error.stageCount}
                    helperText={error.stageCount}
                    {...createFieldHandlers("stageCount")}
                  />
                </Grid>

                <Grid item alignSelf="end" xs={6} sx={{ marginTop: 2 }}>
                  <Stack direction="row" spacing={6} alignItems="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CustomFormLabel sx={{ marginTop: 0 }} htmlFor="fname-text">
                        Stage Titles
                        <RequiredStar />
                      </CustomFormLabel>

                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="stageTitles"
                            value={detail.stageTitles}
                            onChange={handleChange}
                            // onClick={handleCheckValue}
                            sx={{ marginLeft: "5px" }}
                          />
                        }
                        label=""
                      />
                    </Box>
                  </Stack>
                  <NumberDropdown numberToShow={detail.stageCount} field="stageTitles" onInputChange={(values) => handleNumberDropdownChange(values, "stageTitles")} />
                </Grid>

                <DataTable rows={eventRows} columns={eventColumns} />
              </Grid>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" onClick={handleTargetGroupClick} sx={{ marginTop: 3, ml: 2 }}>
            Target Group
          </Button>

          {targetGroupClicked && (
            <Grid item xs={12} lg={12}>
              <Card sx={{ boxShadow: 2 }}>
                <FormGroup sx={{ position: "relative" }}>
                  <Paper sx={{ background: "none", boxShadow: "none" }}>
                    <div style={{ display: "flex", width: "150px", alignItems: "center", position: "absolute", top: "-30px", right: "0px" }}>
                      <Button variant="outlined" sx={{ width: "20px", marginTop: 2, textAlign: "center", mr: 1 }} onClick={handleAddFields}>
                        <AddIcon />
                      </Button>
                      {formData.targetGroups.length > 1 && (
                        <Button variant="outlined" sx={{ width: "20px", marginTop: 2, textAlign: "center", ml: 0.5 }} onClick={handleRemoveFields}>
                          <RemoveIcon />
                        </Button>
                      )}
                    </div>
                    {formData?.targetGroups?.map((group, i) => (
                      <Grid container spacing={2} mt={1} key={i}>
                        <Grid item xs={12} lg={3}>
                          <FormControl fullWidth>
                            <InputLabel id={`target-label-${i}`}>Target</InputLabel>
                            <CustomSelect
                              labelId={`target-label-${i}`}
                              id={`target-${i}`}
                              name={`targetGroup${i}-target`}
                              value={group.target}
                              onChange={(e: any) => handleTargetGroupChange(i, "target", e.target.value)}
                            >
                              <MenuItem value="" disabled>
                                Select Target
                              </MenuItem>
                              {targets.map((target) => (
                                <MenuItem key={target.id} value={target.name}>
                                  {target.name}
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                          <FormControl fullWidth>
                            <CustomTextField
                              id={`record-${i}`}
                              label="Record"
                              name={`targetGroup${i}-record`}
                              value={group.record}
                              onChange={(e: any) => handleTargetGroupChange(i, "record", e.target.value)}
                              fullWidth
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                          <FormControl fullWidth>
                            <CustomTextField
                              id={`sighter-${i}`}
                              label="Sighter"
                              name={`targetGroup${i}-sighter`}
                              value={group.sighter}
                              onChange={(e: any) => handleTargetGroupChange(i, "sighter", e.target.value)}
                              fullWidth
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    ))}
                  </Paper>
                </FormGroup>
              </Card>
            </Grid>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", margin: 5 }}>
            <Button type="submit" variant="contained" onClick={handleNext} color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </BlankCard>
    </>
  );
};

export default AddEventGroup;
