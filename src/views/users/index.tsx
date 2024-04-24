import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import DataTable from "../../components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import Tooltip from "@mui/material/Tooltip";
import { Paper, useMediaQuery, TableContainer, IconButton } from "@mui/material";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons";
import { IUser } from "src/types/User";

const Users = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [alertOpen, setAlertOpen] = useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<IUser | null>(null);
  console.log(associationToDelete);

  const location = useLocation();
  console.log(location.state, "location");
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "DRARCUnit", headerName: "DRA/RC/Unit", width: 150 },
    { field: "firstname", headerName: "First Name", width: 100 },
    { field: "lastname", headerName: "Last name", width: 100 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "role", headerName: "Role", width: 130 },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 150,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row.id)}>
              <IconPencil size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleOpenAlert(params.row)}>
              <IconTrash size="22" stroke={1.4} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const rows: IUser[] = [
    {
      id: 1,
      DRARCUnit: "YOUTH RIFLE CLUB",
      lastname: "Snow",
      firstname: "Jon",
      email: "DHIRAJ.IYC@yopmail.com	",
      role: "Club Admin	",
    },
    {
      id: 2,
      DRARCUnit: "YASHWANT KESHAV PATIL COLLEGE OF COMMERCE	",
      lastname: "Lannister",
      firstname: "Cersei",
      email: "VIVACOLLEGE02@yopmail.com	",
      role: "Unit Admin	",
    },
    {
      id: 3,
      DRARCUnit: "X-L TARGET SHOOTERS ASSOCIATION",
      firstname: "Jaime",
      lastname: "Lannister",
      email: "XLTARGETSHOOTERS@yopmail.com",
      role: "Club Admin	",
    },
    {
      id: 4,
      DRARCUnit: "THANE DISTRICT RIFLE ASSOCIATION		",
      firstname: "Arya",
      lastname: "Lannister",
      email: "WINNERSHOOTINGCLUB@yopmail.com		",
      role: "Unit Admin	",
    },
    {
      id: 5,
      DRARCUnit: "WINNER’S SHOOTING CLUB	",
      firstname: "Daenerys",
      lastname: "Lannister",
      email: "VIVACOLLEGE3@yopmail.com		",
      role: "Club Admin	",
    },
    {
      id: 6,
      DRARCUnit: "VIDYA DAYANAD PATIL COLLEGE OF ARTS MB ESTATE- VIRAR	",
      lastname: "Lannister",
      firstname: "Targaryen",
      email: "SHARAD_TARTE.009@yopmail.com		",
      role: "Unit Admin	",
    },
    {
      id: 7,
      DRARCUnit: "UNIQUE SHOOTING SPORTS CLUB	",
      firstname: "Ferrara",
      lastname: "Lannister",
      email: "TRAPSACADEMY@yopmail.com	",
      role: "Club Admin	",
    },
    {
      id: 8,
      DRARCUnit: "TIRGGERS RIFLE & PISTOL SHOOTING ACADEMY	",
      lastname: "Lannister",
      firstname: "Rossini",
      email: "RAMESHJKUSALE@yopmail.com	",
      role: "Unit Admin	",
    },
    {
      id: 9,
      DRARCUnit: "THE KOLHAPUR DISTRICT MEN & WOMEN RIFLE ASSOCIATION	",
      firstname: "Harvey",
      lastname: "Lannister",
      email: "DEEPALIAD@yopmail.com		",
      role: "Club Admin	",
    },
  ];

  const handleEdit = (id: IUser) => {
    navigate(`${APP_ROUTES.USERS}/edit-user/${id}`);
  };

  const handleOpenAlert = (rows: IUser) => {
    setAssociationToDelete(rows);
    setAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <PageContainer title="User" description="this is user page">
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
          <TableHead title="users" />
          <TableContainer>
            <DataTable rows={rows} columns={columns} />
            <AlertBox
              open={alertOpen}
              disabled={false}
              title="Confirm Delete"
              buttonText="Delete"
              message={<>Are you sure want to delete this data? </>}
              onClose={handleCloseAlert}
              onConfirm={handleConfirmAction}
            />
          </TableContainer>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default Users;
