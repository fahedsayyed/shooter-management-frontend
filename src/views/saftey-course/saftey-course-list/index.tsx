import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps, Tooltip, IconButton, Typography, Stack } from "@mui/material";
import Draggable from "react-draggable";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React, { useState } from "react";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import { ISafetyCourseEnrollmentList } from "src/types/SafetyCourse";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const SafetyCourseList = () => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  // const [copyRows, setCopyRows] = useState<any>();
  const [deleteId, setDeleteId] = useState<ISafetyCourseEnrollmentList | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 80 },
    { field: "shooterName", headerName: "Shooter Name", width: 130 },
    { field: "draClubRu", headerName: "DRA/RC/UNIT", width: 180 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit Safety Course">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Safety Course">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleDelete(params.row.id)}>
              <IconTrash size="22" stroke={1.4} />
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

  // useEffect(() => {setCopyRows(rows)},[]);

  const handleEdit: (id: ISafetyCourseEnrollmentList) => void = (id: ISafetyCourseEnrollmentList) => {
    console.log(id);
    navigate(`${APP_ROUTES.SAFETY_COURSE}/safety-course-list/${id}`);
  };

  const handleDelete: (id: ISafetyCourseEnrollmentList) => void = (id: ISafetyCourseEnrollmentList) => {
    setConfirmDelete(true);
    setDeleteId(id);
  };

  const handleConfirmDelete: () => void = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }

    setConfirmDelete(false);
  };

  const handleClose = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      <PageContainer title="Safety Course List" description="this is Safety Course List page">
        <BlankCard>
          <TableHead title="Safety Course List" />
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2} mr={2}>
            <CsvDownloader data={rows} filename="SafetyCourseEnrollementData" />
          </Stack>
          <DataTable rows={rows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <div>
        <Dialog open={confirmDelete} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
            {" "}
            Caution{" "}
          </DialogTitle>
          <DialogContent>
            {" "}
            <Typography>This action may delete your data</Typography>{" "}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" variant="outlined" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SafetyCourseList;
