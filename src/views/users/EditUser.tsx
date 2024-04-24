import React, { useEffect, useState } from "react";
import { Grid, MenuItem, FormControlLabel, Button, Checkbox, FormControl, FormHelperText } from "@mui/material";
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
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { IUser } from "src/types/User";
import BackLink from "src/components/back-link";

interface inputDataType {
  value: string;
  label: string;
}

const role: inputDataType[] = [
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
const gender: inputDataType[] = [
  {
    value: "MALE",
    label: "MALE",
  },
  {
    value: "FEMALE",
    label: "FEMALE",
  },
  {
    value: "OTHERS",
    label: "OTHERS",
  },
];

const competition: inputDataType[] = [
  {
    value: "Maharashtra Rifle Competition",
    label: "Maharashtra Rifle Competition",
  },
  {
    value: "Gujrat Rifle Competition",
    label: "Gujrat Rifle Competition",
  },
  {
    value: "Rajasthan Rifle Competition",
    label: "Rajasthan Rifle Competition",
  },
  {
    value: "Goa Rifle Competition",
    label: "Goa Rifle Competition",
  },
  {
    value: "Delhi Rifle Competition",
    label: "Delhi Rifle Competition",
  },
  {
    value: "Chennai Rifle Competition",
    label: "Chennai Rifle Competition",
  },
];

const EditUser = () => {
  const [inputData, setInputData] = React.useState<IUser>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    mob: "",
    gender: "",
    role: "",
    competition: "",
  });
  const [checked, setChecked] = useState();

  const errorInitialState: any = generateErrorInitialState(inputData);
  const [error, setError] = useState(errorInitialState);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange2 = (e: any) => {
    const { name, value } = e.target;

    // Additional validation for mobile number
    let fieldError = "";
    if (name === "mobile") {
      const isValidMobile = /^[0-9]{0,10}$/.test(value);
      if (!isValidMobile) {
        fieldError = "Mobile number should have 10 digits or less.";
      }
    }

    setInputData({ ...inputData, [name]: value });
    setError((prevErrors: any) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const checkError = (fieldName: keyof IUser) => {
    const newErrors: any = validateForm({ [fieldName]: inputData[fieldName] });
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  // const createFieldHandlers = (fieldName: keyof IUser) => ({
  //   onBlur: () => checkError(fieldName),
  // });
  const wholeError = () => {
    const newErrors = validateForm(inputData);
    setError(newErrors);
  };

  const handleCheckValue: any = (e: any) => {
    setChecked(e.target.checked);
  };

  const navigateToBack: any = () => {
    navigate(`${APP_ROUTES.USERS}`);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    wholeError();
    // Perform data validation here
    const check = Object.values(inputData).every((e) => e !== ""); //
    console.log(check, "check"); // If all values are non-empty, check will be true; otherwise, false.
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      // navigate("/railway-concession-certificate");
      notifyMessage.success("Saved successfully!!!");
    }
  };

  return (
    <>
      <BackLink title="Back to the User Page" route={APP_ROUTES.USERS} />

      <PageContainer title="" description="this is Custom Form page">
        {/* breadcrumb */}
        {/* <Breadcrumb title="Custom Form" subtitle="custom designed element" /> */}
        {/* end breadcrumb */}
        <ParentCard title="">
          <>
            {/* <Alert severity="info">Edit Info</Alert> */}
            <Grid sx={{ marginTop: "-35px" }}>
              <TableHead title="Edit User" />
            </Grid>

            <form>
              <Grid item lg={12} md={12} xs={12}>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="text-email">
                      First Name
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      variant="outlined"
                      name="firstname"
                      type="text"
                      value={inputData.firstname}
                      onChange={handleChange2}
                      error={!!error.firstname}
                      helperText={error.firstname}
                      onBlur={() => checkError("firstname")}
                      fullWidth
                    />
                    <CustomFormLabel htmlFor="text-email">
                      Email
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      // helperText="We'll never share your email with anyone else."
                      variant="outlined"
                      name="email"
                      type="email"
                      value={inputData.email}
                      onChange={handleChange2}
                      error={!!error.email}
                      helperText={error.email}
                      onBlur={() => checkError("email")}
                      fullWidth
                      // disabled
                    />
                    <FormControl error={!!error.gender} fullWidth>
                      <CustomFormLabel htmlFor="text-email">
                        Gender
                        <RequiredStar />
                      </CustomFormLabel>
                      <CustomSelect
                        id="text-email"
                        className="custom-select"
                        name="gender"
                        value={inputData.gender}
                        onChange={handleChange2}
                        error={!!error.gender}
                        helperText={error.gender}
                        onBlur={() => checkError("gender")}
                        fullWidth
                        variant="outlined"
                      >
                        {gender.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      {error.gender && <FormHelperText>Gender field is required.</FormHelperText>}
                    </FormControl>

                    <FormControl error={!!error.role} fullWidth>
                      <CustomFormLabel htmlFor="text-email">
                        Role
                        <RequiredStar />
                      </CustomFormLabel>
                      <CustomSelect
                        id="text-email"
                        className="custom-select"
                        name="role"
                        value={inputData.role}
                        onChange={handleChange2}
                        error={!!error.role}
                        helperText={error.role}
                        onBlur={() => checkError("role")}
                        fullWidth
                        variant="outlined"
                      >
                        {role.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      {error.role && <FormHelperText>Role field is required.</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="text-email">
                      Last Name
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      variant="outlined"
                      name="lastname"
                      type="text"
                      value={inputData.lastname}
                      onChange={handleChange2}
                      error={!!error.lastname}
                      helperText={error.lastname}
                      onBlur={() => checkError("lastname")}
                      fullWidth
                    />

                    <CustomFormLabel htmlFor="text-email">
                      Mobile Number
                      <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      variant="outlined"
                      type="number"
                      name="mob"
                      value={inputData.mob}
                      onChange={handleChange2}
                      error={!!error.mob}
                      helperText={error.mob}
                      onBlur={() => checkError("mob")}
                      fullWidth
                    />
                    <Grid sx={{ display: "flex" }}>
                      {" "}
                      <CustomFormLabel htmlFor="text-email">Is Competition user?</CustomFormLabel>
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
                        <FormControl error={!!error.competition} fullWidth>
                          <CustomFormLabel htmlFor="text-email">
                            Competition
                            <RequiredStar />
                          </CustomFormLabel>
                          <CustomSelect
                            id="text-email"
                            className="custom-select"
                            name="competition"
                            value={inputData.competition}
                            onChange={handleChange2}
                            error={!!error.competition}
                            helperText={error.competition}
                            onBlur={() => checkError("competition")}
                            fullWidth
                            variant="outlined"
                          >
                            {competition.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                          {error.competition && <FormHelperText>Competition field is required.</FormHelperText>}
                        </FormControl>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
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
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Submit
              </Button>
            </form>
          </>
        </ParentCard>
      </PageContainer>
    </>
  );
};

export default EditUser;
