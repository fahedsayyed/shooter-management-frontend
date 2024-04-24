import { useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip, IconButton, Grid } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CsvDownloader from "src/components/csv-downloader";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { IClub, ISelectAssociationType } from "src/types/DraClubRu";
import TableHead from "src/components/table-head";

const DRA_Club_RU: React.FC = () => {
  const navigate = useNavigate();

  const [associationType, setAssociationType] = useState<string>("All");

  const [associationToDelete, setAssociationToDelete] = useState<IClub | null>(null);
  console.log(associationToDelete);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "type_of_association", headerName: "Type of Association", width: 250 },
    { field: "name_of_association", headerName: "Name of Association", width: 300 },
    { field: "district", headerName: "District", width: 200 },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
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

  const rows: IClub[] = [
    {
      id: 1,
      type_of_association: "DRA",
      name_of_association: "Thane Rifle Association",
      district: "Thane",
      approval_level: "Final",
    },
    {
      id: 2,
      type_of_association: "CLUB",
      name_of_association: "TVF Rifle CLUB",
      district: "Pune",
      approval_level: "Final",
    },
    {
      id: 3,
      type_of_association: "RU",
      name_of_association: "MRF Rifle Unit",
      district: "Mumbai",
      approval_level: "Final",
    },
    {
      id: 4,
      type_of_association: "DRA",
      name_of_association: "Nagpur Rifle Association",
      district: "Nagpur",
      approval_level: "Final",
    },
    {
      id: 5,
      type_of_association: "CLUB",
      name_of_association: "NPM Rifle Club",
      district: "Nashik",
      approval_level: "Final",
    },
    {
      id: 6,
      type_of_association: "DRA",
      name_of_association: "Raigad Rifle Association",
      district: "Raigad",
      approval_level: "Final",
    },
    {
      id: 7,
      type_of_association: "CLUB",
      name_of_association: "RPF Rifle Club",
      district: "Raigad",
      approval_level: "Final",
    },
  ];

  const handleEdit = (rows: IClub) => {
    // Navigate to the edit page with the association ID as a URL parameter
    navigate(`/dra-club-ru-register/edit`, { state: { row: rows } });
  };

  const association_type: ISelectAssociationType[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "DRA",
      label: "DRA",
    },
    {
      value: "CLUB",
      label: "CLUB",
    },
    {
      value: "RU",
      label: "RU",
    },
  ];

  const filteredRows = rows.filter((row) => {
    if (associationType !== "All" && row.type_of_association !== associationType) {
      return false;
    }

    return true;
  });

  const handleOpenAlert = (rows: IClub) => {
    setAssociationToDelete(rows);
    setAlertOpen(true);
    navigate(`/dra-club-ru-register`, { state: { rows } });
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <>
      <PageContainer title="DRA/CLUB/RU" description="this is DRA/CLUB/RU page">
        <BlankCard>
          <TableHead title="CLUB / DRA / RU List" />
          <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Type of Association"
                name="type_of_association"
                value={associationType}
                onChange={(e: React.ChangeEvent<{ value: string }>) => setAssociationType(e.target.value)}
                fullWidth
                margin="normal"
              >
                {association_type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} alignSelf="center" justifySelf="center" lg={6}>
              <Box textAlign="right">
                <CsvDownloader data={rows} filename="DRA_CLUB_RU" />
              </Box>
            </Grid>
          </Grid>

          <DataTable rows={filteredRows} columns={columns} checkbox={false} />
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
export default DRA_Club_RU;
