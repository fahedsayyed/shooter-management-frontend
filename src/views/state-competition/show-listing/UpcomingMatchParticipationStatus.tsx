import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../components/table/TableComponent";
import { AppState } from "src/store/Store";
import { editUpdateAthleteMatchStatusRequest, updateAthleteMatchStatusRequest } from "src/store/reducers/matchParticipationSlice";
import TableHead from "src/components/table-head";
import { unwrapResult } from "@reduxjs/toolkit"; // Import unwrapResult for handling createAsyncThunk results

const UpcomingMatchParticipationStatus: React.FC = () => {
  const [updateStatus, setUpdateStatus] = useState<{ match_id: number; status: string }[]>([]);
  const [checkValue, setCheckValue] = useState<string | null>(null);
  const response = useSelector((state: AppState) => state.competition.response);
  const dispatch = useDispatch();
  const { id, status } = useParams();
  const allmatchParticipant = useSelector((state: AppState) => state.competition.approveAnddisapproveParticipatant);
  const { matches } = allmatchParticipant;

  const { first_name, last_name } = allmatchParticipant;

  console.log(id, "updateStatus id");

  useEffect(() => {
    if (id && status) {
      const data = dispatch(editUpdateAthleteMatchStatusRequest({ matchParticipationId: id, status: status }));
      console.log(data, "data");
    }
  }, [id, status]);

  // dispatch(createAthleteData({ formData, navigate }))
  // .unwrap()
  // .then((data) => {
  //   console.log(data, "response data");
  // })
  // .catch((error: any) => {
  //   if (error) {
  //     notifyMessage.error('Registration failed:' + error);
  //     if (activeStep && error) {
  //       setActiveStep(0)
  //       setCurrentStep(0)
  //     }
  //   }
  // })
  // .finally(() => {
  //   console.log("final check --");
  // });

  useEffect(() => {
    if (matches && matches.length > 0) {
      console.log(id, "idddd");
      const matchToEdit = matches.find((match: any) => match.match_id === Number(id));
      setCheckValue(matchToEdit?.match_status || null);
      console.log(matchToEdit, "matchToEdit");
      // Pre-fill updateStatus if match_status is "APPROVED"
      if (matchToEdit?.matches && matchToEdit.matches.length > 0 && matchToEdit.matches[0].match_status === "APPROVED") {
        setUpdateStatus([{ match_id: matchToEdit.matches[0].match_id, status: "APPROVED" }]);
      }
    }
  }, []);

  const handleApprovalChange = (id: number, status: string) => {
    const matchIndex = updateStatus.findIndex((item) => item.match_id === id);

    if (matchIndex === -1) {
      setUpdateStatus((prevStatus) => [...prevStatus, { match_id: id, status: status }]);
    } else {
      setUpdateStatus((prevStatus) => prevStatus.map((item) => (item.match_id === id ? { ...item, status: status } : item)));
    }

    setCheckValue(status); 
  };

  const handleApprove = (id: number) => {
    handleApprovalChange(id, "APPROVED");
  };

  const handleDisapprove = (id: number) => {
    handleApprovalChange(id, "DISAPPROVED");
  };

  const handleSubmit = async () => {
    if (updateStatus.length === 0) {
      dispatch(updateAthleteMatchStatusRequest({ id: id, updateStatus: [{ match_id: 0, status: "PENDING" }] }));
    } else {
      try {
    dispatch(updateAthleteMatchStatusRequest({ id: id, updateStatus: updateStatus }))

    
      } catch (error) {
        console.error("Error occurred while updating athlete match status:", error);

      }
    }
  };
  

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr. No", width: 50 },
    { field: "match_name", headerName: "Competition Name", width: 400 },
    { field: "match_no", headerName: "Event No", width: 80 },
    { field: "match_fee", headerName: "Fees" },
    {
      field: "approve",
      headerName: "Approve",
      width: 100,
      renderCell: (params: GridCellParams) => <CustomApproveCell id={params.row.match_id as number} matchStatus={params.row.match_status} onApprove={handleApprove} />,
    },
    {
      field: "disapprove",
      headerName: "Disapprove",
      width: 120,
      renderCell: (params: GridCellParams) => <CustomDisapproveCell id={params.row.match_id as number} matchStatus={params.row.match_status} onDisapprove={handleDisapprove} />,
    },
  ];

  const CustomApproveCell: React.FC<{
    id: number;
    matchStatus: string;
    onApprove?: (id: number) => void;
  }> = ({ id, matchStatus, onApprove }) => {
    return (
      <input
        type="radio"
        name={`action-${id}`}
        value="APPROVED"
        onChange={() => onApprove?.(id)}
        checked={matchStatus === "APPROVED" || updateStatus.find((item) => item.match_id === id)?.status === "APPROVED"}
      />
    );
  };

  const CustomDisapproveCell: React.FC<{
    id: number;
    matchStatus: string;
    onDisapprove?: (id: number) => void;
  }> = ({ id, matchStatus, onDisapprove }) => {
    return (
      <input
        type="radio"
        name={`action-${id}`}
        value="DISAPPROVED"
        onChange={() => onDisapprove?.(id)}
        checked={matchStatus === "DISAPPROVED" || updateStatus.find((item) => item.match_id === id)?.status === "DISAPPROVED"}
      />
    );
  };

  return (
    <>
      <TableHead title="Shooter Match Participation Status" />

      <Typography variant="h4" sx={{ marginTop: "20px", marginBottom: "20px", color: "#5D87FF" }}>
        {first_name} {last_name}
      </Typography>

      <DataTable rows={matches || []} columns={columns} />

      <Button onClick={handleSubmit} sx={{ float: "right", marginBottom: "10px", position: "relative", right: "10px", bottom: "100px" }}>
        Submit
      </Button>
    </>
  );
};

export default UpcomingMatchParticipationStatus;
