import React, { useEffect, useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Divider, FormControl, MenuItem, CircularProgress } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginType } from "src/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { clearToken, setToken } from "src/store/slices/authToken";
import { useDispatch } from "react-redux";
import { notifyMessage } from "src/utils/toastNotify";
import Cookies from "js-cookie";
import APP_ROUTES from "src/routes/routePaths";
import axios from "axios";
import axiosServices, { startTokenRefreshTimer } from "src/utils/axios";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { fetchClubAndDraListRequest } from "src/store/reducers/TenentSlice";


const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const tokenRedux = useSelector((state: AppState) => state.authToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "", state: "" });
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const [allStateUnits, setAllStateUnits] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const clubAndDra = useSelector((state: AppState) => state.tenent.clubAndDra)

  console.log(clubAndDra, "clubAndDra")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const obtainToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, loginData);
      startTokenRefreshTimer();

      return response;
    } catch (error: any) {
      console.error("Login API error:", error.message);
      throw error;
    }
  };

  const handleSignIn = async () => {
    try {
      setButtonLoad(true);

      const response = await obtainToken();

      if (response.status === 200) {
        const userRole = response.data.payload.role;

        const obtainedToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        console.log(obtainedToken, "----------Login--------");

        dispatch(setToken({ token: obtainedToken, role: userRole, timer: null }));

        console.log(response, userRole, obtainedToken, refreshToken, "user response --");

        localStorage.setItem("accessToken", obtainedToken);
        localStorage.setItem("refreshToken", refreshToken);

        Cookies.set("accessToken", obtainedToken, { secure: true, sameSite: "None" });
        Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "None" });

        notifyMessage.success("Login successful!");

        const dashboardRoute =
          userRole === "superadmin"
            ? APP_ROUTES.ADMIN_DASHBOARD
            : userRole === "admin"
              ? APP_ROUTES.STATE_ADMIN_DASHBOARD
              : userRole === "club_athlete"
                ? APP_ROUTES.ATHLETE_CLUB_ONLY
                : APP_ROUTES.ATHLETE_ONLY;
        navigate(dashboardRoute);
      } else {
        notifyMessage.warning("Invalid Entry Found !");
      }

      setButtonLoad(false);
    } catch (error) {
      console.error("Login failed:", error);
      notifyMessage.error("Invalid Credentials !");
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSignIn();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleSignIn]);

  useEffect(() => {

    dispatch(fetchClubAndDraListRequest());

  }, [dispatch]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/state-units`);
  //     setAllStateUnits(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography component="span" color="textSecondary" variant="h6" fontWeight="400" position="relative" px={2}>
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <Stack>
        <Box>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="state-unit-text"> State/Club representation </CustomFormLabel>
            <CustomSelect
              id="state"
              name="state"
              value={loginData.state}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clubAndDra ? (
                clubAndDra?.map((stateUnit: any) => (
                  <MenuItem key={stateUnit.id} value={stateUnit.name}>
                    {stateUnit.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>"NO STATE/UNITS FOUND"</MenuItem>
              )}
            </CustomSelect>
          </FormControl>
        </Box>
        <Box>
          <CustomFormLabel htmlFor="email">Your Email</CustomFormLabel>
          <CustomTextField id="username" variant="outlined" name="email" value={loginData.email} onChange={handleChange} fullWidth />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField id="password" type="password" variant="outlined" name="password" value={loginData.password} onChange={handleChange} fullWidth />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSignIn} type="submit">
          {buttonLoad ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
