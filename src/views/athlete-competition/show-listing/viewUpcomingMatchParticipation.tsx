import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import DataTable from "../../../components/table/TableComponent";
import { AppState } from "src/store/Store";
import { fetchMatchParticipationDtailListStart } from "src/store/reducers/matchParticipationSlice";
import TableHead from "src/components/table-head";
import { Typography } from "@mui/material";

function ViewUpcomingMatchParticipation() {
  const dispatch = useDispatch();
  const matchParticipationDetailList = useSelector((state: AppState) => state.competition.matchParticipationDetailList);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchMatchParticipationDtailListStart({ id: id }));
  }, [id]);

  const matchParticipationDetailListWithSerial = matchParticipationDetailList.map((item: any, index: any) => ({
    ...item,
    id: index + 1,
  }));

  const uniqueNamesSet = new Set(matchParticipationDetailList.map((item: any) => `${item.first_name} ${item.last_name}`));


  const uniqueNamesArray = Array.from(uniqueNamesSet).map((fullName: any) => {
    const [first_name, last_name] = fullName.split(" ");

    return { first_name, last_name };
  });

  const { first_name, last_name } = uniqueNamesArray.length > 0 ? uniqueNamesArray[0] : { first_name: "", last_name: "" };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr. No", width: 100 },
    { field: "competition_name", headerName: "Competition Name", flex: 1 },
    { field: "match_no", headerName: "Event No", flex: 1 },
    { field: "match_name", headerName: "Event Name", flex: 1 },
    { field: "fees", headerName: "Fees", flex: 1 },
  ];

  return (
    <>
      <TableHead title="Match Participation View" />

      <Typography variant="h4" sx={{ marginTop: "20px", marginBottom: "20px", color: "#5D87FF" }}>
        {first_name} {last_name}
      </Typography>
      <DataTable rows={matchParticipationDetailListWithSerial} columns={columns} />
    </>
  );
}

export default ViewUpcomingMatchParticipation;
