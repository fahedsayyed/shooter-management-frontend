import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, FormControl, FormControlLabel, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../../../components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IconChevronDown } from "@tabler/icons";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import { getUpcomingMatchParticipationListRequest } from "src/store/reducers/matchParticipationSlice";
import moment from "moment";
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import APP_ROUTES from "src/routes/routePaths";

function formatDate(dateString: any) {
  const formattedDate = moment(dateString).format("DD-MM-YYYY");

  return formattedDate;
}

function UpcomingMatchApprovedParticipationList() {
  const [selected, setSelected] = useState<any>([]);


  const checkLabels = ["paid Amount", "DRA/Club Of Representaion"];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} :any = useParams();
   const response = useSelector((state:AppState)=>state.competition.response)
   const allApprovedMatchParticipant = useSelector((state: AppState) => state.competition.allMatchParticipationList);
   console.log(response,"---ress")
   const tempPendingListWithFormattedDate = allApprovedMatchParticipant.map((row: any) => ({
    ...row,
    created_at: formatDate(row.created_at),
  }));

  // const approvedList = useSelector((state:AppState)=>state.competition.allMatchParticipationList)

  useEffect(() => {
    dispatch(getUpcomingMatchParticipationListRequest({ match_status: "DISAPPROVED",comp_id:id }));
  }, []);

  const handleSelect = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item: string) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr. No", width: 100 },
    {
      field: "shooterName",
      headerName: "Shooter Name",
      flex: 1,
      renderCell: (params) => `${params.row.first_name} ${params.row.last_name}`,
    },
    { field: "club_dra_name", headerName: "DRA/Club Name", /* width: 200 */ flex: 1 },
    
    { field: "created_at", headerName: "Participate Date", flex: 1 },
    {
      field: "match_status",
      headerName: "Match Status", 
      flex: 1,
      renderCell: (params) => params.row.matches ? params.row.matches.map((match:any) => match.match_status).join(", ") : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => showAthleteListing(params.row.id)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => editStatusForMatches(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const showAthleteListing = (id: number) => {
    navigate(`${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/view-shooter-match-participation/${id}`);
  };

  const editStatusForMatches = (id: number) => {
    const status = "DISAPPROVED";
    navigate(`${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/edit-shooter-match-participation-status/${id}/${status}`);
  };

  const selectAllChecks = () => {
    if (selected.length === checkLabels.length) {
      setSelected([]);
    } else {
      setSelected(checkLabels);
    }
  };

  const isAllChecked = selected.length === checkLabels.length;

  return (
    <>
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<IconChevronDown />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="subtitle1" color="#000">
              Export Pending Match Participation List
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <Stack direction="row" width="100%" sx={{ gap: 2, flexWrap: "wrap" }} spacing={3}>
                  {checkLabels.map((item: any) => (
                    <FormControlLabel key={item} control={<CustomCheckbox color="success" checked={selected.includes(item)} onChange={() => handleSelect(item)} />} label={item} />
                  ))}
                  <FormControlLabel control={<CustomCheckbox color="success" name="select-all" checked={isAllChecked} onChange={selectAllChecks} />} label="Select All" />
                  <Button sx={{ height: "fit-content" }} variant="outlined" color="info">
                    Export
                  </Button>
                </Stack>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Paper>
        <DataTable rows={tempPendingListWithFormattedDate} columns={columns} />
      </Paper>
    </>
  );
}

export default UpcomingMatchApprovedParticipationList;
