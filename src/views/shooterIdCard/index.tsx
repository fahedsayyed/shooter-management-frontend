import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Tooltip, Box, Stack, Grid } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import APP_ROUTES from "src/routes/routePaths";
import { Link } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import WarningImage from "../../assets/images/backgrounds/warning.png";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { IShooterIdCard } from "src/types/ShooterIdCard";

// function PaperComponent(props: PaperProps) {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }

const ShooterIdCard = () => {
  // const [view, setView] = React.useState(false);
  // const [viewRejection, setViewRejection] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 140 },
    { field: "shooterId", headerName: "Shooter Id", width: 160 },
    { field: "shooterName", headerName: "Shooter Name", width: 160 },
    { field: "status", headerName: "Status", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Tooltip title="courrier">
            <Button sx={{ cursor: "pointer" }} color="primary" variant="outlined" onClick={() => handleOpenAlert(params.row.id)}>
              Courrier
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IShooterIdCard[] = [
    { id: 1, shooterId: "Snow", shooterName: "Jon", status: "Recomended By Unit" },
    { id: 2, shooterId: "Lannister", shooterName: "Cersei", status: "Recomended By Club" },
    { id: 3, shooterId: "Lannister", shooterName: "Jaime", status: "Recomended By Unit" },
    { id: 4, shooterId: "Stark", shooterName: "Arya", status: "Recomended By Unit" },
  ];

  // const handleClose = () => {
  //   setView(false);
  //   setViewRejection(false)
  // };

  const handleOpenAlert = (row: IShooterIdCard) => {
    setAlertOpen(true);
    console.log(row, "row");
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.STATE_ADMIN_DASHBOARD}`}>
        {" "}
        <IconArrowNarrowLeft stroke={1.6} /> Back to the Home
      </Link>
      <PageContainer title="Shooter Id Card" description="this is Shooter Id Card page">
        <BlankCard>
          <TableHead title="Request Shooter Id Card List" />

          <Box textAlign="left" p={1}>
            <Stack direction="row" spacing={1} justifyContent={"flex-end"} padding={"10px"}>
              <CsvDownloader data={rows} filename="ShooterIdCard" />
            </Stack>
          </Box>

          <DataTable rows={rows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <AlertBox
        open={alertOpen}
        title="Are you sure, you want to change status to COLLECT?"
        disabled={false}
        buttonText="collect"
        message={
          <Grid>
            <img src={WarningImage} alt="Your Image" width="500" height="300" />
          </Grid>
        }
        onClose={handleCloseAlert}
        onConfirm={handleConfirmAction}
      />
    </>
  );
};

export default ShooterIdCard;
