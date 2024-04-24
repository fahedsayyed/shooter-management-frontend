import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Tooltip, IconButton, Box, Stack, Grid, MenuItem } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React, { useEffect } from "react";
import APP_ROUTES from "src/routes/routePaths";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowNarrowLeft, IconTrash, IconPencil } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import WarningPic from "../../assets/images/backgrounds/warning.png";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { RequiredStar } from "src/components/required-star";
import { IScoreEntry } from "src/types/ScoreEntry";
import { fetchScoreDetailsStart } from "src/store/reducers/scoreEntry";
import { fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";

interface ScoreDetailRow {
  id: number;
  eventName: string;
  shooterName: string;
  series_total: string;
  eventType: string;
  detail: string;
  lane: string;
  status: string;
}

const ScoreEntry = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [eventAddAlert, setEventAddAlert] = React.useState(false);
  const [selectedCompetition, setSelectedCompetition] = React.useState();
  const competitions = useSelector((state: AppState) => state.competition.competition);
  const scoreDetails = useSelector((state: AppState) => state.scoreEntry.scoreDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCompetitionListStart());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCompetition) {
      dispatch(fetchScoreDetailsStart({ competition_id: selectedCompetition }));
    }
  }, [selectedCompetition, dispatch]);

  console.log(selectedCompetition, "selectedCompetition");

  useEffect(() => {
    console.log(scoreDetails);
  }, [scoreDetails]);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 100 },
    { field: "eventName", headerName: "Event Name", width: 300 },
    { field: "shooterName", headerName: "Shooter Name", width: 100 },
    { field: "series_total", headerName: "Score", width: 100 },
    { field: "eventType", headerName: "Event Type", width: 100 },
    { field: "detail", headerName: "Detail", width: 100 },
    { field: "lane", headerName: "Lane", width: 100 },
    { field: "status", headerName: "Status", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleOpenAlert()}>
              <IconTrash size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // const ScoreDetailRows: ScoreDetailRow[] = (scoreDetails ?? []).map((score, index) => ({
  //   id: index + 1,
  //   eventName: score.details.map((detail: any) => detail.eventName).join(", "), // Assuming there could be multiple events
  //   shooterName: score.details.map((detail: any) => detail.shooterName).join(", "), // Assuming there could be multiple shooters
  //   series_total: score.details.map((detail: any) => String(detail.series_total)).join(", "), // Assuming there could be multiple scores
  //   eventType: score.details.map((detail: any) => detail.eventType).join(", "), // Assuming there could be multiple event types
  //   detail: score.details.map((detail: any) => String(detail.detail)).join(", "), // Assuming there could be multiple details
  //   lane: score.details.map((detail: any) => String(detail.lane)).join(", "), // Assuming there could be multiple lanes
  //   status: score.details.map((detail: any) => detail.status).join(", "), // Assuming there could be multiple statuses
  // }));

  const ScoreDetailRows: ScoreDetailRow[] = (scoreDetails ?? []).map((score, index) => ({
    id: index + 1,
    eventName: score.details.map((detail: any) => detail.eventName).join(", "),
    shooterName: score.details[0]?.shooterName,
    series_total: score.details[0]?.series_total,
    eventType: score.details[0]?.eventType,
    detail: score.details[0]?.detail,
    lane: score.details[0]?.lane,
    status: score.details[0]?.status,
  }));

  const rows: IScoreEntry[] = [
    { id: 1, activitiesName: "Snow", module: "Jon", status: "Recomended By Unit", actionMessage: "software developer" },
    { id: 2, activitiesName: "Lannister", module: "Cersei", status: "Recomended By Club", actionMessage: "software developer" },
    { id: 3, activitiesName: "Lannister", module: "Jaime", status: "Recomended By Unit", actionMessage: "software developer" },
    { id: 4, activitiesName: "Stark", module: "Arya", status: "Recomended By Unit", actionMessage: "software developer" },
  ];

  const handleEdit = (id: IScoreEntry) => {
    navigate(`${APP_ROUTES.SCORE_ENTRY}/add-score`);
    console.log(id, "id");
  };

  const handleOpenAlert = () => {
    setAlertOpen(true);
  };

  const handleAddEvent = () => {
    setEventAddAlert(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseAlert();
    console.log("close");
  };

  const navigateToAddScore = () => {
    const competitionId = selectedCompetition;
    navigate(`${APP_ROUTES.SCORE_ENTRY}/add-score/${competitionId}`);
  };
  const closeScoreEntryModal = () => {
    setEventAddAlert(false);
    console.log("close");
  };
  const selectCompetition = (e: any) => {
    // dispatch(getCompetitionId(e.target.value))
    setSelectedCompetition(e.target.value);
  };

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.STATE_ADMIN_DASHBOARD}`}>
        {" "}
        <IconArrowNarrowLeft stroke={1.6} /> Back to the Home
      </Link>
      <PageContainer title="Score Entry" description="this is user page">
        <BlankCard>
          <TableHead title="Score Entry" handleOpenAlert={handleAddEvent} />
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={6}>
              <CustomSelect
                id="medalistType"
                name="medalistType"
                className="custom-select"
                value={selectedCompetition}
                placeholder="competition"
                onChange={selectCompetition}
                fullWidth
                variant="outlined"
              >
                {competitions.map((comp: any) => (
                  <MenuItem value={comp.id} key={comp.id}>
                    {comp.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                id="medalistType"
                name="medalistType"
                className="custom-select"
                value={"Select Coaching Camp"}
                // onChange={(e: any) => setSelectedMedalistType(e.target.value)}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="Select Coaching Camp">Stage</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomSelect id="medalistType" name="medalistType" className="custom-select" value={"Select Coaching Camp"} fullWidth variant="outlined">
                    <MenuItem value="Select Coaching Camp">Option</MenuItem>
                  </CustomSelect>
                </Grid>
                <Grid item>
                  <Button variant="contained">Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box textAlign="left" p={1}>
            <Stack direction="row" spacing={1} textAlign={"left"}>
              <CsvDownloader data={rows} filename="scoreentry" />
              <Button variant="contained">Copy</Button>
              <Grid item sx={{ display: "flex", gap: "10px" }}>
                <Button color="success" variant="outlined" onClick={handleOpenAlert}>
                  Approve
                </Button>
                <Button variant="outlined" color="error" onClick={handleOpenAlert}>
                  Reject
                </Button>
              </Grid>
            </Stack>
          </Box>

          <DataTable rows={ScoreDetailRows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <AlertBox
        open={alertOpen}
        title="Warning"
        disabled={false}
        buttonText="Ok"
        message={
          <>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <img src={WarningPic} style={{ width: "150px" }}></img>
            </Grid>
            Please select atleast one score entry!
          </>
        }
        onClose={handleCloseAlert}
        onConfirm={handleConfirmAction}
      />
      <AlertBox
        open={eventAddAlert}
        title="Entry Form"
        disabled={false}
        buttonText="Ok"
        message={
          <>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <CustomFormLabel>
                  Stage
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect
                  id="medalistType"
                  name="medalistType"
                  className="custom-select"
                  value={"Select Coaching Camp"}
                  sx={{ width: "100%" }}
                  // onChange={(e: any) => setSelectedMedalistType(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Select Coaching Camp">Stage</MenuItem>
                </CustomSelect>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <CustomFormLabel>
                  Option
                  <RequiredStar />
                </CustomFormLabel>

                <CustomSelect
                  id="medalistType"
                  name="medalistType"
                  className="custom-select"
                  value={"Select Coaching Camp"}
                  // onChange={(e: any) => setSelectedMedalistType(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Select Coaching Camp">Stage</MenuItem>
                </CustomSelect>
              </Grid>
            </Grid>
          </>
        }
        onClose={closeScoreEntryModal}
        onConfirm={navigateToAddScore}
      />
    </>
  );
};

export default ScoreEntry;
