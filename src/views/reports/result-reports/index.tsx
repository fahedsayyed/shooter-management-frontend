import { Grid, Tab, Tabs, Box, FormControl, Select, MenuItem, Button, Card, Typography, RadioGroup, FormControlLabel } from "@mui/material";
import React from "react";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import { IResultReport } from "src/types/Reports";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomRadio from "src/utils/theme-elements/CustomRadio";

function CustomTabPanel(props: IResultReport) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ResultReport = () => {
  const [formData, setFormData] = React.useState({ reportType: "eventwise" });
  const [value, setValue] = React.useState(0);

  const handelTab = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <BlankCard>
      <TableHead title="Result Reports" />
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", paddinBottom: "10px", mt: 1 }}>
            <Tabs value={value} onChange={handelTab} sx={{ height: "40px" }} aria-label="basic tabs example">
              <Tab label="Eventwise result report " {...a11yProps(0)} />
              <Tab label="Detailwise report" {...a11yProps(1)} />
              <Tab label="Tentative result report" {...a11yProps(2)} />
              <Tab label="Groupwise result report" {...a11yProps(3)} />
              <Tab label="Teawise result report" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Competition <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select
                    id="competition"
                    name="competitions"
                    // value="Competition"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ marginTop: "25px", display: "flex", alignItems: "center", gap: "20px", py: 0.4 }}>
                  <Typography variant="subtitle2" marginBottom={0.5} sx={{}}>
                    Report Type <b style={{ color: "red" }}>*</b>{" "}
                  </Typography>
                  <RadioGroup row aria-label="position" name="reportType">
                    <FormControlLabel
                      name="reportType"
                      value="eventwise"
                      checked={formData.reportType === "eventwise"}
                      control={<CustomRadio />}
                      onChange={handleChange}
                      label="Event wise"
                    />
                    <FormControlLabel
                      name="reportType"
                      value="associationwise"
                      checked={formData.reportType === "associationwise"}
                      control={<CustomRadio />}
                      onChange={handleChange}
                      label="Association wise"
                    />
                  </RadioGroup>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Event <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              {formData.reportType === "associationwise" && (
                <Grid item lg={6}>
                  <FormControl fullWidth>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                      {" "}
                      Association Name <b style={{ color: "red" }}>*</b>{" "}
                    </CustomFormLabel>
                    <Select id="eventtype" name="eventType" value="Type">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="india">India</MenuItem>
                      <MenuItem value="usa">USA</MenuItem>
                    </Select>
                    {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                  </FormControl>
                </Grid>
              )}
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Location <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Competition <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select
                    id="competition"
                    name="competitions"
                    // value="Competition"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Group <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Detail <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Location <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Competition <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select
                    id="competition"
                    name="competitions"
                    // value="Competition"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Result Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Event <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Detail <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Location <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Competition <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select
                    id="competition"
                    name="competitions"
                    // value="Competition"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Result Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Event <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Detail <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Location <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Competition <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select
                    id="competition"
                    name="competitions"
                    // value="Competition"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Event <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Select Location <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                  </Select>
                  {/* {error. && (
                                <FormHelperText>Select a state (this field is required).</FormHelperText>
                            )} */}
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Grid>
      </Grid>
    </BlankCard>
  );
};

export default ResultReport;
