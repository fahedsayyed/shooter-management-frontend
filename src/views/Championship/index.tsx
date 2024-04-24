import React, { useState, useEffect } from "react";
import DataTable from "src/components/table/TableComponent";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "../../store/Store";
import { setDropdownValue } from "../../store/eventgroups/DropdownSlice";
import { Box, Tab, Paper, Container, Accordion, Typography, AccordionDetails, FormControl, Stack, Grid, MenuItem } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { IconTargetArrow, IconClipboardData, IconCircleMinus } from "@tabler/icons-react";
import { useParams } from "react-router";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import BlankCard from "src/components/shared/BlankCard";
import ActionButton from "src/components/ActionButton";
import { notifyMessage } from "src/utils/toastNotify";
import EventGroups from "../eventgroups";

import {
  getAllCompetitionCategories,
  getEventName,
  deleteEventById,
  getAllCompetition,
  deleteCompetionById,
  deleteCompetionCategoryById,
} from "../Championship/ChampionshipUtils/functionUtils";
//import { fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";
//import { useSelector } from "react-redux";

type CompetitionCategory = {
  id: number;
  category_name: string;
  is_national: boolean | null;
};

type EventName = {
  id: number;
  name: string;
  qualifying_score: number;
};

interface Competition {
  id: number;
  name: string;
  category_name: string;
}

