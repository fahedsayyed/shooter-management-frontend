import React, { useEffect, useState } from "react";
import { Grid, MenuItem, FormControlLabel, Button, Checkbox, Autocomplete, Stack, FormControl, FormHelperText } from "@mui/material";

import PageContainer from "../../components/page-container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import TableHead from "src/components/table-head";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "src/components/table/TableComponent";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { EventRow, ISelectCompetition, ISelectRole, ISelectSeal, ISelectShooterName, ISelectYear, IShooterCertificate } from "src/types/ShooterCertificate";

const ShooterCertificate = () => {
  const [currency, setCurrency] = React.useState<IShooterCertificate>({
    year: "",
    shootername: "",
    sealtype: "",
    signatory: "",
    competition: "",
    conductedby: "",
    signaturetype: "",
  });

  const [checked, setChecked] = useState();
  const [alertOpen, setAlertOpen] = useState(false);

  const errorInitialState: any = generateErrorInitialState(currency);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(currency);
    setError(newErrors);
  };

  const navigate = useNavigate();
  // const inputData = useSelector((state: AppState) => state.tenent.formData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "EventNo", headerName: "Event No", flex: 1 },
    { field: "EventName", headerName: "Event Name", flex: 1 },
    { field: "EventType", headerName: "Event Type", flex: 1 },
    { field: "scoreType", headerName: "Score Type", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "medal", headerName: "Medal", flex: 1 },
    { field: "score", headerName: "Score %	", flex: 1 },
    { field: "mqs", headerName: "MQS	", flex: 1 },
    { field: "finalScore", headerName: "Final Score", flex: 1 },
  ];
  const rows: EventRow[] = [{ id: "", EventNo: "", EventName: "", scoreType: "", total: "", position: "", medal: "", score: "", mqs: "", finalScore: "", EventType: "" }];

  const role: ISelectRole[] = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Super Admin",
      label: "Super Admin",
    },
    {
      value: "Club Admin",
      label: "Club Admin",
    },
    {
      value: "Unit Admin",
      label: "Unit Admin",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "Guest Shooter",
      label: "Guest Shooter",
    },
  ];
  const Seal: ISelectSeal[] = [
    {
      value: "MANUAL",
      label: "Manual",
    },
    {
      value: "DIGITAL",
      label: "Digital",
    },
  ];

  const year: ISelectYear[] = [
    {
      value: "2023",
      label: "2023",
    },
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2021",
      label: "2021",
    },
    {
      value: "2020",
      label: "2020",
    },
    {
      value: "2019",
      label: "2019",
    },
  ];
  const competition: ISelectCompetition[] = [
    {
      value: "Air Rifle Competition",
      label: "Air Rifle Competition",
    },
    {
      value: "Shot Gun Competition",
      label: "Shot Gun Competition",
    },
    {
      value: "Sniper Rifle Competition",
      label: "Sniper Rifle Competition",
    },
    {
      value: "Pistol Competition",
      label: "Pistol Competition",
    },
  ];
  const shootername: ISelectShooterName[] = [
    {
      value: "Tom Cruise",
      label: "Tom Cruise",
    },
    {
      value: "Mike Tyson",
      label: "Mike Tyson",
    },
    {
      value: "Gus Fring",
      label: "Gus Fring",
    },
    {
      value: "Lionel Messi",
      label: "Lionel Messi",
    },
    {
      value: "Jackie Chan",
      label: "Jackie Chan",
    },
  ];

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCurrency(event.target.value);
    const { name, value } = e.target;
    setCurrency({ ...currency, [name]: value });
  };

  const checkError = (fieldName: keyof IShooterCertificate) => {
    const newErrors: { [key in keyof IShooterCertificate]?: string } = validateForm({ [fieldName]: currency[fieldName] });
    setError((prevErrors: { [key in keyof IShooterCertificate]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof IShooterCertificate) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform data validation here
    const check = Object.values(currency).every((e) => e !== ""); //
    console.log(check, "check"); // If all values are non-empty, check will be true; otherwise, false.
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      // navigate("/railway-concession-certificate");
      notifyMessage.success("Saved Successfully");
    }
  };

  const handleCheckValue: any = (e: any) => {
    setChecked(e.target.checked);
  };

  const navigateToBack = () => {
    navigate(`${APP_ROUTES.SHOOTERS_CERTIFICATE}`);
  };
  const handleOpenAlert = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseAlert();
  };

  return (
    <PageContainer title="Shooter Certificate" description="this is Shooter Certificate page">
      <ParentCard title="">
        <>
          <Grid sx={{ marginTop: "-35px" }}>
            <TableHead title="Shooter Certificate" />
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleOpenAlert} variant="contained" color="primary" sx={{ marginTop: "10px" }}>
              Download Bulk certificate
            </Button>
          </Grid>
          {/* <Box>
            <Stack sx={{ background: "#ECF2FF", borderRadius: "6px", marginTop: "-35px" }} direction="row" justifyContent="space-between" alignItems="center" p={1}>
              <TableHead title="Shooter Certificate" />
              <Button onClick={handleOpenAlert} variant="contained" color="primary">
                Download Bulk certificate
              </Button>
            </Stack>
          </Box> */}

          <Grid item lg={12} md={12} xs={12}>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={6} md={12} sm={12}>
                <FormControl error={!!error.year} fullWidth>
                  <CustomFormLabel htmlFor="standard-select-currency">
                    Year <RequiredStar />
                  </CustomFormLabel>
                  <CustomSelect
                    id="standard-select-currency"
                    className="custom-select"
                    value={currency.year}
                    onChange={handleChange2}
                    fullWidth
                    variant="outlined"
                    name="year"
                    {...createFieldHandlers("year")}
                    margin="normal"
                  >
                    {year.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {error.year && <FormHelperText>Year field is required.</FormHelperText>}
                </FormControl>

                {/* <CustomFormLabel htmlFor="df-email-address">
                  Select Shooter <RequiredStar />
                </CustomFormLabel>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  // className='custom-select'
                  sx={{ height: "45px" }}
                  options={states}
                  value={states.find((state) => state.name === inputData.state) || null}
                  getOptionLabel={(option) => option.name}
                  // onChange={(event, newValue) => {
                  //     dispatch(updateFormData({ state: newValue ? newValue.name : '' }));
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                /> */}

                <CustomFormLabel sx={{ mt: 2 }} htmlFor="text-email">
                  Search Shooter Name
                  <RequiredStar />
                </CustomFormLabel>
                <Autocomplete
                  id="text-emailss"
                  options={shootername}
                  getOptionLabel={(option) => option.label || ""}
                  value={shootername.find((option) => option.value === currency.shootername) || null}
                  onChange={(e, newValue) => setCurrency(newValue ? { ...currency, shootername: newValue.value } : { ...currency, shootername: "" })}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      name="shootername"
                      fullWidth
                      margin="normal"
                      sx={{ mt: 0 }}
                      error={!!error.shootername}
                      helperText={error.shootername}
                      {...createFieldHandlers("shootername")}
                    />
                  )}
                />
                <FormControl error={!!error.sealtype} fullWidth>
                  <CustomFormLabel htmlFor="standard-select-currency">
                    Select Seal Type
                    <RequiredStar />
                  </CustomFormLabel>
                  <CustomSelect
                    id="standard-select-currency"
                    name="sealtype"
                    className="custom-select"
                    value={currency.sealtype}
                    onChange={handleChange2}
                    fullWidth
                    variant="outlined"
                    {...createFieldHandlers("sealtype")}
                    margin="normal"
                  >
                    {Seal.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {error.sealtype && <FormHelperText>Seal Type field is required.</FormHelperText>}
                </FormControl>
                <FormControl error={!!error.signatory} fullWidth>
                  <CustomFormLabel htmlFor="standard-select-currency">Select Signatory</CustomFormLabel>
                  <CustomSelect
                    id="standard-select-currency"
                    name="signatory"
                    className="custom-select"
                    value={currency.signatory}
                    onChange={handleChange2}
                    fullWidth
                    variant="outlined"
                    {...createFieldHandlers("signatory")}
                    margin="normal"
                  >
                    {role.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {error.signatory && <FormHelperText>signatory field is required.</FormHelperText>}
                </FormControl>
                <Grid sx={{ display: "flex" }}>
                  {" "}
                  <CustomFormLabel htmlFor="fname-text">Do you want Signature 2 ?</CustomFormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedsmall"
                        onClick={handleCheckValue}
                        sx={{ marginTop: "20px", marginLeft: "5px" }}
                      />
                    }
                    label=""
                  />
                </Grid>
                {checked && (
                  <>
                    <CustomFormLabel htmlFor="standard-select-currency">Select Signatory 2 Type</CustomFormLabel>
                    <CustomSelect id="standard-select-currency" className="custom-select" value={currency} onChange={handleChange2} fullWidth variant="outlined" margin="normal">
                      {Seal.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    <CustomFormLabel htmlFor="fname-text">Signatory 2 name</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" type="text" fullWidth />
                    <CustomFormLabel htmlFor="fname-text">Enter Signatory 2 Designation</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" type="text" fullWidth />
                  </>
                )}
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <Grid container>
                  <FormControl error={!!error.competition} fullWidth>
                    <Grid item lg={12} md={12} sm={12}>
                      <CustomFormLabel htmlFor="standard-select-currency">
                        Competition
                        <RequiredStar />
                      </CustomFormLabel>

                      <CustomSelect
                        id="standard-select-currency"
                        name="competition"
                        className="custom-select"
                        value={currency.competition}
                        onChange={handleChange2}
                        fullWidth
                        variant="outlined"
                        {...createFieldHandlers("competition")}
                        margin="normal"
                      >
                        {competition.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      {error.competition && <FormHelperText>competition field is required.</FormHelperText>}
                    </Grid>
                  </FormControl>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">
                      Conducted By
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField
                      id="fname-text"
                      variant="outlined"
                      type="text"
                      fullWidth
                      name="conductedby"
                      value={currency.conductedby}
                      onChange={handleChange2}
                      error={!!error.conductedby}
                      helperText={error.conductedby}
                      {...createFieldHandlers("conductedby")}
                    />
                  </Grid>

                  <FormControl error={!!error.signaturetype} fullWidth>
                    <Grid item lg={12} md={12} sm={12}>
                      <CustomFormLabel htmlFor="standard-select-currency">
                        Select Signature Type
                        <RequiredStar />
                      </CustomFormLabel>
                      <CustomSelect
                        id="standard-select-currency"
                        name="signaturetype"
                        className="custom-select"
                        value={currency.signaturetype}
                        onChange={handleChange2}
                        fullWidth
                        variant="outlined"
                        {...createFieldHandlers("signaturetype")}
                        margin="normal"
                      >
                        {Seal.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      {error.signaturetype && <FormHelperText>Signaturetype field is required.</FormHelperText>}
                    </Grid>
                  </FormControl>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel>Competitor Number :</CustomFormLabel>
                    <CustomFormLabel>Participating State :</CustomFormLabel>
                    <CustomFormLabel>Gender :</CustomFormLabel>
                    <CustomFormLabel>Date of Birth :</CustomFormLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DataTable rows={rows} columns={columns} />

          <AlertBox
            open={alertOpen}
            title="Download Bulk Certificate's"
            buttonText="Export"
            message={
              <>
                <Grid item lg={12} md={12} xs={12}>
                  <Grid>
                    <Grid>
                      <CustomFormLabel htmlFor="standard-select-currency">
                        Year
                        <RequiredStar />
                      </CustomFormLabel>
                      <CustomSelect id="standard-select-currency" className="custom-select" value={currency} onChange={handleChange2} fullWidth variant="outlined" margin="normal">
                        {year.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      <CustomFormLabel htmlFor="standard-select-currency">
                        Competition
                        <RequiredStar />
                      </CustomFormLabel>

                      <CustomSelect id="standard-select-currency" className="custom-select" value={currency} onChange={handleChange2} fullWidth variant="outlined" margin="normal">
                        {year.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            }
            onClose={handleCloseAlert}
            onConfirm={handleConfirmAction}
          />
          <Stack direction="row" spacing={0} sx={{ position: "relative", top: "10px" }} mt={0}>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
              onClick={navigateToBack}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Submit
            </Button>
          </Stack>
        </>
      </ParentCard>
    </PageContainer>
  );
};

export default ShooterCertificate;
