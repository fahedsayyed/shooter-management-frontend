import React from "react";
import { useLocation } from "react-router";
import { Table, TableBody, TableRow, TableCell, TableContainer, Paper, Box, Stack, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function ViewAssociation() {
  const navigate = useNavigate();
  const location: any = useLocation();
  const { id, type_of_association, name_of_association, district, approval_level } = location.state.row;

  const cellStyle = {
    textAlign: "left",
    fontSize: "1rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
  };

  const tableContainerStyle = {
    border: "1px solid #ccc",
  };

  const handleBack = () => {
    navigate("/dra-club-ru-register");
  };

  return (
    <Box p={2} textAlign="left">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <TableContainer sx={tableContainerStyle}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} sx={{ fontSize: "1.5rem", borderBottom: "1px solid #ccc", alignItems: "center" }}>
                  <Box>
                    <Stack sx={{ background: "#ECF2FF", borderRadius: "6px" }} direction="row" justifyContent="space-between" alignItems="center" p={2}>
                      <Typography variant="h5">Association Details</Typography>
                      <Box>
                        <Button variant="outlined" color="primary" onClick={handleBack}>
                          Back
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="40%" sx={cellStyle}>
                  Association ID:
                </TableCell>
                <TableCell sx={cellStyle}>{id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Association Type:</TableCell>
                <TableCell sx={cellStyle}>{type_of_association}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Association Name:</TableCell>
                <TableCell sx={cellStyle}>{name_of_association}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>District:</TableCell>
                <TableCell sx={cellStyle}>{district}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Approval Level:</TableCell>
                <TableCell sx={cellStyle}>{approval_level}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ViewAssociation;
