import React, { useEffect, useState } from "react";
import { Paper, TableContainer, Grid, MenuItem } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { GridColDef } from "@mui/x-data-grid";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import Chip from "@mui/material/Chip";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import { fetchTenantListStart } from "src/store/reducers/TenentSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DraftsIcon from "@mui/icons-material/Drafts";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const TenantInfo = () => {
  const [listType, setListType] = useState("All");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const tenantList = useSelector((state: AppState) => state.tenent.tenantList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTenantListStart());
  }, [dispatch]);

  const stateColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "State Name", flex: 1 },
    {
      field: "user_status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.user_status === "Active" ? (
            <Chip label="Active" color="success" size="small" icon={<DoneIcon />} />
          ) : params.row.user_status === "draft" ? (
            <Chip label="Draft" color="primary" size="small" icon={<DraftsIcon />} />
          ) : params.row.user_status === 'InActive' ? (
            <Chip label="InAcive" color="error" size="small" icon={<CloseTwoToneIcon />} />

          )
          : (
            <Chip label="Pending" color="warning" size="small" icon={<HourglassTopIcon />} />
          )}
        </>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Grid sx={{ display: "flex", gap: "10px" }}>
          <Chip label="view" key={`view_${params.row.id}`} onClick={() => handleView(params.row.id)} onDelete={() => handleView(params.row.id)} deleteIcon={<RemoveRedEyeTwoToneIcon />} />
          <Chip label="edit" key={`edit_${params.row.id}`} onClick={() => handleEdit(params.row.id,params.row.tenantType)} onDelete={() => handleEdit(params.row.id,params.row.tenantType)} deleteIcon={<EditTwoToneIcon />} />

          {/* // label={basic.status} */}
        </Grid>
      ),
    },
    {
      field: "login",
      headerName: "Login As Admin",
      flex: 1,
      renderCell: () => (
        <>
          <Chip label="Login" onClick={handleLoggin} onDelete={handleLoggin} deleteIcon={<LockOpenTwoToneIcon />} />
        </>
      ),
    },
  ];

  const handleEdit: any = (id: any,tenantType:any) => {
    console.log(tenantType,"tennattyoe")
    navigate(`${APP_ROUTES.SUPER_ADMIN_EDIT}/${tenantType}/${id}`);
  };

  const handleLoggin: any = () => {
    navigate(`${APP_ROUTES.STATE_ADMIN_DASHBOARD}`);
  };
  const handleView = (id: number) => {
    navigate(`${APP_ROUTES.SUPER_ADMIN}/view-profile/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<{ name?: any; value: any }>) => {
    e.preventDefault();
    setListType(e.target.value);
  };

  useEffect(() => {
    const filterData = tenantList.filter((item: any) => {
      if (listType === "state") {
        return item.tenantType === "state";
      } else if (listType === "club") {
        return item.tenantType === "club";
      }

      return true;
    });

    setData(filterData);
  }, [listType, tenantList]);

  return (
    <PageContainer title="user page" description="this is user page">
      {/* <Breadcrumb title="user page" items={BCrumb} /> */}
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
          <TableHead title="Association" />
          <CustomSelect
            sx={{ width: "45%", margin: "20px" }}
            className="custom-select"
            id="tenent-type"
            variant="outlined"
            name="tenentType"
            value={listType}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="state">States</MenuItem>
            <MenuItem value="club">Clubs</MenuItem>
          </CustomSelect>
          <TableContainer>
            <DataTable rows={data} columns={stateColumns} />
          </TableContainer>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default TenantInfo;
