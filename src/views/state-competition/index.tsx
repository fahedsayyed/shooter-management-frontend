import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardContent, Typography, Grid, Divider, Avatar, Box, Stack, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import img1 from "../../assets/images/logos/competition.png";
import BlankCard from "src/components/shared/BlankCard";
import APP_ROUTES from "src/routes/routePaths";
import TableHead from "src/components/table-head";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { useDispatch } from "react-redux";
import { fetchCompetitionListStart } from "src/store/reducers/matchParticipationSlice";

// const competitions = [
//     {
//         id: 1,
//         routeName: 'mssc-2023',
//         name: 'MSSC 2023 [R&P]',
//         img: img1,
//     },
//     {
//         id: 2,
//         routeName: '38-mssc',
//         name: '38 MSSC SHOTGUN',
//         img: img1,
//     },
// ];

const StatUpcomingCompetition = () => {
  const { routeName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(true);

  const competitions = useSelector((state: AppState) => state.competition.competition);

  useEffect(() => {
    dispatch(fetchCompetitionListStart());
  }, [dispatch]);

  console.log(competitions, "competitions");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const showAthleteListing = (comp_id: number,code:any) => {
    console.log(comp_id,"comp_id")
    navigate(`${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/dashboard/${code}/${comp_id}`);
  };

  return (
    <>
      <TableHead title="All Available competitions" />
      <Grid container spacing={3} mt={3}>
        {competitions.map((competition: any) => (
          <Grid item xs={6} sm={3} md={4} key={competition.id}>
            <BlankCard>
              <CardContent sx={{ cursor: "pointer" }}>
                <div style={{ color: "#000" }} onClick={() => showAthleteListing(competition.id,competition.comp_code)}>
                  <Stack direction={"column"} gap={2} alignItems="center">
                    {isLoading ? (
                      <Skeleton variant="rectangular" animation="wave" width="100%" height={80}></Skeleton>
                    ) : (
                      <Avatar alt="Remy Sharp" src={img1} sx={{ width: "80px", height: "80px" }} />
                    )}
                    <Box textAlign={"center"}>
                      <Typography variant="body1">{competition.comp_code}</Typography>
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

export default StatUpcomingCompetition;
