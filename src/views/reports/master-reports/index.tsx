import { Grid, Tab, Tabs, Box, FormControl, Select, MenuItem, Button } from "@mui/material";
import React from "react";
import { RequiredStar } from "src/components/required-star";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import { IMasterReport } from "src/types/Reports";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";

function CustomTabPanel(props: IMasterReport) {
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

const MasterReport = () => {
  const [value, setValue] = React.useState(0);
  const [formData, setFormData] = React.useState({ competition: "all", eventType: "rifle" });

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData: any) => {
      const newData = { ...prevData, [name]: value };

      return newData;
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BlankCard>
      <TableHead title="Master Reports" />
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", paddinBottom: "10px", mt: 1 }}>
            <Tabs value={value} onChange={handleChange} sx={{ height: "40px" }} aria-label="basic tabs example">
              <Tab label="Shooter master report" {...a11yProps(0)} />
              <Tab label="Group master report" {...a11yProps(1)} />
              <Tab label="Event master report" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    Competition
                    <RequiredStar />
                  </CustomFormLabel>
                  <Select id="competition" name="competition" onChange={handleInputChange} value={formData.competition}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="maharashrtaAirGun">Maharashtra Air Gun</MenuItem>
                    <MenuItem value="36thMaharastra">36th Maharashtra Air</MenuItem>
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
                  <Select id="eventType" name="eventType" onChange={handleInputChange} value={formData.eventType} defaultValue="Rifle">
                    <MenuItem value="rifle">Rifle</MenuItem>
                    <MenuItem value="pistol">Pistol</MenuItem>
                    <MenuItem value="shotgun">Shotgun</MenuItem>
                  </Select>
                  {/* {error. && (
                                    <FormHelperText>Select a state (this field is required).</FormHelperText>
                                )} */}
                </FormControl>
              </Grid>
              <Grid item lg={4}>
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
                  <Select id="competition" name="competitions" value="Competition">
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
              <Grid item lg={4}>
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
                  <Select id="competition" name="competitions" value="Competition">
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
              <Grid item lg={4}>
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

export default MasterReport;
