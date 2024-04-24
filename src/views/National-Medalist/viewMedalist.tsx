import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import { IconEye } from "@tabler/icons";

function ViewMedalist() {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState(""); 
  const { shooterid, shootername, competitionname, medalisttype, status, competition_category, match, name_mscc_nscc, year, medal_type } = location.state.row;

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
    navigate("/national-medalists");
  };

  const handleViewCertificate = () => {
    // Open the modal
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  const handleOpenApproveModal = () => {
    setApproveModalOpen(true);
  };

  const handleCloseApproveModal = () => {
    setApproveModalOpen(false);
  };

  const handleApprove = () => {
  
    handleCloseApproveModal();
  };

  const handleOpenRejectModal = () => {
    setRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setRejectModalOpen(false);
    setRejectReason(""); 
    setRejectReasonError(""); 
  };

  const handleReject = () => {
    
    if (rejectReason.trim() === "") {
      setRejectReasonError("Please provide a reason for rejecting.");
     
      return;
    }

    handleCloseRejectModal();
  };

  return (
    <Box p={2} textAlign="left">
      <Paper elevation={3} style={{ padding: "0px" }}>
        <TableContainer sx={tableContainerStyle}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} sx={{ fontSize: "1.5rem", borderBottom: "1px solid #ccc", alignItems: "center" }}>
                  <Box>
                    <Stack sx={{ background: "#ECF2FF", borderRadius: "0px" }} direction="row" justifyContent="space-between" alignItems="center" p={2}>
                      <Typography variant="h5">Medalist Profile</Typography>
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
                  <strong>Shooter ID:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{shooterid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Shooter Name:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{shootername}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Competition Name:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{competitionname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Medalist Type:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{medalisttype}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Status:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Competition Category:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{competition_category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Match:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{match}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Name/MSCC/NSCC:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{name_mscc_nscc}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Year:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>Medal Type:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>{medal_type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={cellStyle}>
                  <strong>View Certificate:</strong>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Tooltip title="View">
                    <IconButton sx={{ cursor: "pointer" }} onClick={handleViewCertificate}>
                      <IconEye size="22" stroke={1.4} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

              <Box mt={1} mb={1} ml={1}>
                <Stack direction="row" spacing={1}>
                  <Button color="success" variant="contained" onClick={handleOpenApproveModal}>
                    Approve
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleOpenRejectModal}>
                    Reject
                  </Button>
                </Stack>
              </Box>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Approve Confirmation Modal */}
        <Dialog open={isApproveModalOpen} onClose={handleCloseApproveModal}>
          <DialogTitle>Confirm Approval</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to approve this medalist?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseApproveModal} color="error">
              No
            </Button>
            <Button onClick={handleApprove} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reject Reason Modal */}
        <Dialog open={isRejectModalOpen} onClose={handleCloseRejectModal}>
          <DialogTitle>Enter Reject Reason</DialogTitle>
          <DialogContent>
            <DialogContentText>Please provide a reason for rejecting:</DialogContentText>
            <TextField
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                setRejectReasonError(""); // Clear the reject reason error on input change
              }}
              error={Boolean(rejectReasonError)}
              helperText={rejectReasonError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRejectModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleReject} color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal for displaying certificate */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{
            width: "90%", // Increase the width of the modal
            height: "90%", // Increase the height of the modal
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem" }}>**Certificate**</DialogTitle>
          <DialogContent>
            {/* Add content specific to the certificate inside the modal */}
            <Typography variant="body1" sx={{ fontSize: "1.2rem", padding: "50px" }}>
              <p>
                Congratulations, <strong>{shootername}</strong>!
              </p>
              <p>
                {" "}
                You have successfully achieved the <strong>{medal_type}</strong> medal in the <strong>{competitionname}</strong> competition held in <strong>{year}</strong>.
              </p>
              <br></br>
              <p>Signed by:</p>
              <p>Date of Issue:</p>
            </Typography>
            {/* You can add more content here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default ViewMedalist;
