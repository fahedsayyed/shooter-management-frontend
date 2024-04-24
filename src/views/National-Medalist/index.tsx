// National Medalist // index.tsx

import { useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip, IconButton, Grid } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import APP_ROUTES from "src/routes/routePaths";
import { useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { Box, Stack } from "@mui/material";
import CsvDownloader from "src/components/csv-downloader";
import { INationalMedalist, ISelectMedalistType, ISelectStatus } from "src/types/NationalMedalist";

const NationalMedalist: React.FC = () => {
  const navigate = useNavigate();

  const [selectedMedalistType, setSelectedMedalistType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 70 },
    { field: "shooterid", headerName: "Shooter Id", width: 140 },
    { field: "shootername", headerName: "Shooter Name", width: 180 },
    { field: "competitionname", headerName: "Competition Name", width: 200 },
    { field: "medalisttype", headerName: "Medalist Type", width: 150 },
    { field: "status", headerName: "Status", width: 100 },

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
        </>
      ),
    },
  ];

  const rows: INationalMedalist[] = [
    {
      id: 1,
      shooterid: "ABC-123",
      shootername: "Jon",
      competitionname: "Gagan Narang Trophy",
      medalisttype: "National",
      status: "Pending",
      competition_category: "Category1",
      name_mscc_nscc: "name of mscc",
      match: "Shotgun champ",
      year: "2022",
      score: "9.6",
      medal_type: "Gold",
      view_certificate: "Certificate",
    },
    {
      id: 2,
      shooterid: "XYZ-007",
      shootername: "Mike",
      competitionname: "Sniper Rifle Championship",
      medalisttype: "State",
      status: "Approved",
    },
    {
      id: 3,
      shooterid: "MN-100",
      shootername: "Thomas",
      competitionname: "HandGun Championship",
      medalisttype: "National",
      status: "Approved",
    },
    {
      id: 4,
      shooterid: "LTI-200",
      shootername: "Eduardo",
      competitionname: "Revolver Championship",
      medalisttype: "National",
      status: "Pending",
    },
    {
      id: 5,
      shooterid: "PX-500",
      shootername: "Pablo",
      competitionname: "Shotgun Championship",
      medalisttype: "State",
      status: "Approved",
    },
    {
      id: 6,
      shooterid: "kX-600",
      shootername: "Gustavo",
      competitionname: "Air Gun Championship",
      medalisttype: "National",
      status: "Approved",
    },
    {
      id: 7,
      shooterid: "SA-600",
      shootername: "Hiesenberg",
      competitionname: "Shot Gun Championship",
      medalisttype: "State",
      status: "Pending",
    },
  ];

  const handleView = (row: INationalMedalist) => {
    console.log("data: ", row);
    navigate(`${APP_ROUTES.NATIONAL_MEDALISTS}/view`, { state: { row } });
  };

  const medalist_type: ISelectMedalistType[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "National",
      label: "National",
    },
    {
      value: "State",
      label: "State",
    },
  ];

  const status: ISelectStatus[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Approved",
      label: "Approved",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Rejected",
      label: "Rejected",
    },
  ];

  const filteredRows = rows.filter((row) => {
    if (selectedMedalistType !== "All" && row.medalisttype !== selectedMedalistType) {
      return false;
    }
    if (selectedStatus !== "All" && row.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  return (
    <>
      {/* <BackLink title="kjhsbdjsh" route={`${APP_ROUTES.NATIONAL_MEDALISTS}`} /> */}

      <PageContainer title="National Medalist" description="this is National Medalist page">
        <BlankCard>
          <Box>
            <Stack sx={{ background: "#ECF2FF", borderRadius: "6px" }} direction="row" justifyContent="space-between" alignItems="center" p={2}>
              <TableHead title="National Medalists List" />
              <CsvDownloader data={rows} filename="NationalMedalist" />
            </Stack>
          </Box>

          <Grid container spacing={3} sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Medalist Type"
                name="medalisttype"
                value={selectedMedalistType}
                onChange={(e: React.ChangeEvent<{ value: string }>) => setSelectedMedalistType(e.target.value)}
                fullWidth
                margin="normal"
              >
                {medalist_type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Status"
                name="status"
                value={selectedStatus}
                onChange={(e: React.ChangeEvent<{ value: string }>) => setSelectedStatus(e.target.value)}
                fullWidth
                margin="normal"
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>

          <DataTable rows={filteredRows} columns={columns} checkbox={false} />
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default NationalMedalist;
