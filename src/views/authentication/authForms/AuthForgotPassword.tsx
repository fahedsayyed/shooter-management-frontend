import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, MenuItem, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomFormLabel from 'src/utils/theme-elements/CustomFormLabel';
import CustomTextField from 'src/utils/theme-elements/CustomTextField';
import axiosServices from 'src/utils/axios';
import { notifyMessage } from 'src/utils/toastNotify';
import axios from 'axios';


const AuthForgotPassword = () => {
  const navigate = useNavigate();

  const [allStateUnits, setAllStateUnits] = useState([])
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    stateUnit: "",
  })

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/state-units`);
      setAllStateUnits(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFillDetails = async () => {
    try {
      setLoading(true);

      if (!userDetails.email || !userDetails.stateUnit) {
        notifyMessage.warning("Fill the password details");

        return;
      }

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/athlete/forgot-password`, userDetails);

      if (res.status !== 201) {
        notifyMessage.warning("Fill the input details");
      } else {
        notifyMessage.success("Email has been sent to you.");
      }

      setLoading(false);
    } catch (error: any) {
      notifyMessage.error(error.response.data.error)
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleFillDetails();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleFillDetails]);



  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserDetails((prevData: any) => {
      const newData = { ...prevData, [name]: value };

      return newData;
    });
  };

  return (
    <>
      <Stack mt={4} spacing={1}>
        <FormControl fullWidth>
          <CustomFormLabel htmlFor="state-unit-text"> State/Unit representation </CustomFormLabel>
          <CustomTextField
            select
            id="stateUnit"
            name="stateUnit"
            value={userDetails.stateUnit}
            onChange={handleChange}
            menuprops={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allStateUnits ? allStateUnits?.map((stateUnit: any) => (
              <MenuItem key={stateUnit.id} value={stateUnit.name}>
                {stateUnit.name}
              </MenuItem>
            )) : (
              <MenuItem>"NO STATE/UNITS FOUND"</MenuItem>
            )}
          </CustomTextField>
        </FormControl>

        <FormControl>
          <CustomFormLabel htmlFor="reset-email" sx={{ mt: 0 }}>Email Adddress</CustomFormLabel>
          <CustomTextField id="reset-email" variant="outlined" name="email" value={userDetails.email} onChange={handleChange} fullWidth />
        </FormControl>

        <Button color="primary" variant="contained" size="medium" fullWidth onClick={handleFillDetails} >
          Click Next {loading && <CircularProgress size={24} color="inherit" />}
        </Button>

        <Button color="primary" variant='outlined' size="medium" fullWidth component={Link} to="/auth/login">
          Back to Login page
        </Button>
      </Stack>
    </>
  )
};

export default AuthForgotPassword;
