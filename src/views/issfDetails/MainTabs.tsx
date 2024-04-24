import React, { useState } from "react";
import { Box, Grid, IconButton, Tab, Tooltip, useMediaQuery } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router";
import Actions from "./AddISSfDetail";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { IconPencil, IconTrash } from "@tabler/icons";
import { IIssfDetails } from "src/types/IssfDetails";

import PageContainer from "src/components/page-container/PageContainer";

const MainTab = () => {
  const [value, setValue] = React.useState("1");

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<IIssfDetails | null>(null);
  console.log(associationToDelete);

  const navigate = useNavigate();

  const CompetitionColumns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 50 },
    { field: "shooterId", headerName: "Shooter Id", width: 100 },
    { field: "shootername", headerName: "Shooter Name", width: 150 },
    { field: "rank", headerName: "Rank", width: 50 },
    { field: "competition", headerName: "Competition Name", width: 200 },
    { field: "eventname", headerName: "Event Name", width: 150 },
    { field: "score", headerName: "Score", width: 50 },
    { field: "finalscore", headerName: "Final", width: 50 },
    { field: "total", headerName: "Total", width: 50 },

    {
      field: "actions",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row.id)}>
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
  const CompetitionRows: IIssfDetails[] = [
    {
      id: 1,
      shooterId: "MHRF1701MS",
      shootername: "Tom Cruise",
      rank: "1",
      competition: "Digvijay Singh Competition",
      eventname: "Air Rifle Event",
      score: "480",
      finalscore: "500",
      total: "480",
    },
    {
      id: 2,
      shooterId: "HPRF2001MS",
      shootername: "Ethan Hunt",
      rank: "2",
      competition: "Abhinav Bindra Competition",
      eventname: "Air Rifle Event",
      score: "480",
      finalscore: "500",
      total: "480",
    },
  ];
  // const handleDelete: any = (id: any) => {
  //   console.log(id);
  // };
  const handleEdit = (id: IIssfDetails) => {
    navigate(`${APP_ROUTES.ISSF_DETAILS}/edit-view/${id}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const handleOpenAlert = (rows: IIssfDetails) => {
    setAssociationToDelete(rows);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <>
      <PageContainer>
        <BlankCard>
          <TabContext value={value}>
            <Box
              sx={{
                flexShrink: 0,
                border: "0",
                borderLeft: "1px",
                borderStyle: "solid",
                right: "0",
                background: (theme) => theme.palette.background.paper,
                boxShadow: "0",
                position: lgUp ? "relative" : "absolute",
                borderColor: (theme) => theme.palette.divider,
              }}
            >
              <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
                <Tab label="ISSF Details List" value="1" />
                <Tab label="ISSF Details Create" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableHead title="ISSF DETAILS" />
              <Grid sx={{ mt: "10px" }}>
                <DataTable rows={CompetitionRows} columns={CompetitionColumns} />
                <AlertBox
                  open={alertOpen}
                  disabled={false}
                  title="Confirm Delete"
                  buttonText="Delete"
                  message={<>Are you sure want to delete this data? </>}
                  onClose={handleCloseAlert}
                  onConfirm={handleConfirmAction}
                />
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Actions />
            </TabPanel>
          </TabContext>
        </BlankCard>
      </PageContainer>
    </>
  );
};

export default MainTab;
