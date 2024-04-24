import React, { useState, useEffect } from "react";
import DataTable from "src/components/table/TableComponent";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Paper, Typography, Stack, Grid, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch } from "../../store/Store";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import BlankCard from "src/components/shared/BlankCard";
import { setDropdownValue } from "../../store/eventgroups/DropdownSlice";
import ActionButton from "src/components/ActionButton";
//import { fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";
import { deleteEventGroupById, fetchEventGroupData, getAllCompetition } from "../Championship/ChampionshipUtils/functionUtils";
import { notifyMessage } from "src/utils/toastNotify";

type EventGroup = {
  id: number;
  name: string;
  no_of_shots: number;
  max_value: number;
};

interface Competition {
  id: number;
  name: string;
  category_name: string;
}

const EventGroups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [dropdown, setDropdown] = useState("");
  const [eventGroup, setEventGroup] = useState<EventGroup[]>([]);
  const [competition, setCompetition] = useState<Competition[]>([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const competition: Competition[] = await getAllCompetition();

        setCompetition(competition);
      } catch (error) {
        console.error("Failed to fetch competition categories", error);
      }
    };

    fetchData();
  }, []);

  const fetchEventGroupDataName = async () => {
    try {
      if (dropdown) {
        const eventGroups = await fetchEventGroupData(dropdown);
        if (eventGroups) {
          setEventGroup(eventGroups);
        }
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    if (dropdown) {
      fetchEventGroupDataName();
    }
  }, [dropdown]);

  const competitionRows = (competition ?? []).map((comp) => ({
    id: comp.id,
    competitionName: comp.name,
    competitionCategory: comp.category_name,
  }));

  const eventGroupRows = (eventGroup ?? []).map((eventg) => ({
    id: eventg.id,
    eventName: eventg.name,
    shots: eventg.no_of_shots,
    maxValue: eventg.max_value,
  }));

  const currentLocation = window.location.pathname;

  let isChampionsPage = false;
  let isEventGroupsPage = false;

  if (currentLocation.includes("champions")) {
    isChampionsPage = true;
  } else if (currentLocation.includes("event-groups")) {
    isEventGroupsPage = true;
  }

  const handleEventGroupEdit: any = (id: any) => {
    isChampionsPage
      ? navigate(`${APP_ROUTES.CHAMPIONS}/edit-eventgroup/${id}`, { state: { pageType: "Championship" } })
      : navigate(`${APP_ROUTES.EVENT_GROUP}/edit-eventgroup/${id}`, { state: { pageType: "eventGroups" } });
  };
  const handleDropdown = (e: React.ChangeEvent<{ value: unknown }>) => {
    e.preventDefault();
    const value = e.target.value as string;
    dispatch(setDropdownValue(value));
    setDropdown(value);
  };

  const eventGroupColumns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 120 },
    { field: "eventName", headerName: "Event Group Name", width: 200 },
    { field: "shots", headerName: "No. of shots", width: 220 },
    { field: "maxValue", headerName: "Max Value", width: 190 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <ActionButton onEdit={() => handleEventGroupEdit(params.row.id)} onDelete={() => handleOpenAlerts(params.row.id)} />
        </>
      ),
    },
  ];

  const handleEventGroupDelete = async () => {
    try {
      if (selectedId) {
        const result = await deleteEventGroupById(selectedId);
        if (result.success) {
          notifyMessage.success(result.message);
          setEventGroup((prevEvents) => prevEvents.filter((event) => event.id !== selectedId));
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

  const handleOpenAlerts = (id: any) => {
    setAlertOpen(true);
    setSelectedId(id);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const navigateToAddEventGroupPage: any = () => {
    isChampionsPage
      ? navigate(`${APP_ROUTES.CHAMPIONS}/add-eventgroup`, { state: { pageType: "Championship" } })
      : navigate(`${APP_ROUTES.EVENT_GROUP}/add-eventgroup`, { state: { pageType: "eventGroups" } });
  };

  return (
    <>
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
              <Typography variant="h5">Event Group List</Typography>
              {competitionRows.map((comp) => comp.competitionName).includes(dropdown) && (
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    // loading
                    loadingPosition="end"
                    // startIcon={<AddIcon />}
                    endIcon={<AddIcon />}
                    variant="contained"
                    onClick={navigateToAddEventGroupPage}
                  >
                    Add Event Group
                  </LoadingButton>
                </Stack>
              )}
            </Box>
          </Typography>

          <Grid item xs={12} sx={{ width: "50%", padding: "15px" }}>
            <CustomFormLabel htmlFor="events">Select Competitions</CustomFormLabel>
            <CustomSelect id="events" className="custom-select" name="events" value={dropdown} onChange={handleDropdown} fullWidth variant="outlined">
              <MenuItem value="select Competitions" disabled>
                Select Category
              </MenuItem>
              {competitionRows &&
                competitionRows.map((comp) => (
                  <MenuItem key={comp.id} value={comp.competitionName}>
                    {comp.competitionName}
                  </MenuItem>
                ))}
            </CustomSelect>
          </Grid>
        </Box>
        <Paper>
          <DataTable rows={eventGroupRows} columns={eventGroupColumns} />
          <AlertBox
            open={alertOpen}
            disabled={false}
            title="Confirm Delete"
            buttonText="Delete"
            message={<>Are you sure want to delete this Event Group </>}
            onClose={handleCloseAlert}
            onConfirm={() => handleEventGroupDelete()}
          />
        </Paper>
      </BlankCard>
    </>
  );
};

export default EventGroups;
