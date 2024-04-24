import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Divider, Avatar, Box, Stack, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';
// import img1 from '../../../assets/images/profile/user-1.jpg'
import BlankCard from 'src/components/shared/BlankCard';
import APP_ROUTES from 'src/routes/routePaths';
import img1 from '../../../assets/images/logos/competition.png'


const competitions = [
    {
      id: 1,
      name: 'Entry Form',
      route: '/entry-form',
      img: img1,
    },
    {
      id: 2,
      name: 'Match Participation',
      route: '/match-participation',
      img: img1,
    },
    {
        id: 3,
        name: 'Weapon Carry',
        route: '/weapon-carry',
        img: img1,
      },
      {
        id: 3,
        name: 'Competitor Card',
        route: '/competitor-card',
        img: img1,
      },
  ];

const StateCompetitionDashboards = () => {
 const {routeName} = useParams();

  return (
   <>
        <Grid container spacing={3} mt={3}>
          {competitions.map((dashlinks) => (
            <Grid item xs={6} sm={4} md={3} key={dashlinks.id}>
              <BlankCard>
                <CardContent sx={{ cursor: 'pointer' }}>
                  <Link style={{ color: '#000' }} to={`${APP_ROUTES.STATE_COMPETITION}/dashboard-links/${routeName}${dashlinks.route}`}>
                    <Stack direction={'column'} gap={2} alignItems="center">
                        <Avatar alt="dahs-links" src={dashlinks.img} sx={{ width: '80px', height: '80px' }} />
                      <Box textAlign={'center'}>
                        <Typography variant="body2">{dashlinks.name}</Typography>
                      </Box>
                    </Stack>
                  </Link>
                </CardContent>
                <Divider />
              </BlankCard>
            </Grid>
          ))}
          </Grid>
   </>
  )
}

export default StateCompetitionDashboards