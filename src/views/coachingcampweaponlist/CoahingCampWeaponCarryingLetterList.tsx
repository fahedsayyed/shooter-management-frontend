import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";

import MenuItem from "@mui/material/MenuItem";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React, { useState } from "react";

import { ICoachingCampWeaponCarry } from "src/types/CoachingCampsWeaponCarryLetter";
import { IconEye } from "@tabler/icons-react";
import CustomTextField from "src/utils/theme-elements/CustomTextField";

const CoahingCampWeaponCarry: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectReasonError, setRejectReasonError] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr.No", width: 70 },
    { field: "shooterid", headerName: "Shooter Id", width: 200 },
    { field: "shootername", headerName: "Shooter Name", width: 200 },
    { field: "clubunit", headerName: "Club/Unit", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: () => (
        <>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const rows: ICoachingCampWeaponCarry[] = [
    {
      id: 1,
      shooterid: "ABC-123",
      shootername: "Jon",
      clubunit: "Gagan Narang Trophy",
      status: "Pending",
      action: "view",
    },
  ];

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
    <>
      <PageContainer title="Coaching Camp Weapon Carrying Letter List" description="this is weapon page">
        <BlankCard>
          <TableHead title="Coahing Camp Weapon Carrying letter List" />
          <Grid sx={{ padding: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }} container>
            <CustomTextField
              select
              id="medalistType"
              name="medalistType"
              className="custom-select"
              label="Select Coaching Camp"
              // value={"Select Coaching Camp"}
              // onChange={(e: any) => setSelectedMedalistType(e.target.value)}
              fullWidth
              variant="outlined"
              style={{ width: "45%" }}
            >
              <MenuItem value="Select Coaching Camp">Select Coaching Camp</MenuItem>
              <MenuItem value="Synergy Coaching Camp">Synergy Coaching Camp</MenuItem>
              <MenuItem value="Pablo Coaching Camp">Pablo Coaching Camp</MenuItem>
              <MenuItem value="Gagan Coaching Camp">Gagan Coaching Camp</MenuItem>
            </CustomTextField>
            <Grid item sx={{ display: "flex", gap: "10px" }}>
              <Button color="success" variant="outlined" onClick={handleOpenApproveModal}>
                Approve
              </Button>
              <Button variant="outlined" color="error" onClick={handleOpenRejectModal}>
                Reject
              </Button>
            </Grid>
          </Grid>
          <DataTable rows={rows} columns={columns} />
        </BlankCard>

        {/* Approve Confirmation Modal */}
        <Dialog open={isApproveModalOpen} onClose={handleCloseApproveModal}>
          <DialogTitle>Confirm Approval</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to approve this?</DialogContentText>
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
              rows={1}
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
        ></Dialog>
      </PageContainer>
    </>
  );
};
export default CoahingCampWeaponCarry;
