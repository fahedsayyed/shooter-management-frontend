import { useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Grid, Typography, Button } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router-dom";
import APP_ROUTES from "src/routes/routePaths";
import { Autocomplete } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { IShooterHistory } from "src/types/ShooterHistory";
import { ISelectShooterName } from "src/types/RailwayConcession";

const ShooterHistory: React.FC = () => {
  const navigate = useNavigate();

  const [shooterName, setShooterName] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "shooter_id", headerName: "Shooter Id", width: 200 },
    { field: "shooter_name", headerName: "Shooter Name", width: 250 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleSubmit(params.row)} style={{ width: "50px", height: "30px", fontSize: "12px" }}>
            Submit
          </Button>
        </>
      ),
    },
  ];

  const rows: IShooterHistory[] = [
    {
      id: 1,
      shooter_id: "12345",
      shooter_name: "Pablo Escobar",
      gender: "Male",
      dob: "01-01-1990",
      email: "pablo@email.com",
      phone: "999-999-999",
      state: "Rajasthan",
      address: "10-A, XYZ Road, Bikaner, Rajasthan",
      events: "10m Rifle Event",
      club_name: "Mumbai Shooting Club",
      shoe_size: "10",
      weight: "80 KG",
      track_suit_size: "40 Inches",
      trained_by: "Don Eladio",
      gold_medal: "1",
      silver_medal: "3",
      bronze_medal: "5",
    },
    {
      id: 2,
      shooter_id: "252525",
      shooter_name: "Tuco Salamanca",
      gender: "Male",
      dob: "01-01-1995",
      email: "tuco@email.com",
      phone: "555-555-555",
      state: "Bihar",
      address: "11-C, ABC Road, Patna, Bihar",
      events: "50m Rifle Event",
      club_name: "Pune Shooting Club",
      shoe_size: "8",
      weight: "60 KG",
      track_suit_size: "38 Inches",
      trained_by: "Don Eladio",
      gold_medal: "0",
      silver_medal: "5",
      bronze_medal: "7",
    },
    {
      id: 3,
      shooter_id: "78787878",
      shooter_name: "Walter White",
      gender: "Male",
      dob: "04-05-1985",
      email: "walter@email.com",
      phone: "777-777-777",
      state: "Goa",
      address: "17-H, Bagha Road, Panjim, Goa",
      events: "100m Rifle Event",
      club_name: "Goa Shooting Club",
      shoe_size: "9",
      weight: "70 KG",
      track_suit_size: "42 Inches",
      trained_by: "Mike",
      gold_medal: "5",
      silver_medal: "0",
      bronze_medal: "0",
    },
  ];

  const handleSubmit = (rows: IShooterHistory) => {
    navigate(`${APP_ROUTES.SHOOTERS_HISTORY}/view`, { state: { row: rows } });
  };

  const shooter_name: ISelectShooterName[] = [
    {
      value: "Pablo Escobar",
      label: "Pablo Escobar",
    },
    {
      value: "Tuco Salamanca",
      label: "Tuco Salamanca",
    },
    {
      value: "Walter White",
      label: "Walter White",
    },
  ];

  const filteredRows = rows.filter((row) => {
    if (shooterName !== "All" && row.shooter_name !== shooterName) {
      return false;
    }

    return true;
  });

  const tableOrMessage = shooterName ? (
    <DataTable rows={filteredRows} columns={columns} checkbox={false} />
  ) : (
    <Typography variant="body2" sx={{ padding: "20px" }}>
      {/* * No records found */}
    </Typography>
  );

  return (
    <>
      <PageContainer title="Shooter History" description="this is user page">
        <BlankCard>
          <TableHead title="Shooter History" />
          <Grid container spacing={3} justifyContent="left" alignItems="center" sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel sx={{ mt: 2 }} htmlFor="text-email">
                Search Shooter Name
              </CustomFormLabel>
              <Autocomplete
                id="shooter-name-autocomplete"
                options={shooter_name}
                getOptionLabel={(option) => option.label || ""}
                value={shooter_name.find((option) => option.value === shooterName) || null}
                onChange={(event, newValue) => setShooterName(newValue ? newValue.value : "")}
                renderInput={(params) => <CustomTextField {...params} name="shootername" fullWidth margin="normal" sx={{ mt: 0 }} />}
              />
            </Grid>
          </Grid>

          {tableOrMessage}
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default ShooterHistory;
