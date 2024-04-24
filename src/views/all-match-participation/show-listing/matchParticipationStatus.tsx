import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/table/TableComponent";
import { AppState } from "src/store/Store";
import { fetchMatchParticipationDtailListStart } from "src/store/reducers/matchParticipationSlice";
import TableHead from "src/components/table-head";

interface CustomActionProps {
    id: number;
    onApprove?: (id: number) => void;
    onDisapprove?: (id: number) => void;
  }
  
  const CustomApproveCell: React.FC<CustomActionProps> = ({ id, onApprove }) => {
    return (
      <input type="radio" name={`action-${id}`} value="APPROVED" onChange={() => onApprove?.(id)} />
    );
  };
  
  const CustomDisapproveCell: React.FC<CustomActionProps> = ({ id, onDisapprove }) => {
    return (
      <input type="radio" name={`action-${id}`} value="DISAPPROVED" onChange={() => onDisapprove?.(id)} />
    );
  };
  
  

function MatchParticipationStatus() {
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

  const [approvalStatus, setApprovalStatus] = useState("");

  const handleApprovalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApprovalStatus(event.target.value);
  };

  const handleApprove = (id: number) => {
    console.log(`Approved ${id}`);
  };

  const handleDisapprove = (id: number) => {
    console.log(`Disapproved ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Sr. No', width: 50 },
    { field: 'match_name', headerName: 'Competition Name', width: 400 },
    { field: 'match_no', headerName: 'Event No', width: 80 },
    { field: 'fees', headerName: 'Fees', /* width: 40 */ },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 100,
      renderCell: (params: GridCellParams) => (
        <CustomApproveCell
          id={params.row.id as number}
          onApprove={handleApprove}
        />
      ),
    },
    {
      field: 'disapprove',
      headerName: 'Disapprove',
      width: 120,
      renderCell: (params: GridCellParams) => (
        <CustomDisapproveCell
          id={params.row.id as number}
          onDisapprove={handleDisapprove}
        />
      ),
    },
  ];

  return (
    <>
      <TableHead title="Match Participation View" />

      <Typography variant="h2" sx={{ marginTop: "20px", marginBottom: "20px", color: "#5D87FF" }}>
        {first_name} {last_name}
      </Typography>

      <DataTable rows={matchParticipationDetailListWithSerial} columns={columns} />

      <Button
        sx={{ float: "right", marginBottom: "10px", position: "relative", right: "10px", bottom: "100px" }}
      >
        Submit
      </Button>
    </>
  );
}

export default MatchParticipationStatus;
