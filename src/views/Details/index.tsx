import { useEffect, useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip, IconButton, Grid } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import CsvDownloader from "src/components/csv-downloader";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { IDetails } from "src/types/Details";
import { useDispatch } from "react-redux";
import { addCompetitionId, fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const competitionId = useSelector((state:AppState)=>state.competition.competitionId)
  console.log(competitionId, "competitionId");
  const [competitionType, setCompetitionType] = useState();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<IDetails | null>(null);
  const competition = useSelector((state: AppState) => state.competition.competition);


  useEffect(() => {
    dispatch(fetchCompetitionListStart());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 80 },
    { field: "event_group", headerName: "Event Group Name", width: 150 },
    { field: "lane", headerName: "Lanes", width: 80 },
    { field: "reserved_lane", headerName: "Reserved Lanes", width: 100 },
    { field: "defective_lane", headerName: "Defective Lanes", width: 100 },
    { field: "preparation_time", headerName: "Preparation Times", width: 100 },
    { field: "event_time", headerName: "Event Times", width: 100 },
    { field: "changeover_time", headerName: "Change Over Times", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,

      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleView(params.row)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleOpenAlert(params.row)}>
              <IconTrash size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // const rows: IDetails[] = [
  //   {
  //     id: 1,
  //     event_group: "10m Rifle Event",
  //     lane: "20",
  //     reserved_lane: "15",
  //     defective_lane: "5",
  //     preparation_time: "10 Mins",
  //     event_time: "8 Mins",
  //     changeover_time: "5 Mins",
  //     competition_name: "Mumbai Shooting Championship",
  //     start_date: "2020-01-01",
  //     end_date: "2022-01-01",
  //   },
  //   {
  //     id: 2,
  //     event_group: "30m Rifle Event",
  //     lane: "20",
  //     reserved_lane: "17",
  //     defective_lane: "3",
  //     preparation_time: "12 Mins",
  //     event_time: "10 Mins",
  //     changeover_time: "7 Mins",
  //     competition_name: "Pune Shooting Championship",
  //     start_date: "2020-01-01",
  //     end_date: "2022-01-01",
  //   },
  //   {
  //     id: 3,
  //     event_group: "50m Rifle Event",
  //     lane: "20",
  //     reserved_lane: "12",
  //     defective_lane: "8",
  //     preparation_time: "15 Mins",
  //     event_time: "10 Mins",
  //     changeover_time: "9 Mins",
  //     competition_name: "Thane Shooting Championship",
  //     start_date: "2022-01-01",
  //     end_date: "2024-01-01",
  //   },
  //   {
  //     id: 4,
  //     event_group: "100m Rifle Event",
  //     lane: "20",
  //     reserved_lane: "10",
  //     defective_lane: "10",
  //     preparation_time: "18 Mins",
  //     event_time: "10 Mins",
  //     changeover_time: "7 Mins",
  //     competition_name: "Nashik Shooting Championship",
  //     start_date: "2022-01-01",
  //     end_date: "2025-01-01",
  //   },
  //   {
  //     id: 5,
  //     event_group: "100m Rifle Event",
  //     lane: "20",
  //     reserved_lane: "18",
  //     defective_lane: "2",
  //     preparation_time: "16 Mins",
  //     event_time: "10 Mins",
  //     changeover_time: "3 Mins",
  //     competition_name: "Kolhapur Shooting Championship",
  //     start_date: "2022-01-01",
  //     end_date: "2026-01-01",
  //   },
  // ];

  const handleView = (rows: IDetails) => {
    navigate("/details/view", { state: { row: rows } });
  };

  const handleEdit = (rows: IDetails) => {
    // Navigate to the edit page with the association ID as a URL parameter
    navigate(`/details/edit`, { state: { row: rows } });
  };

  // const filteredRows = rows.filter((row) => {
  //   if (competitionType !== "All" && row.competition_name !== competitionType) {
  //     return false;
  //   }

  //   return true;
  // });

  const handleOpenAlert = (rows: IDetails) => {
    setAssociationToDelete(rows);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  const handleSelectCompetition = (e: any) => {
    
     dispatch(addCompetitionId(e.target.value))
    
  };


  return (
    <>
      <PageContainer title="Details" description="This is Details Page">
        <BlankCard>
          <TableHead title="Detail List" />
          <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField select label="Select Competition" name="competition_name" value={competitionType} onChange={handleSelectCompetition} fullWidth margin="normal">
                {competition.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} alignSelf="center" justifySelf="center" lg={6}>
              <Box textAlign="right">
                {/* <CsvDownloader data={rows} filename="Details" /> */}
              </Box>
            </Grid>
          </Grid>

          {/* <DataTable rows={filteredRows} columns={columns} checkbox={false} /> */}
          <AlertBox
            open={alertOpen}
            title="Confirm Delete"
            disabled={false}
            buttonText="Delete"
            message={<>Are you sure want to delete this data? </>}
            onClose={handleCloseAlert}
            onConfirm={handleConfirmAction}
          />
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default DetailPage;
