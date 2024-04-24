import { ChangeEvent, useState } from "react";
import PageContainer from "src/components/page-container/PageContainer";
import TableHead from "src/components/table-head";
import { GridColDef } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Grid, Stack, Chip } from "@mui/material";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import React from "react";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CsvDownloader from "src/components/csv-downloader";
import Modal from "@mui/material/Modal";
import { RequiredStar } from "src/components/required-star";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { IPaymentLogs, ISelectPaymentLogs } from "src/types/PaymentLogs";
import { notifyMessage } from "src/utils/toastNotify";

const PaymentLogs = () => {
  const [selectedPaymentEvent, setSelectedPaymentEvent] = useState("");
  const [selectedCompetitionName, setSelectedCompetitionName] = useState("All");
  const [selectedAssociation, setSelectedAssociation] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 50 },
    { field: "competition_name", headerName: "Competition Name", width: 170 },
    { field: "shooter_name", headerName: "Shooter Name", width: 150 },
    { field: "dra_club_ru", headerName: "DRA/Club/RU", width: 150 },
    { field: "transaction_id", headerName: "Transaction Id", width: 130 },
    { field: "payment_date", headerName: "Payment Date", width: 130 },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => <Chip label={params.value} color={params.value === "Success" ? "success" : "error"} size="medium" className="status-chip" variant="outlined" />,
    },
  ];

  const rows: IPaymentLogs[] = [
    {
      id: 1,
      competition_name: "Rifle Competition",
      shooter_name: "Tom Cruise",
      dra_club_ru: "Mumbai Shooting Club",
      transaction_id: "123456",
      payment_date: "01-01-2022",
      amount: "30000",
      status: "Success",
    },
    {
      id: 2,
      competition_name: "Shotgun Competition",
      shooter_name: "John Wick",
      dra_club_ru: "Pune Shooting Club",
      transaction_id: "654321",
      payment_date: "03-05-2023",
      amount: "50000",
      status: "Fail",
    },
    {
      id: 3,
      competition_name: "Sniper Competition",
      shooter_name: "Michael",
      dra_club_ru: "Mumbai Shooting Club",
      transaction_id: "3333333",
      payment_date: "06-07-2023",
      amount: "20000",
      status: "Success",
    },
    {
      id: 4,
      competition_name: "Revolver Competition",
      shooter_name: "Thomas Shelby",
      dra_club_ru: "Pune Shooting Club",
      transaction_id: "555555",
      payment_date: "09-07-2020",
      amount: "40000",
      status: "Success",
    },
    {
      id: 5,
      competition_name: "Rifle Competition",
      shooter_name: "Gus Fring",
      dra_club_ru: "Kolhapur Shooting Club",
      transaction_id: "777777",
      payment_date: "08-05-2021",
      amount: "30000",
      status: "Fail",
    },
    {
      id: 6,
      competition_name: "Shotgun Competition",
      shooter_name: "Pablo Escobar",
      dra_club_ru: "Kolhapur Shooting Club",
      transaction_id: "888888",
      payment_date: "03-07-2021",
      amount: "80000",
      status: "Success",
    },
  ];

  const payment_event: ISelectPaymentLogs[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Railway Concession",
      label: "Railway Concession",
    },
    {
      value: "Shooter Registration",
      label: "Shooter Registration",
    },
    {
      value: "Match Participation",
      label: "Match Participation",
    },
    {
      value: "Weapon Carry",
      label: "Weapon Carry",
    },
    {
      value: "Safety Course",
      label: "Safety Course",
    },
    {
      value: "Membership Renewal",
      label: "Membership Renewal",
    },
  ];

  const competition_name: ISelectPaymentLogs[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Rifle Competition",
      label: "Rifle Competition",
    },
    {
      value: "Shotgun Competition",
      label: "Shotgun Competition",
    },
    {
      value: "Sniper Competition",
      label: "Sniper Competition",
    },
    {
      value: "Revolver Competition",
      label: "Revolver Competition",
    },
  ];

  const dra_club_ru: ISelectPaymentLogs[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Mumbai Shooting Club",
      label: "Mumbai Shooting Club",
    },
    {
      value: "Pune Shooting Club",
      label: "Pune Shooting Club",
    },
    {
      value: "Kolhapur Shooting Club",
      label: "Kolhapur Shooting Club",
    },
  ];

  const status: ISelectPaymentLogs[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Success",
      label: "Success",
    },
    {
      value: "Fail",
      label: "Fail",
    },
  ];

  const filteredRows = rows.filter((row) => {
    if (selectedCompetitionName !== "All" && row.competition_name !== selectedCompetitionName) {
      return false;
    }
    if (selectedAssociation !== "All" && row.dra_club_ru !== selectedAssociation) {
      return false;
    }
    if (selectedStatus !== "All" && row.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = React.useState<any>({
    // Initialize your form fields here
    payment_from_date: "",
    payment_to_date: "",
    safety_course: "",
    payment_status: "",
  });

  const errorInitialState: any = generateErrorInitialState(formData);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(formData);
    setError(newErrors);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkError = (fieldName: keyof IPaymentLogs) => {
    const newErrors: { [key in keyof IPaymentLogs]?: string } = validateForm({ [fieldName]: formData[fieldName] });
    setError((prevErrors: { [key in keyof IPaymentLogs]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: any) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const check = Object.values(formData).every((e) => e !== "");
    console.log(check, "check");
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      // navigate("/railway-concession-certificate");
      console.log(formData);
      notifyMessage.success("Exported Successfully");
      handleClose(); // Close the modal after submission
    }
  };

  return (
    <>
      <PageContainer title="Payment Logs page" description="this is Payment Logs page">
        <BlankCard>
          <Box>
            <Stack sx={{ background: "#ECF2FF", borderRadius: "6px" }} direction="row" justifyContent="space-between" alignItems="center" p={2}>
              <TableHead title="Payment Logs" />

              <Button onClick={handleOpen} variant="contained" color="primary">
                Export Payment Logs
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <h2>Export Payment Logs</h2>
                  <br></br>

                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Payment From Date
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="payment_from_date"
                    type="date"
                    value={formData.payment_from_date}
                    onChange={handleChange}
                    error={!!error.payment_from_date}
                    helperText={error.payment_from_date}
                    {...createFieldHandlers("payment_from_date")}
                    fullWidth
                    margin="normal"
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Payment To Date
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="payment_to_date"
                    type="date"
                    value={formData.payment_to_date}
                    onChange={handleChange}
                    error={!!error.payment_to_date}
                    helperText={error.payment_to_date}
                    {...createFieldHandlers("payment_to_date")}
                    fullWidth
                    margin="normal"
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Safety Course
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="safety_course"
                    value={formData.safety_course}
                    onChange={handleChange}
                    error={!!error.safety_course}
                    helperText={error.safety_course}
                    {...createFieldHandlers("safety_course")}
                    fullWidth
                    margin="normal"
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Payment Status
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    sx={{ mt: 0 }}
                    id="text-email"
                    variant="outlined"
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                    error={!!error.payment_status}
                    helperText={error.payment_status}
                    {...createFieldHandlers("payment_status")}
                    fullWidth
                    margin="normal"
                  />
                  {/* Add more form fields as needed */}
                  <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginRight: "10px" }}>
                    Export
                  </Button>
                  <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                  </Button>
                </Box>
              </Modal>
            </Stack>
          </Box>
          <Grid container paddingTop={"15px"} paddingRight={"15px"} justifyContent="flex-end">
            <CsvDownloader data={rows} buttonTitle="Download" filename="Payment Logs" />
          </Grid>

          <Grid container spacing={3} sx={{ paddingLeft: "15px", paddingRight: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label={
                  <span>
                    Payment Event
                    <RequiredStar />
                  </span>
                }
                name="paymentevent"
                value={selectedPaymentEvent}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedPaymentEvent(e.target.value)}
                fullWidth
                margin="normal"
              >
                {payment_event.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Competition Name"
                name="competitionname"
                value={selectedCompetitionName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedCompetitionName(e.target.value)}
                fullWidth
                margin="normal"
              >
                {competition_name.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ paddingLeft: "15px", paddingRight: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="DRA/CLUB/RU"
                name="draclubru"
                value={selectedAssociation}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedAssociation(e.target.value)}
                fullWidth
                margin="normal"
              >
                {dra_club_ru.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                label="Status"
                name="status"
                value={selectedStatus}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedStatus(e.target.value)}
                fullWidth
                margin="normal"
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>

          <DataTable rows={filteredRows} columns={columns} checkbox={false} />
        </BlankCard>
      </PageContainer>
    </>
  );
};
export default PaymentLogs;
