import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps, Tooltip, IconButton, Typography, Stack } from "@mui/material";
import Draggable from "react-draggable";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import { IconEye, IconFileDescription } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import { ISafetyCourseEnrollmentList } from "src/types/SafetyCourse";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const SafetyCourseEnrollementList = () => {
  const [view, setView] = React.useState(false);
  const [viewRejection, setViewRejection] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 80 },
    { field: "shooterName", headerName: "Shooter Name", width: 130 },
    { field: "draClubRu", headerName: "DRA/RC/UNIT", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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

  const rows: ISafetyCourseEnrollmentList[] = [
    { id: 1, shooterName: "Snow", draClubRu: "Jon", status: "Recomended By Unit", email: "software developer" },
    { id: 2, shooterName: "Lannister", draClubRu: "Cersei", status: "Recomended By Club", email: "software developer" },
    { id: 3, shooterName: "Lannister", draClubRu: "Jaime", status: "Recomended By Unit", email: "software developer" },
    { id: 4, shooterName: "Stark", draClubRu: "Arya", status: "Recomended By Unit", email: "software developer" },
  ];

  const handleView = (id: ISafetyCourseEnrollmentList) => {
    console.log(id);
    setView(true);
  };
  const handleViewRejection = (id: ISafetyCourseEnrollmentList) => {
    console.log(id);
    setViewRejection(true);
  };

  const handleClose = () => {
    setView(false);
    setViewRejection(false);
  };

  return (
    <>
      <PageContainer title="Safety Course Enrollment List" description="this is Safety Course Enrollment List page">
        <BlankCard>
          <TableHead title="Safety Course Enrollement List" />
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2} mr={2}>
            <CsvDownloader data={rows} filename="SafetyCourseEnrollementData" />
          </Stack>
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

export default SafetyCourseEnrollementList;
