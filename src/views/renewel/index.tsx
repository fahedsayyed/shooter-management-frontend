import { useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";

import { GridColDef } from "@mui/x-data-grid";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";

import MenuItem from "@mui/material/MenuItem";

import { Tooltip, IconButton, Grid, Button } from "@mui/material";

import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
// import APP_ROUTES from 'src/routes/routePaths';
// import { Link } from 'react-router-dom';
import { IconEye } from "@tabler/icons";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import { IRenewal, ISelectStatus } from "src/types/Renewal";

const Renewal = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "shooterid", headerName: "Shooter Id", width: 150 },
    { field: "shootername", headerName: "Shooter Name", width: 150 },
    { field: "DRARCUNITMRA", headerName: "DRA/RC/UNIT/MRA", width: 150 },
    { field: "renewalType", headerName: "Renewal Type", width: 150 },
    { field: "status", headerName: "Status", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,
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

  const rows: IRenewal[] = [
    {
      id: 1,
      shooterid: "ABC-123",
      shootername: "Jon",
      DRARCUNITMRA: "Gagan Narang Trophy",
      renewalType: "National",
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
      DRARCUNITMRA: "Sniper Rifle Championship",
      renewalType: "State",
      status: "Approved",
    },
    {
      id: 3,
      shooterid: "MN-100",
      shootername: "Thomas",
      DRARCUNITMRA: "HandGun Championship",
      renewalType: "National",
      status: "Approved",
    },
    {
      id: 4,
      shooterid: "LTI-200",
      shootername: "Eduardo",
      DRARCUNITMRA: "Revolver Championship",
      renewalType: "National",
      status: "Pending",
    },
    {
      id: 5,
      shooterid: "PX-500",
      shootername: "Pablo",
      DRARCUNITMRA: "Shotgun Championship",
      renewalType: "State",
      status: "Approved",
    },
    {
      id: 6,
      shooterid: "kX-600",
      shootername: "Gustavo",
      DRARCUNITMRA: "Air Gun Championship",
      renewalType: "National",
      status: "Approved",
    },
    {
      id: 7,
      shooterid: "SA-600",
      shootername: "Hiesenberg",
      DRARCUNITMRA: "Shot Gun Championship",
      renewalType: "State",
      status: "Pending",
    },
  ];

  const handleView = (id: IRenewal) => {
    navigate(`${APP_ROUTES.RENEWAL}/view/${id}`);
  };

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
    if (selectedStatus !== "All" && row.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  return (
    <>
      <PageContainer title="Renewal" description="this is user page">
        <BlankCard>
          <TableHead title="Renewal List" />
          <Grid item sx={{ display: "flex", gap: "10px", justifyContent: "flex-end", padding: "15px", alignItems: "center" }}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="standard-select-currency">Status</CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  className="custom-select"
                  value={selectedStatus}
                  onChange={(e: any) => setSelectedStatus(e.target.value)}
                  fullWidth
                  variant="outlined"
                  style={{ width: "75%" }}
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", height: "50%", justifyContent: "center", gap: "10px" }}>
              <Button color="success" variant="outlined">
                Submit
              </Button>
              <Button variant="outlined" color="error">
                Reset
              </Button>
            </Grid>
          </Grid>
          <DataTable rows={filteredRows} columns={columns} />
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default Renewal;
