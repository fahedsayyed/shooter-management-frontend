import React, { useEffect } from "react";
import { Paper, TableContainer, Grid, Stack } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import Chip from "@mui/material/Chip";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useSelector } from "react-redux";

const Paymentmaster = () => {
  const rows = useSelector((state: any) => state.tenent.stateRows);
  console.log(rows, "rowssss at get");

  useEffect(() => {
    // const highestId = rows.reduce((maxId:any, row:any) => {
    //     return Math.max(maxId, row.id);
    //   }, 0);
    //   console.log('Highest ID:', highestId);
  }, []);

  // const navigate = useNavigate()
  const stateColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "payment_module", headerName: "Module Name", flex: 1 },
    {
      field: "status",
      headerName: "status",
      width: 100,
      flex: 1,
      renderCell: (params: any) => (
        <>
          {
            <Stack direction="row" spacing={1}>
              <Chip label={params.row.status === true ? "Active" : "Inactive"} color={params.row.status === true ? "primary" : "success"} />
            </Stack>
          }
        </>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      flex: 1,
      renderCell: () => (
        <Grid sx={{ display: "flex", gap: "10px" }}>
          <Chip label="view" onClick={handleClick} onDelete={handleDelete} deleteIcon={<RemoveRedEyeTwoToneIcon />} />
          <Chip label="edit" onClick={handleClick} onDelete={handleDelete} deleteIcon={<EditTwoToneIcon />} />
        </Grid>
      ),
    },
  ];
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <PageContainer title="master page" description="this is user page">
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
          <TableHead title="Module Master" />

          <TableContainer>
            <DataTable rows={rows} columns={stateColumns} />
          </TableContainer>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default Paymentmaster;
