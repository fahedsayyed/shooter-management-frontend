import React, { useEffect } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import DataTable from "../../components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { Chip, Tooltip } from "@mui/material";
import APP_ROUTES from "src/routes/routePaths";
import { IAllMatchParticipation } from "src/types/AllMatchParticipation";
import { useDispatch } from "react-redux";
import { fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
                

const AllMatchParticipationReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const competition = useSelector((state:AppState)=>state.competition.competition)


  useEffect(()=>{
    dispatch(fetchCompetitionListStart())
  },[])

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr No", width: 140 },
    {
      field: "name",
      headerName: "Competition Name",
      width: 600,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Tooltip title="show listing">
            <Chip
              sx={{
                bgcolor: (theme) => theme.palette.grey[200],
                color: "#000",
                borderRadius: "6px",
              }}
              onClick={() => showAthleteListing(params.row.id)}
              size="medium"
              label="Show Listings"
            />
          </Tooltip>
        </>
      ),
    },
  ];


  const showAthleteListing = (id: IAllMatchParticipation) => {
    navigate(`${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}/show-listing/${id}`);
  };

  return (
    <>
      <PageContainer title="All Match Participation Report" description="All participations">
        <BlankCard>
          <TableHead title="All Match Participations" />
          <DataTable rows={competition} columns={columns} />
        </BlankCard>
      </PageContainer>
    </>
  );
};

export default AllMatchParticipationReport;


