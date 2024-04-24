import React from "react";
import {  useNavigate } from "react-router-dom";
import { CardContent, Typography, Grid, Divider, Avatar, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import img1 from "../../../assets/images/logos/competition.png";
import BlankCard from "src/components/shared/BlankCard";
import APP_ROUTES from "src/routes/routePaths";

const competitions = [
  {
    id: 1,
    name: "Entry Form",
    route: "entry-form",
    img: img1,
  },
  {
    id: 2,
    name: "Match Participation",
    route: "upcoming-match-participation",
    img: img1,
  },
  {
    id: 3,
    name: "Weapon Carry",
    route: "/weapon-carry",
    img: img1,
  },
  {
    id: 3,
    name: "Competitor Card",
    route: "/competitor-card",
    img: img1,
  },
];

const AthleteUpcomingCompetitionDashboards = () => {
  const { routeName, comp_id } = useParams();

  const navigate = useNavigate();

  const navigateToEntryMatch = (route: any) => {
    if (route == "entry-form") {
      navigate(`${APP_ROUTES.ATHLETE_COMPETITION}/entry-form/${comp_id}`);
    }
    else{
    
      navigate(`${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/${route}/${comp_id}`);

    }
  };
  // const navigateToEntryMatch=(route:any)=>{
  //   navigate(`${APP_ROUTES.ATHLETE_COMPETITION}/dashboard-links/${routeName}${route}/${id}`)
  // }

  return (
    <>
      <Grid container spacing={3} mt={3}>
        {competitions.map((dashlinks) => (
          <Grid item xs={6} sm={4} md={3} key={dashlinks.id}>
            <BlankCard>
              <CardContent sx={{ cursor: "pointer" }}>
                <div style={{ color: "#000" }} onClick={() => navigateToEntryMatch(dashlinks.route)}>
                  <Stack direction={"column"} gap={2} alignItems="center">
                    <Avatar alt="dash-links" src={dashlinks.img} sx={{ width: "80px", height: "80px" }} />
                    <Box textAlign={"center"}>
                      <Typography variant="body2">{dashlinks.name}</Typography>
                    </Box>
                  </Stack>
                </div>
              </CardContent>
              <Divider />
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AthleteUpcomingCompetitionDashboards;
