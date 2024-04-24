import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogActions, Button, Chip, DialogContent } from "@mui/material";
import { IconDownload, IconEye, IconPencil } from "@tabler/icons-react";
import APP_ROUTES from "src/routes/routePaths";
import DataTable from "../../components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React, { useState } from "react";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
// import { Link } from 'react-router-dom';

const EquipmentControlSheet = () => {
  const navigate = useNavigate();
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 80 },
    { field: "shootername", headerName: "Shooter name", width: 140 },
    { field: "serialNo", headerName: "Serial No", width: 140 },
    { field: "riflePistolNo", headerName: "Rifle/Pistol No", width: 140 },
    { field: "status", headerName: "Status", width: 140 },
    {
      field: "approve",
      headerName: "Approve",
      width: 180,
      renderCell: (params) => (
        <>
          <Tooltip title="Approve">
            <Chip
              sx={{
                bgcolor: (theme: any) => theme.palette.success.light,
                color: (theme: any) => theme.palette.success.main,
                borderRadius: "6px",
                mr: 1,
              }}
              onClick={() => handleApprove(params.row.id)}
              size="small"
              label="Approve"
            />
          </Tooltip>
          <Tooltip title="Reject">
            <Chip
              sx={{
                bgcolor: (theme: any) => theme.palette.error.light,
                color: (theme: any) => theme.palette.error.main,
                borderRadius: "6px",
                mr: 1,
              }}
              onClick={() => handleReject(params.row.id)}
              size="small"
              label="Reject"
            />
          </Tooltip>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Download">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => download(params.row.id)}>
              <IconDownload size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleView(params.row.id)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, serialNo: "0207", shootername: "Jon", status: "Approved", riflePistolNo: "0021" },
    { id: 2, serialNo: "0004", shootername: "Cersei", status: "Pending", riflePistolNo: "0021" },
    { id: 3, serialNo: "008", shootername: "Jaime", status: "Approved", riflePistolNo: "0021" },
  ];

  const handleEdit: any = (id: any) => {
    console.log(id);
    navigate(`${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}/edit/info/${id}`);
  };

  const handleView: any = (id: any) => {
    console.log(id);
    navigate(`${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}/view/info/${id}`);
  };

  const download: any = (id: any) => {
    console.log(id);
  };

  const handleApprove: any = (id: any) => {
    setApproveDialog(true);
    console.log(id);
  };

  const handleReject: any = (id: any) => {
    setRejectDialog(true);
    console.log(id);
  };

  const handleClose = () => {
    setApproveDialog(false);
    setRejectDialog(false);
  };

  return (
    <>
      <PageContainer title="Equipment Control" description="This is Equipment control sheets.">
        <BlankCard>
          <TableHead title="Equipment Control Sheet" />
          <DataTable rows={rows} columns={columns} checkbox={false} />
        </BlankCard>

        <div>
          <Dialog open={approveDialog} onClose={handleClose}>
            <DialogTitle style={{ width: "400px" }}>Do you want to approve ?</DialogTitle>
            <DialogActions>
              <Button autoFocus color="error" onClick={handleClose}>
                No
              </Button>
              <Button color="success" variant="outlined" onClick={handleClose}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog open={rejectDialog} onClose={handleClose}>
            <DialogTitle style={{ width: "400px" }}>Why do you want to reject ?</DialogTitle>
            <DialogContent>
              <CustomTextField placeholder="Type your reason" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button autoFocus color="primary" onClick={handleClose}>
                No
              </Button>
              <Button color="error" variant="outlined" onClick={handleClose}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </PageContainer>
    </>
  );
};

export default EquipmentControlSheet;
