import { useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { ICoachingCamp } from "src/types/CoachingCamps";

const CoachingCamp = () => {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [associationToDelete, setAssociationToDelete] = useState<ICoachingCamp | null>(null);
  console.log(associationToDelete);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "camp_name", headerName: "Name of Camp", width: 300 },
    { field: "place", headerName: "Place", width: 150 },
    { field: "start_date", headerName: "Start Date", width: 150 },
    { field: "end_date", headerName: "End Date", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton sx={{ cursor: "pointer" }} onClick={() => handleEdit(params.row)}>
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

  const rows: ICoachingCamp[] = [
    {
      id: 1,
      camp_name: "Synergy Coaching Camp",
      place: "Mumbai",
      start_date: "2020-01-01",
      end_date: "2022-01-01",
      shooter_name: "Pablo Escobar",
    },
    {
      id: 2,
      camp_name: "ABC Coaching Camp",
      place: "Pune",
      start_date: "2020-01-01",
      end_date: "2023-01-01",
      shooter_name: "Don Eladio",
    },
    {
      id: 3,
      camp_name: "XYZ Coaching Camp",
      place: "Delhi",
      start_date: "2020-01-01",
      end_date: "2021-01-01",
      shooter_name: "John Wick",
    },
    {
      id: 4,
      camp_name: "Hitman Coaching Camp",
      place: "Dehradun",
      start_date: "2020-01-01",
      end_date: "2025-01-01",
      shooter_name: "Jack Reacher",
    },
    {
      id: 5,
      camp_name: "Foundation Camp",
      place: "Kolkata",
      start_date: "2020-01-01",
      end_date: "2024-01-01",
    },
  ];

  const handleEdit = (rows: ICoachingCamp) => {
    // Navigate to the edit page with the association ID as a URL parameter
    navigate(`/coaching-camp/edit`, { state: { row: rows } });
  };

  const handleOpenAlert = (rows: ICoachingCamp) => {
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
    <>
      <PageContainer title="Coaching Camp" description="this is Coaching Camp page">
        <BlankCard>
          <TableHead title="Coaching Camps" />

          <DataTable rows={rows} columns={columns} checkbox={false} />
          <AlertBox
            open={alertOpen}
            title="Confirm Delete"
            buttonText="Delete"
            disabled={false}
            message={<>Are you sure want to delete this data? </>}
            onClose={handleCloseAlert}
            onConfirm={handleConfirmAction}
          />
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default CoachingCamp;
