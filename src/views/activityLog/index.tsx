import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";

import { GridColDef } from "@mui/x-data-grid";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps, Tooltip, IconButton, Typography, AccordionDetails, Box, Stack } from "@mui/material";
import Draggable from "react-draggable";

import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";

import React from "react";
import APP_ROUTES from "src/routes/routePaths";
import { Link } from "react-router-dom";
import { IconEye, IconArrowNarrowLeft, IconFileDescription } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import { IActivityLog } from "src/types/ActivityLogs";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ActivityLog = () => {
  const [view, setView] = React.useState(false);
  const [viewRejection, setViewRejection] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 80 },
    { field: "firstName", headerName: "Activities Name", width: 150 },
    { field: "lastName", headerName: "Module", width: 180 },
    { field: "role", headerName: "Action Message", width: 200 },
    // { field: 'role', headerName: 'IP Adress', width: 180 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleView(params.row.id)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Rejection Reason">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleViewRejection(params.row.id)}>
              <IconFileDescription size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IActivityLog[] = [
    { id: 1, lastName: "Snow", firstName: "Jon", status: "Recomended By Unit", role: "software developer" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", status: "Recomended By Club", role: "software developer" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", status: "Recomended By Unit", role: "software developer" },
    { id: 4, lastName: "Stark", firstName: "Arya", status: "Recomended By Unit", role: "software developer" },
  ];

  const handleView = (id: IActivityLog) => {
    console.log(id);
    setView(true);
  };
  const handleViewRejection = (id: IActivityLog) => {
    console.log(id);
    setViewRejection(true);
  };

  const handleClose = () => {
    setView(false);
    setViewRejection(false);
  };

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.STATE_ADMIN_DASHBOARD}`}>
        {" "}
        <IconArrowNarrowLeft stroke={1.6} /> Back to the Home
      </Link>
      <PageContainer title="Activity Logs" description="this is Activity Logs page">
        <BlankCard>
          <TableHead title="Activity Logs" />

          <AccordionDetails>
            <Box textAlign="right">
              <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
                <CsvDownloader data={rows} filename="ActivityLog" />
              </Stack>
            </Box>
          </AccordionDetails>

          <DataTable rows={rows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <div>
        <Dialog open={view} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
            View List
          </DialogTitle>
          <DialogContent>
            <Typography>Hey There</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={viewRejection} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
            View rejection List
          </DialogTitle>
          <DialogContent>
            <Typography>Hey There</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ActivityLog;
