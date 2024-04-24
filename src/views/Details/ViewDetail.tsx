import React from "react";
import { useLocation } from "react-router";
import { Table, TableBody, TableRow, TableCell, TableContainer, Paper, Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ViewDetail() {
  const navigate = useNavigate();
  const location: any = useLocation();
  const { id, event_group, lane, reserved_lane, defective_lane, preparation_time, event_time, changeover_time, competition_name, start_date, end_date } = location.state.row;

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
    navigate("/details");
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
                      <Typography variant="h5">View Details</Typography>
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
                  Detail ID:
                </TableCell>
                <TableCell sx={cellStyle}>{id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Competition Name:</TableCell>
                <TableCell sx={cellStyle}>{competition_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Event Group Name:</TableCell>
                <TableCell sx={cellStyle}>{event_group}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Lane:</TableCell>
                <TableCell sx={cellStyle}>{lane}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Reserved Lane:</TableCell>
                <TableCell sx={cellStyle}>{reserved_lane}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Defective Lane:</TableCell>
                <TableCell sx={cellStyle}>{defective_lane}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Preparation Time:</TableCell>
                <TableCell sx={cellStyle}>{preparation_time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Event Time:</TableCell>
                <TableCell sx={cellStyle}>{event_time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>Changeover Time:</TableCell>
                <TableCell sx={cellStyle}>{changeover_time}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={cellStyle}>Start Date:</TableCell>
                <TableCell sx={cellStyle}>{start_date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>End Date:</TableCell>
                <TableCell sx={cellStyle}>{end_date}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ViewDetail;
