import React, { useState } from "react";
import { Paper, TableContainer, MenuItem, Grid, Tooltip, IconButton } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { IconEye } from "@tabler/icons";
import CsvDownloader from "src/components/csv-downloader";
import { IRecords } from "src/types/Records";
// import { useNavigate } from 'react-router';

const ShowRecords = () => {
  const [listType, setListType] = useState("All");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "EventName", headerName: "Event Name", width: 250 },
    { field: "CompetitionName", headerName: "Competition Name", width: 250 },
    { field: "ShooterName", headerName: "Shooter Name", width: 150 },
    { field: "score", headerName: "Score", width: 50 },
    { field: "role", headerName: "Score Type", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 70,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleView(params.row.id)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IRecords[] = [
    {
      id: 1,
      EventName: "M-2 - Clay Pigeon Trap Shooting (NR) Championship Services only (Individual)	",
      CompetitionName: "Maharashtra Air and Firearms Competition Shotgun NR- Sep.-2021 /1	",
      ShooterName: "ALIRAZA SAYYED(MHRM0208197701RG)	",
      score: 12.0,
      role: "Club Admin	",
    },
    {
      id: 2,
      EventName: "M-16 - Clay Pigeon Double Trap Shooting Championship for MQS		",
      CompetitionName: "Maharashtra Air and Firearms Competition [SHOTGUN] NR/ISSF – March 2023 /1	",
      ShooterName: "AASAWARI CHAVAN(MHRF0104200101TH)	",
      score: 12.0,
      role: "Unit Admin	",
    },
    {
      id: 3,
      EventName: "M-16 - Clay Pigeon Double Trap Shooting Championship for MQS	",
      CompetitionName: "Maharashtra Air and Firearms Competition Shotgun NR- Sep.-2021 /1	",
      ShooterName: "AASAWARI CHAVAN(MHRF0104200101TH)	",
      score: 12.0,
      role: "Club Admin	",
    },
    {
      id: 4,
      EventName: "THANE DISTRICT RIFLE ASSOCIATION		",
      CompetitionName: "Maharashtra Air and Firearms Competition Shotgun NR- Sep.-2021 /1,",
      ShooterName: "AASAWARI CHAVAN(MHRF0104200101TH)	",
      score: 12.0,
      role: "Unit Admin	",
    },
    {
      id: 5,
      EventName: "M-26 - Clay Pigeon Double Trap Shooting (Zero Shooter)	",
      CompetitionName: "Maharashtra Air and Firearms Competition Shotgun NR- Sep.-2021 /1",
      ShooterName: "AADESH DEOKAR (28-10-2007)	",
      score: 12.0,
      role: "Club Admin	",
    },
  ];

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setListType(e.target.value);
  };
  const handleView = (id: IRecords) => {
    console.log(id);
  };

  return (
    <PageContainer title="Records" description="this is Records page">
      {/* <Breadcrumb title="user page" items={BCrumb} /> */}
      <Paper
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
          <TableHead title="Event List" />
          <Grid container>
            <Grid item xs={6} md={10} lg={10}>
              <CustomSelect
                sx={{ width: "45%", margin: "20px" }}
                className="custom-select"
                id="tenent-type"
                variant="outlined"
                name="tenentType"
                value={listType}
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="state">State</MenuItem>
                <MenuItem value="club">Club</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item sx={{ mt: 3 }}>
              <CsvDownloader data={rows} filename="records" buttonTitle="Generate PDF" />
            </Grid>
          </Grid>
          <TableContainer>
            <DataTable rows={rows} columns={columns} />
          </TableContainer>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default ShowRecords;
