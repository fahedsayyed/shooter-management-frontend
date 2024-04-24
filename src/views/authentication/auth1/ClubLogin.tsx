import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Stack, Typography } from "@mui/material";
import Logo from "src/layouts/full/shared/logo/Logo";
import AuthLogin from "../authForms/AuthLogin";
import PageContainer from "src/components/page-container/PageContainer";
import APP_ROUTES from "src/routes/routePaths";
import ShooterImg from "../../../assets/images/backgrounds/shooter.png";

const ClubLogin = () => (
  <PageContainer title="Login" description="this is Login page">
    <Grid container spacing={0} sx={{ overflowX: "hidden" }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={"calc(100vh - 75px)"}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <img
              src={ShooterImg}
              alt="bg"
              style={{
                width: "100%",
                maxWidth: "400px",
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={5} xl={4} display="flex" justifyContent="center" alignItems="center">
        <Box p={4}>
          <AuthLogin
            title="Welcome to Shooting Management"
            subtext={<Typography variant="subtitle1" color="textSecondary" mb={1}></Typography>}
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to Shooting Management?
                </Typography>
                <Typography
                  component={Link}
                  to={`${APP_ROUTES.ATHLETE_CLUB_REGISTER}`}
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Register to club
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default ClubLogin;
