import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardContent, Typography, Grid, Divider, Avatar, Box, Stack, Skeleton } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import img1 from "../../../../assets/images/profile/user-1.jpg";
//import img1 from "../../assets/images/profile/user-1.jpg";
import BlankCard from "src/components/shared/BlankCard";
import APP_ROUTES from "src/routes/routePaths";
import axiosServices from "src/utils/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AppDispatch, AppState } from "src/store/Store";
import { Card } from "reactstrap";
import { fetchClubAthleteData, setShooterId } from "src/store/clubRegister/ClubAthleteViewEdit";

const ClubView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { athleteId, athleteResponse, isLoading } = useSelector((state: AppState) => state.viewClubAthlete);

  const tokenRedux = useSelector((state: AppState) => state.authToken);

  useEffect(() => {
    console.log(tokenRedux, "fdfdd");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken, "decoded");
      if (decodedToken) {
        const { state, email, role, userId } = decodedToken;
        dispatch(setShooterId(userId));
        dispatch(fetchClubAthleteData({ id: userId, state }));
      }
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={4} md={6}>
            <BlankCard>
              <Stack padding="50px" spacing={1} width="100%">
                <Skeleton animation="pulse" variant="circular" width={50} height={50} />
                <Skeleton animation="pulse" variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton animation="pulse" variant="text" sx={{ fontSize: "1rem" }} />
              </Stack>
            </BlankCard>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={4} md={6}>
            <BlankCard>
              <CardContent sx={{ cursor: "pointer" }}>
                <Link style={{ color: "#000" }} to={`${APP_ROUTES.ATHLETE_CLUB_VIEW}/${athleteId}`}>
                  <Stack direction={"column"} gap={2} alignItems="center">
                    <Avatar alt="Remy Sharp" src={img1} sx={{ width: "80px", height: "80px" }} />
                    <Box textAlign={"center"}>
                      <Typography variant="h5">View Your Profile</Typography>
                      <Typography variant="body1">{athleteResponse?.first_name + " " + athleteResponse?.last_name}</Typography>
                    </Box>
                  </Stack>
                </Link>
              </CardContent>
              <Divider />
            </BlankCard>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ClubView;
