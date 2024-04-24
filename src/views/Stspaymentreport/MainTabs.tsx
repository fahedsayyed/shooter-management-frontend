import React, { useState } from "react";
import { Box, Grid, Tab, Radio, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { GridColDef } from "@mui/x-data-grid";
import SubTabs from "./SubTabs";
import { IStsPaymentReportCompetition, IStsPaymentReportSafetyCourse } from "src/types/STSPayment";

const MainTab = () => {
  const [value, setValue] = React.useState("1");
  const [selectedOption, setSelectedOption] = useState("");

  const CompetitionColumns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "competitionCode", headerName: "Competition Code", width: 200 },
    { field: "competitionName", headerName: "competitionName", width: 400 },

    {
      field: "actions",
      headerName: "Payment Done",
      width: 150,
      renderCell: (params) => (
        <>
          <CustomCheckbox
            // checked={checked}
            // type="checkbox"
            // checked={params.row.checked}
            onChange={() => handleCheck(params.row.id)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </>
      ),
    },
  ];

  const CompetitionRows: IStsPaymentReportCompetition[] = [
    {
      id: 1,
      competitionCode: "24 CSJEMMSSC 2021 - SHOTGUN	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 2,
      competitionCode: "24TH CAPT. S. J. EZEKIEL	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 3,
      competitionCode: "36 MSSC (SHOTGUN)	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 4,
      competitionCode: "37 A - MSSC - SHOTGUN	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 5,
      competitionCode: "37 MSSC [R&P]	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 6,
      competitionCode: "38 MSSC SHOTGUN	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    {
      id: 7,
      competitionCode: "CAPT. EZEKIEL [R&P] 2023	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
    { id: 8, competitionCode: "EZEKIEL 2022	", competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	", checked: false },
    {
      id: 9,
      competitionCode: "EZEKIEL SHOTGUN 2022	",
      competitionName: "24th Capt. S. J. Ezekiel Memorial Maharashtra State Shooting Championship- SHOTGUN NOVICES -2021	",
      checked: false,
    },
  ];

  const SafetyCourseColumns: GridColDef[] = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "SafetyCourseName", headerName: "Safety Course Name", width: 600 },

    {
      field: "Payment Done",
      headerName: "Payment Done",
      width: 150,
      renderCell: (params) => (
        <>
          <CustomCheckbox
            // checked={checked}
            // type="checkbox"
            // checked={params.row.checked}
            onChange={() => handleCheck(params.row.id)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </>
      ),
    },
  ];

  const SafetyCourseRows: IStsPaymentReportSafetyCourse[] = [
    {
      id: 1,
      SafetyCourseName:
        "Conducted by PSSA at Excellence Shooting Sports Club 4th Floor above Solaris Fitness Club Opposite Vision 9 Mall Kunal Icon Rd Pimple Saudagar Pimpri Chinchwad 411027 Saurabh Salavne Mobile No 9834284776 Dt 21Jan 2023 time 04 00pm	",
      checked: false,
    },
    {
      id: 2,
      SafetyCourseName:
        "Conducted by PSSA at Excellence Shooting Sports Club 4th Floor above Solaris Fitness Club Opposite Vision 9 Mall Kunal Icon Rd Pimple Saudagar Pimpri Chinchwad 411027 Saurabh Salavne Mobile No 9834284776 Dt 21Jan 2023 time 0530pm",
      checked: false,
    },
    { id: 3, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 27 Nov 2022 time 1030", checked: false },
    { id: 4, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 27 Nov 2022 time 1030	", checked: false },
    { id: 5, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 06 Feb 2022 time 1030		", checked: false },
    { id: 6, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 09 Jan 2022 time 1030		", checked: false },
    { id: 7, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 10 April 2022 time 1030	", checked: false },
    { id: 8, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 10 Oct 2021 time 1030	", checked: false },
    { id: 9, SafetyCourseName: "Maharashtra Rifle Association MRA Shooting Range, Worli Sea Face North, Mumbai 400030 dt 15 Jan 2023 time 1030	", checked: false },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCheck = (id: number) => {
    const updatedRows = CompetitionRows.map((row) => {
      if (row.id === id) {
        console.log(id, "iddd");

        return { ...row, checked: !row.checked };
      } else {
        return { ...row, checked: false };
      }
    });
    // setDataRows(updatedRows);
    console.log(updatedRows, "updatedRows");
  };

  //   const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setSelectedValue(event.target.value);
  //   };

  //   const controlProps = (item: string) => ({
  //       checked: selectedValue === item,
  //       onChange: handleChange2,
  //       value: item,
  //       name: 'size-radio-button-demo',
  //       inputProps: { 'aria-label': item },
  //   });
  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <BlankCard>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="STS Payment" value="1" />
            <Tab label="Pending Payments" value="2" />
            {/* <Tab label="Social Links" value="3" /> */}
          </TabList>

          <TabPanel value="1">
            <TableHead title="STS PAYMENT REPORT" />
            <Grid sx={{ mt: "30px" }}>
              <SubTabs />
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            {/* <Grid container spacing={3}> */}
            <TableHead title="PENDING PAYMENTS" />

            <Grid>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio value="competition" checked={selectedOption === "competition"} onChange={handleRadioChange} size="small" />
                <Typography>Competition</Typography>
                <Radio value="safetyCourse" checked={selectedOption === "safetyCourse"} onChange={handleRadioChange} size="small" />
                <Typography>Safety Course</Typography>
              </Box>
            </Grid>
            {selectedOption === "competition" ? (
              <DataTable rows={CompetitionRows} columns={CompetitionColumns} />
            ) : (
              <DataTable rows={SafetyCourseRows} columns={SafetyCourseColumns} />
            )}

            {/* </Grid> */}
          </TabPanel>
          {/* <TabPanel value="3">
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-twitter" sx={{ mt: 0 }}>
                                            Twitter
                                        </CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            sr="ft-twitter"
                                            placeholder="https://twitter.com/abc"
                                            fullWsrth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-google">Google</CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            sr="ft-google"
                                            placeholder="https://plus.google.com/abc"
                                            fullWsrth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-insta">Instagram</CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            sr="ft-insta"
                                            placeholder="https://instagram.com/abc"
                                            fullWsrth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-fb" sx={{ mt: { sm: 0 } }}>
                                            Facebook
                                        </CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField sr="ft-fb" placeholder="https://facebook.com/abc" fullWsrth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-linkedin">Linkedin</CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            sr="ft-linkedin"
                                            placeholder="https://linkedin.com/abc"
                                            fullWsrth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="ft-quora">Quora</CustomFormLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField sr="ft-quora" placeholder="https://quora.com/abc" fullWsrth />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    <Button variant="text" color="error">
                                        Cancel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </TabPanel> */}
        </TabContext>
      </BlankCard>
    </div>
  );
};

export default MainTab;
