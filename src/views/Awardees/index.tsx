import React, { useState } from "react";
import PageContainer from "../../components/page-container/PageContainer";
// import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router";
import { Box, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { IAwardees } from "src/types/Awardees";
// const BCrumb = [
//   {
//     to: '/user',
//     title: 'Home',
//   },
//   {
//     title: 'Awardees Page',
//   },
// ];

function Index() {
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<IAwardees | null>(null);
  console.log(associationToDelete);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No.", width: 100 },
    { field: "shooterID", headerName: "Shooter ID", width: 250 },
    { field: "shooterName", headerName: "Shooter Name", width: 250 },
    { field: "AwardType", headerName: "Award Type", width: 200 },

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
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleOpenAlert(params.row)}>
              <IconTrash size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IAwardees[] = [
    { id: 1, shooterID: "MHPF2701200301KL	", shooterName: "ANUSHKA PATIL	", AwardType: "INTERNATIONAL	" },
    { id: 2, shooterID: "MHPF2901200001AB", shooterName: "HARSHADA NITHAVE	", AwardType: "INTERNATIONAL	" },
    { id: 3, shooterID: "MHPF3010199001MC	", shooterName: "RAHI SARNOBAT	", AwardType: "ARJUNA" },
    { id: 4, shooterID: "MHPF3010199001MC	", shooterName: "NAVNATH FARTADE	", AwardType: "INTERNATIONAL" },
    { id: 5, shooterID: "MHPF3010199001MC	", shooterName: "RAVINDRA PATIL	", AwardType: "INTERNATIONAL" },
    { id: 6, shooterID: "MHPF3010199001MC	", shooterName: "SHIVRAJ SASE	", AwardType: "INTERNATIONAL" },
    { id: 7, shooterID: "MHPF3010199001MC	", shooterName: "VIKRANT GHAISAS	", AwardType: "INTERNATIONAL" },
    { id: 8, shooterID: "MHPF3010199001MC	", shooterName: "AKSHAY ASHTAPUTRE	", AwardType: "INTERNATIONAL" },
    { id: 9, shooterID: "MHPF3010199001MC	", shooterName: "ANJALI BHAGWAT	", AwardType: "INTERNATIONAL" },
  ];
  // const handleDelete: any = (id: any) => {
  //   console.log(id);
  // };
  const handleEdit = (id: IAwardees) => {
    console.log(id);
    navigate(`${APP_ROUTES.AWARDEES}/edit-awardee/${id}`);
  };

  const handleOpenAlert = (rows: IAwardees) => {
    setAssociationToDelete(rows);
    setAlertOpen(true);
    // navigate(`/dra-club-ru-register`, { state: { row: rows } });
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <PageContainer title="Awardees" description="this is Awardees page">
      {/* <Breadcrumb title="Awardees Page" items={BCrumb} /> */}
      <Box
        sx={{
          flexShrink: 0,
          border: "0",
          borderLeft: "1px",
          borderStyle: "solid",
          right: "0",
          background: (theme) => theme.palette.background.paper,
          boxShadow: "3",
          position: lgUp ? "relative" : "absolute",
          borderColor: (theme) => theme.palette.divider,
          marginTop: "35px",
        }}
      >
        <BlankCard>
          <TableHead title="Awardees" />
          <DataTable rows={rows} columns={columns} />
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
      </Box>
    </PageContainer>
  );
}

export default Index;
