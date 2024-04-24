import { ChangeEvent, useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip, IconButton, Grid } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import { IconEye } from "@tabler/icons";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router-dom";
import { IRailwayConcession, ISelectCompetitionType } from "src/types/RailwayConcession";

const RailwayConcession: React.FC = () => {
  const navigate = useNavigate();
  const [competitionType, setCompetitionType] = useState<string>("All"); // Initialize with 'All'

  const [associationToDelete] = useState<IRailwayConcession | null>(null);

  console.log(associationToDelete);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "shooterid", headerName: "Shooter Id", width: 175 },
    { field: "shootername", headerName: "Shooter Name", width: 275 },
    { field: "from", headerName: "From", width: 150 },
    { field: "to", headerName: "To", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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

  const rows: IRailwayConcession[] = [
    {
      id: 1,
      shooterid: "ABC123",
      shootername: "Tom Cruise Ethan Hunt",
      from: "Thane",
      to: "Mumbai CSMT",
      competition_type: "Air Gun Competition",
    },
    {
      id: 2,
      shooterid: "XYZ123",
      shootername: "Mike Tyson",
      from: "Pune",
      to: "Nashik",
      competition_type: "Shot Gun Competition",
    },
    {
      id: 3,
      shooterid: "MNO567",
      shootername: "Pablo Emilio Escobar Gaviria",
      from: "Delhi",
      to: "Chandigarh",
      competition_type: "Rifle Gun Competition",
    },
    {
      id: 4,
      shooterid: "AB987",
      shootername: "Lionel Messi",
      from: "Chennai",
      to: "Banglore",
      competition_type: "Air Gun Competition",
    },
    {
      id: 5,
      shooterid: "RTK456",
      shootername: "John Snow King",
      from: "Howrah",
      to: "Delhi",
      competition_type: "Rifle Gun Competition",
    },
  ];

  const handleView = (row: IRailwayConcession) => {
    navigate("/railway-concession-certificate/view", { state: { row } });
  };

  const competition_type: ISelectCompetitionType[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Air Gun Competition",
      label: "Air Gun Competition",
    },
    {
      value: "Shot Gun Competition",
      label: "Shot Gun Competition",
    },
    {
      value: "Rifle Gun Competition",
      label: "Rifle Gun Competition",
    },
  ];

  const filteredRows = rows.filter((row) => {
    if (competitionType !== "All" && row.competition_type !== competitionType) {
      return false;
    }

    return true;
  });

  return (
    <>
      <PageContainer title="Railway Concession List" description="this is Railway Concession page">
        <BlankCard>
          <TableHead title="Railway Concession List" />
          <Grid container spacing={3} justifyContent="left" alignItems="left" sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Select Competition"
                name="competition_type"
                value={competitionType}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCompetitionType(e.target.value)}
                fullWidth
                margin="normal"
              >
                {competition_type.map((option) => (
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
export default RailwayConcession;
