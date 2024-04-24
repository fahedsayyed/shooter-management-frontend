import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Tooltip, Button, Box, Stack, Grid } from "@mui/material";

import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import APP_ROUTES from "src/routes/routePaths";
import { Link } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import WarningImage from "../../assets/images/backgrounds/warning.png";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";

interface IRequestShooterCertificate {
  id: number;
  lastName: string;
  firstName: string;
  status: string;
  role: string;
}

const RequestShooterCertificateList = () => {
  // const [view, setView] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  //   const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file, "file");
    // setSelectedFile(file);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", flex: 1 },
    { field: "firstName", headerName: "Shooter Id", flex: 1 },
    { field: "lastName", headerName: "Shooter Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="file Upload">
            <>
              <label htmlFor="fileInput">
                <FileUploadOutlinedIcon />
              </label>
              <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleFileInputChange} />
            </>
          </Tooltip>
          <Tooltip title="courrier">
            <Button sx={{ cursor: "pointer" }} color="primary" variant="outlined" onClick={() => handleOpenAlert(params.row.id)}>
              Courrier
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IRequestShooterCertificate[] = [
    { id: 1, lastName: "Snow", firstName: "Jon", status: "Recomended By Unit", role: "software developer" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", status: "Recomended By Club", role: "software developer" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", status: "Recomended By Unit", role: "software developer" },
    { id: 4, lastName: "Stark", firstName: "Arya", status: "Recomended By Unit", role: "software developer" },
  ];

  const handleOpenAlert = (row: IRequestShooterCertificate) => {
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
      <PageContainer title="Request Shooter Certificate List" description="this is Request Shooter Certificate List page">
        <BlankCard>
          <TableHead title="Request Shooter Certificate List" />

          <Box textAlign="left" p={2}>
            <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
              <CsvDownloader data={rows} filename="ShooterIdCard" />
            </Stack>
          </Box>

          <DataTable rows={rows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <AlertBox
        open={alertOpen}
        disabled={false}
        title="Kindly upload courier receipt"
        buttonText="confirm"
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

export default RequestShooterCertificateList;
