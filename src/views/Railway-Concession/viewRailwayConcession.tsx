import React from "react";
import { useLocation } from "react-router";

import { Table, TableBody, TableRow, TableCell, TableContainer, Paper, Box, Typography, Stack } from "@mui/material";
import CsvDownloader from "src/components/csv-downloader";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import PageContainer from "src/components/page-container/PageContainer";
// import TableHead from 'src/components/table-head';

function ViewRailwayConcession() {
  const location: any = useLocation();
  const { shooterid, shootername, from, to, competition_type } = location.state.row;

  const cellStyle = {
    textAlign: "left",
    fontSize: "1rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
  };

  const tableContainerStyle = {
    border: "1px solid #ccc",
  };

  return (
    <>
      <BackLink title="Back to the Railway Concession Page" route={APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE} />
      <PageContainer>
        <Box p={0} textAlign="left">
          <Paper elevation={3} style={{ padding: "20px" }}>
            <TableContainer sx={tableContainerStyle}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontSize: "1.5rem", borderBottom: "1px solid #ccc", alignItems: "center" }}>
                      <Box>
                        <Stack sx={{ background: "#ECF2FF", borderRadius: "6px" }} direction="row" justifyContent="space-between" alignItems="center" p={2}>
                          <Typography variant="h5">View Railway Concession Certificate</Typography>
                          <Box>
                            <CsvDownloader data={location.state.row} filename="RailwayConcessionCertificate" />
                          </Box>
                        </Stack>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={cellStyle}>Shooter Id:</TableCell>
                    <TableCell sx={cellStyle}>{shooterid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={cellStyle}>Shooter Name:</TableCell>
                    <TableCell sx={cellStyle}>{shootername}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={cellStyle}>From:</TableCell>
                    <TableCell sx={cellStyle}>{from}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={cellStyle}>To:</TableCell>
                    <TableCell sx={cellStyle}>{to}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={cellStyle}>Competition Type:</TableCell>
                    <TableCell sx={cellStyle}>{competition_type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </PageContainer>
    </>
  );
}

export default ViewRailwayConcession;