const Championship = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [eventDropdown, setEventDropdown] = useState("");
  const [competitionCategories, setCompetitionCategories] = useState<CompetitionCategory[]>([]);
  const [eventName, setEventName] = useState<EventName[]>([]);

  const [competition, setCompetition] = useState<Competition[]>([]);
  const [selectedId, setSelectedId] = useState();

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleNavigation = (id: any, route: string, state?: object): void => {
    navigate(`${APP_ROUTES.CHAMPIONS}/${route}/${id}`);
  };

  const handleEdit = (id: any) => handleNavigation(id, "edit-competition");
  const handleEventEdit = (id: any) => handleNavigation(id, "edit-event");
  const handleCategoryEdit = (id: any) => handleNavigation(id, "edit-category");

  const handleDropdown = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setEventDropdown(value);
    dispatch(setDropdownValue(value));
  };

  const compitionColumns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 180 },
    { field: "competitionName", headerName: "Competition Name", width: 300 },
    { field: "competitionCategory", headerName: "Competition Category", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <ActionButton onEdit={() => handleEdit(params.row.id)} onDelete={() => handleOpenAlerts(params.row.id)} />
        </>
      ),
    },
  ];

  const eventColumns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 150 },
    { field: "eventName", headerName: "Event Name", width: 550 },
    { field: "qualifyingScore", headerName: "Qlfy/Score", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <ActionButton onEdit={() => handleEventEdit(params.row.id)} onDelete={() => handleOpenAlerts(params.row.id)} />
        </>
      ),
    },
  ];

  const categoriesColumns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 250 },
    { field: "competitionCategory", headerName: "Competition Category", width: 450 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <ActionButton onEdit={() => handleCategoryEdit(params.row.id)} onDelete={() => handleOpenAlerts(params.row.id)} />
        </>
      ),
    },
  ];

  // const competitions = useSelector((state: AppState) => state.competition.competition);
  // console.log(competitions, "competitions");
  // useEffect(() => {
  //   dispatch(fetchCompetitionListStart());
  // }, [dispatch]);

  const fetchCompetitions = async (): Promise<Competition[]> => {
    try {
      const response = await getAllCompetition();
      const competitionsData: Competition[] = response;

      return competitionsData;
    } catch (error) {
      console.error("Failed to fetch competitions", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCompetitionCategories();
        const competition = await fetchCompetitions();
        setCompetitionCategories(categories);
        setCompetition(competition);
      } catch (error) {
        console.error("Failed to fetch competition categories", error);
      }
    };

    fetchData();
  }, []);

  const fetchEventName = async () => {
    try {
      if (eventDropdown) {
        const eventNames = await getEventName(eventDropdown);
        setEventName(eventNames);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    return () => {
      fetchEventName();
    };
  }, [eventDropdown]);

  const categoryRows = (competitionCategories ?? []).map((category) => ({
    id: category.id,
    competitionCategory: category.category_name,
  }));

  const competitionRows = (competition ?? []).map((comp) => ({
    id: comp.id,
    competitionName: comp.name,
    competitionCategory: comp.category_name,
  }));

  const eventRows = (eventName ?? []).map((event) => ({
    id: event.id,
    eventName: event.name,
    qualifyingScore: event.qualifying_score,
  }));

  const handleOpenAlerts = (id: any) => {
    setAlertOpen(true);
    setSelectedId(id);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmActions = async () => {
    try {
      if (selectedId) {
        const response = await deleteCompetionCategoryById(selectedId);

        if (response.success) {
          notifyMessage.success("Category deleted successfully");
          setCompetitionCategories((prevCategories) => prevCategories.filter((category) => category.id !== selectedId));
        } else {
          notifyMessage.error(response.message);
        }
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      notifyMessage.error("Failed to delete category");
    } finally {
      handleCloseAlert();
    }
  };

  const handleCompetitionDelete = async () => {
    try {
      if (selectedId) {
        //const response = await axiosServices.delete(`/api/tenants/championship/competition/${selectedId}`);
        const response = await deleteCompetionById(selectedId);
        if (response.success) {
          notifyMessage.success("Competition Deleted successfully deleted successfully");
          setCompetition((prevCompetitions) => prevCompetitions.filter((comp) => comp.id !== selectedId));
        } else {
          notifyMessage.error(response.message);
        }
      }
    } catch (error) {
      console.error("Failed to delete competition:", error);
      notifyMessage.error("Failed to delete competition");
    } finally {
      handleCloseAlert();
    }
  };

  const handleEventDelete = async () => {
    try {
      if (selectedId) {
        const result = await deleteEventById(selectedId);
        if (result.success) {
          notifyMessage.success(result.message);
          setEventName((prevEvents) => prevEvents.filter((event) => event.id !== selectedId));
        } else {
          notifyMessage.error(result.message);
        }
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
      notifyMessage.error("Failed to delete event");
    } finally {
      handleCloseAlert();
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigateToAddCompetitionPage: any = () => {
    navigate(`${APP_ROUTES.CHAMPIONS}/add-compitition`);
  };

  const navigateToAddEventPage: any = () => {
    navigate(`${APP_ROUTES.CHAMPIONS}/add-event`);
  };

  const navigateToAddCategoryPage: any = () => {
    navigate(`${APP_ROUTES.CHAMPIONS}/add-category`);
  };

  return (
    <>
      <Container maxWidth={"xl"}>
        {/* <BlankCard> */}
        <Box justifyContent={"end"} display="flex" flexDirection="column" sx={{ overflow: "auto", width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderRadius: "0" }}>
              <TabList centered sx={{ color: (theme) => theme.palette.grey[100] }} onChange={handleChange} aria-label="lab API tabs example">
                <Tab sx={{ width: "23%" }} wrapped icon={<IconTargetArrow />} iconPosition="start" label="Competitions" value="1" />
                <Tab sx={{ width: "23%" }} wrapped icon={<IconClipboardData />} iconPosition="start" label="Events" value="2" />
                <Tab sx={{ width: "23%" }} wrapped icon={<IconCircleMinus />} iconPosition="start" label="Categories" value="3" />
                <Tab sx={{ width: "23%" }} wrapped icon={<IconClipboardData />} iconPosition="start" label="Event Groups" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box>
                <Accordion>
                  <Typography variant="subtitle1" color="#000">
                    <Box
                      padding={1}
                      sx={{
                        background: "#ECF2FF",
                        paddingY: "24px",
                        paddingX: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Typography variant="h5">Competition List</Typography>
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          // loading
                          loadingPosition="end"
                          // startIcon={<AddIcon />}
                          endIcon={<AddIcon />}
                          variant="contained"
                          onClick={navigateToAddCompetitionPage}
                        >
                          Add Compitition
                        </LoadingButton>
                      </Stack>
                    </Box>
                  </Typography>

                  <AccordionDetails>
                    <Box sx={{ width: "100%" }}>
                      <FormControl sx={{ width: "100%" }}>
                        <Stack direction="row" width="100%" sx={{ gap: 2, flexWrap: "wr" }} spacing={3}></Stack>
                      </FormControl>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Paper>
                <DataTable rows={competitionRows} columns={compitionColumns} />
                <AlertBox
                  open={alertOpen}
                  title="Confirm Delete"
                  buttonText="Delete"
                  disabled={false}
                  message={<>Are you sure want to delete this Compitition </>}
                  onClose={handleCloseAlert}
                  onConfirm={() => handleCompetitionDelete()}
                />
              </Paper>
            </TabPanel>
            <TabPanel value="2">
              <BlankCard>
                <Box>
                  <Typography variant="subtitle1" color="#000">
                    <Box
                      padding={1}
                      sx={{
                        background: "#ECF2FF",
                        paddingY: "24px",
                        paddingX: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Typography variant="h5">Event List</Typography>
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          // loading
                          loadingPosition="end"
                          // startIcon={<AddIcon />}
                          endIcon={<AddIcon />}
                          variant="contained"
                          onClick={navigateToAddEventPage}
                        >
                          Add Events
                        </LoadingButton>
                      </Stack>
                    </Box>
                  </Typography>
                  <Grid item xs={12} sx={{ width: "50%", padding: "15px" }}>
                    <CustomFormLabel htmlFor="events">Select Category</CustomFormLabel>
                    <CustomSelect id="events" className="custom-select" name="events" value={eventDropdown} onChange={handleDropdown} fullWidth variant="outlined">
                      <MenuItem value="select Category" disabled>
                        Select Category
                      </MenuItem>

                      {competitionCategories &&
                        competitionCategories.map((category) => (
                          <MenuItem key={category.id} value={category.category_name}>
                            {category.category_name}
                          </MenuItem>
                        ))}
                    </CustomSelect>
                  </Grid>
                </Box>
                <Paper>
                  {/* <DataTable rows={filteredRows} columns={eventColumns} /> */}
                  <DataTable rows={eventRows} columns={eventColumns} />
                  <AlertBox
                    open={alertOpen}
                    title="Confirm Delete"
                    disabled={false}
                    buttonText="Delete"
                    message={<>Are you sure want to delete this Event </>}
                    onClose={handleCloseAlert}
                    onConfirm={() => handleEventDelete()}
                  />
                </Paper>
              </BlankCard>
            </TabPanel>
            <TabPanel value="3">
              <Box>
                <Accordion>
                  <Typography variant="subtitle1" color="#000">
                    <Box
                      padding={1}
                      sx={{
                        background: "#ECF2FF",
                        paddingY: "24px",
                        paddingX: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <Typography variant="h5">Category List</Typography>
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          // loading
                          loadingPosition="end"
                          // startIcon={<AddIcon />}
                          endIcon={<AddIcon />}
                          variant="contained"
                          onClick={navigateToAddCategoryPage}
                        >
                          Add Category
                        </LoadingButton>
                      </Stack>
                    </Box>
                  </Typography>

                  <AccordionDetails>
                    <Box sx={{ width: "100%" }}>
                      <FormControl sx={{ width: "100%" }}>
                        <Stack direction="row" width="100%" sx={{ gap: 2, flexWrap: "wr" }} spacing={3}></Stack>
                      </FormControl>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Paper>
                <DataTable rows={categoryRows} columns={categoriesColumns} />
                <AlertBox
                  open={alertOpen}
                  title="Confirm Delete"
                  disabled={false}
                  buttonText="Delete"
                  message={<>Are you sure want to delete this Category </>}
                  onClose={handleCloseAlert}
                  onConfirm={handleConfirmActions}
                />
              </Paper>
            </TabPanel>
            <TabPanel value="4">
              <EventGroups></EventGroups>
            </TabPanel>
          </TabContext>
        </Box>
        {/* </BlankCard> */}
      </Container>
    </>
  );
};

export default Championship;
