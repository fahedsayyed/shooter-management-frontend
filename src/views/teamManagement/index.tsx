import React, { useState, useRef } from "react";
import { Paper, useMediaQuery, Button, Grid, Tooltip, IconButton, TableContainer } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import DataTable from "../../components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import ModalContent from "./ModalContent";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { ITeamManagement } from "src/types/TeamManagement";

const TeamManagement: React.FC = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [approveRejectModal, setApproveRejectModal] = useState(false);
  const [actionType, setActionType] = useState<string>("");

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "competitionName", headerName: "Competition Name", width: 280 },
    { field: "eventName", headerName: "Event Name", width: 100 },
    { field: "representation", headerName: "State/Unit Representation", width: 150 },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 70,
      renderCell: (params: any) => (
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

  const rows: ITeamManagement[] = [
    { id: 1, competitionName: "YOUTH RIFLE CLUB", representation: "Snow", eventName: "Jon", paymentStatus: "Pending", status: "Club Admin" },
    { id: 2, competitionName: "YASHWANT KESHAV PATIL COLLEGE OF COMMERCE", representation: "Lannister", eventName: "Cersei", paymentStatus: "Done", status: "Unit Admin" },
    { id: 3, competitionName: "X-L TARGET SHOOTERS ASSOCIATION", eventName: "Jaime", representation: "Lannister", paymentStatus: "Done", status: "Club Admin" },
    { id: 4, competitionName: "THANE DISTRICT RIFLE ASSOCIATION", eventName: "Arya", representation: "Lannister", paymentStatus: "pending", status: "Unit Admin" },
    { id: 5, competitionName: "WINNER’S SHOOTING CLUB", eventName: "Daenerys", representation: "Lannister", paymentStatus: "Pending", status: "Club Admin" },
    {
      id: 6,
      competitionName: "VIDYA DAYANAD PATIL COLLEGE OF ARTS MB ESTATE- VIRAR",
      eventName: "Lannister",
      representation: "Targaryen",
      paymentStatus: "Pending",
      status: "Unit Admin",
    },
    { id: 7, competitionName: "UNIQUE SHOOTING SPORTS CLUB", representation: "Ferrara", eventName: "Lannister", paymentStatus: "Done", status: "Club Admin" },
    { id: 8, competitionName: "TIRGGERS RIFLE & PISTOL SHOOTING ACADEMY", eventName: "Lannister", representation: "Rossini", paymentStatus: "Done", status: "Unit Admin" },
    {
      id: 9,
      competitionName: "THE KOLHAPUR DISTRICT MEN & WOMEN RIFLE ASSOCIATION",
      representation: "Harvey",
      eventName: "Lannister",
      paymentStatus: "Pending",
      status: "Club Admin",
    },
  ];

  const modalRef: any = useRef(null);

  const handleView = (id: number) => {
    console.log(id);
    handleOpenAlert();
  };

  const handleOpenAlertForapproveReject = (type: string) => {
    setApproveRejectModal(true);
    setActionType(type);
  };

  const handleCloseAlertForapproveReject = () => {
    setApproveRejectModal(false);
    setActionType("");
  };

  const handleConfirmActionForapproveReject = () => {
    if (actionType === "approve") {
      approveConfirmationActionForapprove();
    } else if (actionType === "reject") {
      rejectConfirmationActionForReject();
    }

    handleCloseAlert();
  };

  const approveConfirmationActionForapprove = () => {
    console.log("Approved");
  };

  const rejectConfirmationActionForReject = () => {
    console.log("Rejected");
  };

  const handleOpenAlert = () => {
    setAlertOpen(true);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera

    // Optionally, you can also scroll the modal into view if needed
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <PageContainer title="Team Management" description="This is Team Management page">
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
          <TableHead title="MANAGE TEAM" />
          <TableContainer>
            <Grid sx={{ display: "flex", justifyContent: "end", marginRight: "30px", marginTop: "10px", gap: "10px" }}>
              <Button variant="outlined" sx={{ background: "#fff" }} onClick={handleOpenAlert}>
                Add Team
              </Button>
              <Grid item sx={{ display: "flex", gap: "10px" }}>
                <Button color="success" variant="outlined" onClick={() => handleOpenAlertForapproveReject("approve")}>
                  Approve
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleOpenAlertForapproveReject("reject")}>
                  Reject
                </Button>
              </Grid>
            </Grid>
            <AlertBox
              open={approveRejectModal}
              title={`Confirm ${actionType === "approve" ? "Approve" : "Reject"}`}
              buttonText={actionType === "approve" ? "Approve" : "Reject"}
              message={`Are you sure you want to ${actionType === "approve" ? "approve" : "reject"} this data?`}
              onClose={handleCloseAlertForapproveReject}
              onConfirm={handleConfirmActionForapproveReject}
            />
            <DataTable rows={rows} columns={columns} />
          </TableContainer>
        </BlankCard>
      </Paper>
      <AlertBox open={alertOpen} title="Add Team" buttonText="Export" message={<ModalContent />} onClose={handleCloseAlert} onConfirm={handleConfirmAction} />
    </PageContainer>
  );
};

export default TeamManagement;
