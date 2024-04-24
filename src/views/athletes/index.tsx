import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";

import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperProps, Tooltip, IconButton, Chip } from "@mui/material";
import { /* IconPencil, */ /* IconEye, */ IconCircleOff, Icon360, IconDownload } from "@tabler/icons-react";
import Draggable from "react-draggable";

import APP_ROUTES from "src/routes/routePaths";
import DataTable from "../../components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";

// import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import React, { useEffect } from "react";
// import {useMediaQuery } from '@mui/material'
import { Link } from "react-router-dom";
import { notifyMessage } from "src/utils/toastNotify";
import { useState } from "react";
import { IAthlete } from "src/types/Athletes";
import { useDispatch } from "react-redux";
import { fetchAthleteListStart, updateAthleteStatusStart } from "src/store/reducers/atheleteSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
// import ParentCard from 'src/components/shared/ParentCard';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Athletes = () => {
  const navigate = useNavigate();
  const [blockAthlete, setBlockAthlete] = useState(false);
  const [athletePassword, setAthletePassword] = useState(false);
  const [athleteId, setAthleteId] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const dispatch = useDispatch();

  const athlete = useSelector((state: AppState) => state.athelete.athleteList);

  console.log(athlete.id, "clublist");

  useEffect(() => {
    dispatch(fetchAthleteListStart());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Athlete ID", width: 90 /*  renderCell: (params) => renderLinkCell(params.row) */ },
    { field: "first_name", headerName: "First name", width: 110 /*  renderCell: (params) => renderLinkCell(params.row) */ },
    { field: "last_name", headerName: "Last name", width: 100 /*  renderCell: (params) => renderLinkCell(params.row) */ },
    { field: "email", headerName: "Email", width: 180 /*  renderCell: (params) => renderLinkCell(params.row) */ },
    { field: "dra_rc_unit", headerName: "DRA/RC/UNIT", width: 180 /*  renderCell: (params) => renderLinkCell(params.row) */ },
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
      renderCell: (params) => (
        <>
          <Tooltip title="Block Athlete">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => blockUser(params.row.id)}>
              <IconCircleOff size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Password">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => changePassword(params.row.id)}>
              <Icon360 size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Athlete">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => download(params.row.id)}>
              <IconDownload size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Athlete">
            <Chip
              sx={{
                bgcolor: (theme) => theme.palette.grey[200],
                color: "#000",
                borderRadius: "6px",
                mr: 1,
              }}
              onClick={() => handleEdit(params.row.id)}
              size="small"
              label="Edit"
            />
          </Tooltip>
          <Tooltip title="view Athlete">
            <Chip
              sx={{
                bgcolor: (theme) => theme.palette.grey[200],
                color: "#000",
                borderRadius: "6px",
                mr: 1,
              }}
              onClick={() => handleView(parseInt(params.row.id))}
              size="small"
              label="View"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const handleView = (athleteId: number) => {
    navigate(`${APP_ROUTES.ATHLETES}/view/info/${athleteId}`);
  };
  // const renderLinkCell = (params: GridCellParams) => {
  //   return (
  //     <Tooltip title="View Athlete">
  //       <Link style={{ color: "#000", fontWeight: 400, fontSize: "14px" }} to={`${APP_ROUTES.ATHLETES}/view/info/${params.row.id}`}>
  //         {params.row}
  //       </Link>
  //     </Tooltip>
  //   );
  // };

  const rows = athlete.map((row: any) => ({
    id: row.id,
    first_name: row.first_name,
    email: row.email,
    last_name: row.last_name,
    dra_rc_unit: row.stateUnit,
  }));

  console.log(rows, "chek roe");

  const handleEdit = (id: number) => {
    navigate(`${APP_ROUTES.ATHLETES}/edit/info/${id}`);
  };

  const blockUser = (id: any) => {
    setAthleteId(id);
    setBlockAthlete(true);
  };

  const changePassword = (id: number) => {
    setAthletePassword(true);
  };

  const download = (id: number) => {
    notifyMessage.success(`Athlete ${id}'s data downloaded`);
  };

  const handleClose = () => {
    setBlockAthlete(false);
    setAthletePassword(false);
  };

  const handleBlockReason = (e: any) => {
    setBlockReason(e.target.value);
  };

  const handleBlock = () => {
    const id = athleteId;
    // dispatch(updateAthleteStatusStart({ athleteId, data: { approved_by: null, rejected_reason: reason } }));
    dispatch(updateAthleteStatusStart({ id, data: { approved_by: null, rejected_reason: null, block_reason: blockReason } }));
  };

  return (
    <>
      <PageContainer title="Athletes" description="This is Athletes page">
        <BlankCard>
          <TableHead title="List of shooters" />
          <DataTable rows={rows} columns={columns} />
        </BlankCard>
      </PageContainer>

      <div>
        <Dialog open={blockAthlete} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
            Block Reason
          </DialogTitle>
          <DialogContent>
            <TextField required fullWidth id="outlined-required" placeholder="Add Block Reason.." onChange={handleBlockReason} />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button color="error" variant="outlined" onClick={handleBlock}>
              Block Athlete
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={athletePassword} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move", width: "500px" }} id="draggable-dialog-title">
            Change password for: Athlete
          </DialogTitle>
          <DialogContent>
            <TextField required fullWidth id="outlined-required" placeholder="Enter New Password" />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Change password
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Athletes;
