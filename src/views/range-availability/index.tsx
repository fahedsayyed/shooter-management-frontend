import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, IconButton, Typography } from "@mui/material";
import { IconEye, IconPencil } from "@tabler/icons-react";
import DataTable from "../../components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React, { useState } from "react";
import { IconListDetails } from "@tabler/icons-react";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import { IRangeAvailability } from "src/types/RangeAvailability";

const RangeAvailability = () => {
  const navigate = useNavigate();
  const [approveDialog, setApproveDialog] = useState(false);
  const [viewRemark, setViewRemark] = React.useState(false);
  const [addRemark, setAddRemark] = React.useState(false);
  const [confirmAddRemark, setconfirmAddRemark] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 140 },
    { field: "shooterId", headerName: "Shooter Id", width: 160 },
    { field: "shooterName", headerName: "Shooter Name", width: 220 },
    { field: "status", headerName: "Status", width: 240 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="View Form">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleViewForm(params.row.id)}>
              <IconListDetails size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Remark">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleAddRemark(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Remark">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleViewRemark(params.row.id)}>
              <IconEye size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IRangeAvailability[] = [
    { id: 1, shooterName: "Jon", shooterId: "0207", status: "Approved", riflePistolNo: "0021" },
    { id: 2, shooterName: "Cersei", shooterId: "0052", status: "Pending", riflePistolNo: "0021" },
    { id: 3, shooterName: "Jaime", shooterId: "0012", status: "Approved", riflePistolNo: "0021" },
  ];

  const handleViewForm = (id: IRangeAvailability) => {
    console.log(id);
    navigate(`${APP_ROUTES.RANGE_AVAILABILTY}/preview/info/${id}`);
  };

  const handleViewRemark = (id: IRangeAvailability) => {
    console.log(id);
    setViewRemark(true);
  };

  const handleAddRemark = (id: IRangeAvailability) => {
    console.log(id);
    setAddRemark(true);
  };

  const handleConfirmToAddRemark = () => {
    setconfirmAddRemark(true);
  };

  const handleClose = () => {
    setconfirmAddRemark(false);
    setApproveDialog(false);
    setViewRemark(false);
    setAddRemark(false);
  };

  return (
    <>
      <PageContainer title="Range Availability" description="This is Range Availability.">
        <BlankCard>
          <TableHead title="Range Availability" />
          <DataTable rows={rows} columns={columns} checkbox={false} />
        </BlankCard>

        <div>
          <Dialog open={approveDialog} onClose={handleClose}>
            <DialogTitle style={{ width: "400px" }}>Do You want to approve ?</DialogTitle>
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
      </PageContainer>

      <div>
        <Dialog open={viewRemark} onClose={handleClose}>
          <DialogTitle style={{ width: "300px" }}></DialogTitle>
          <DialogContent>
            <Typography variant="h5">View Remark</Typography>
            <Typography variant="subtitle2">test</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={addRemark} onClose={handleClose}>
          <DialogTitle style={{ width: "400px" }}></DialogTitle>
          <DialogContent>
            <Typography variant="h5">Do you want to add Remark</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button color="success" variant="outlined" onClick={handleConfirmToAddRemark}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={confirmAddRemark} onClose={handleClose}>
          <DialogTitle style={{ width: "400px" }}></DialogTitle>
          <DialogContent>
            <Typography mb={2} variant="h5">
              Set Remark
            </Typography>
            <CustomTextField fullWidth placeholder="Add Your Remark" />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancle
            </Button>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default RangeAvailability;
