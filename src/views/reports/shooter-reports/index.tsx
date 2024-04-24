import { Grid, Tab, Tabs, Box, FormControl, Select, MenuItem, Button, InputAdornment, Autocomplete } from "@mui/material";
import { IconAddressBook } from "@tabler/icons-react";
import React from "react";
import BlankCard from "src/components/shared/BlankCard";
import TableHead from "src/components/table-head";
import { IShooterReport } from "src/types/Reports";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/utils/theme-elements/CustomOutlinedInput";
import CustomTextField from "src/utils/theme-elements/CustomTextField";

function CustomTabPanel(props: IShooterReport) {
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

const ShooterReport = () => {
  const options = ["option1", "option2"];
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
      <TableHead title="Shooter Reports" />
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", paddinBottom: "10px", mt: 1 }}>
            <Tabs value={value} onChange={handelTab} sx={{ height: "40px" }} aria-label="basic tabs example">
              <Tab label="Registered shooter report " {...a11yProps(0)} />
              <Tab label="Categorywise shooter report" {...a11yProps(1)} />
              <Tab label="Shooter payment receipt" {...a11yProps(2)} />
              <Tab label="Export shooter" {...a11yProps(3)} />
              <Tab label="Shooter ID expiration report" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid item lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                    {" "}
                    Event Type <b style={{ color: "red" }}>*</b>{" "}
                  </CustomFormLabel>
                  <Select id="eventtype" name="eventType" value="Type" onChange={handleChange}>
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
                    Category<b style={{ color: "red" }}>*</b>{" "}
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
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-location">
                    Shooter Name *
                  </CustomFormLabel>
                  <Autocomplete disablePortal id="combo-box-demo" options={options} renderInput={(params) => <CustomTextField {...params} />} />
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
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="bi-address">
                  From Date <b style={{ color: "red" }}>*</b>{" "}
                </CustomFormLabel>

                <CustomOutlinedInput
                  startadornment={
                    <InputAdornment position="start">
                      <IconAddressBook size="20" />
                    </InputAdornment>
                  }
                  id="bi-address"
                  placeholder="Date from"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="bi-address">
                  To Date <b style={{ color: "red" }}>*</b>
                </CustomFormLabel>

                <CustomOutlinedInput
                  startadornment={
                    <InputAdornment position="start">
                      <IconAddressBook size="20" />
                    </InputAdornment>
                  }
                  id="bi-address"
                  placeholder="Date from"
                  type="date"
                  fullWidth
                />
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
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    <FormControl fullWidth>
                      <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-location">
                        Shooter Name *
                      </CustomFormLabel>
                      <Autocomplete disablePortal id="combo-box-demo" options={options} renderInput={(params) => <CustomTextField {...params} />} />
                      {/* {error. && (
                                  <FormHelperText>Select a state (this field is required).</FormHelperText>
                              )} */}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="bi-address">
                  From Date <b style={{ color: "red" }}>*</b>{" "}
                </CustomFormLabel>

                <CustomOutlinedInput
                  startadornment={
                    <InputAdornment position="start">
                      <IconAddressBook size="20" />
                    </InputAdornment>
                  }
                  id="bi-address"
                  placeholder="Date from"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="bi-address">
                  To Date <b style={{ color: "red" }}>*</b>
                </CustomFormLabel>

                <CustomOutlinedInput
                  startadornment={
                    <InputAdornment position="start">
                      <IconAddressBook size="20" />
                    </InputAdornment>
                  }
                  id="bi-address"
                  placeholder="Date from"
                  type="date"
                  fullWidth
                />
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

export default ShooterReport;
