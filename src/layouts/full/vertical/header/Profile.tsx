import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton
} from '@mui/material';
import * as dropdownData from './data';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import Cookies from 'js-cookie';

import { clearToken } from 'src/store/slices/authToken';
import { useSelector } from 'react-redux';
import { AppState, useDispatch } from 'src/store/Store';
import { IconPhoneCall, IconMail } from '@tabler/icons-react';
import { jwtDecode } from 'jwt-decode';
import { fetchAthleteData } from 'src/store/athlete-register-formdata/AthleteViewAndEdit';
import { stopTokenRefreshTimer } from 'src/utils/axios';

const Profile = () => {
  const { athleteResponse, isLoading } = useSelector((state: AppState) => state.viewAthlete);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [showRole, setShowRole] = useState();
  const [confirm, setConfirm] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken) {
        const { userId, role } = decodedToken;
        setShowRole(role);
      }
    }
  }, []);

  const handleLogout = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    setOpen(false)
    dispatch(clearToken());

    Cookies.remove('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('competition_remark');
    stopTokenRefreshTimer();

    navigate('/auth/login');
  }

  if (confirm) {
    handleConfirmLogout();
  }

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      {isLoading ? (<Skeleton animation="pulse" variant="circular" width={20} height={20} />) : <Box>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
          onClick={handleClick2}
        >
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '360px',
              p: 4,
            },
          }}
        >
          <Typography variant="h5">My Profile</Typography>
          {showRole === "athlete" ? (
            <div>
              <Stack direction="row" py={3} spacing={2} alignItems="center">
                <Avatar src={ProfileImg} alt={ProfileImg} sx={{ width: 95, height: 95 }} />
                <Box>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                    {athleteResponse?.first_name + athleteResponse?.last_name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <IconMail width={15} height={15} />
                    {athleteResponse?.email}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <IconPhoneCall width={15} height={15} />
                    {athleteResponse?.contact_number}
                  </Typography>
                </Box>
              </Stack>
            </div>
          ) : (
            <Stack direction="row" py={2} spacing={2} alignItems="center">
            <Avatar src={ProfileImg} alt={ProfileImg} sx={{ width: 55, height: 55 }} />
            <Box>
              <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                Welcome Admin
              </Typography>
            </Box>
          </Stack>
          )}
          <Divider />
          {dropdownData.profile.map((profile) => (
            <Box key={profile.title}>
              <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                <Link to={profile.href}>
                  <Stack direction="row" spacing={2}>
                    <Box
                      width="45px"
                      height="45px"
                      bgcolor="primary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={profile.icon}
                        alt={profile.icon}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 0,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        color="textPrimary"
                        className="text-hover"
                        noWrap
                        sx={{
                          width: '240px',
                        }}
                      >
                        {profile.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{
                          width: '240px',
                        }}
                        noWrap
                      >
                        {profile.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </Link>
              </Box>
            </Box>
          ))}
          <Box mt={2}>
            {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" mb={2}>
                Unlimited <br />
                Access
              </Typography>
              <Button variant="contained" color="primary">
                Upgrade
              </Button>
            </Box>
            <img src={unlimitedImg} alt="unlimited" className="signup-bg"></img>
          </Box>
        </Box> */}
            <Button /* to="/auth/login" */ onClick={handleLogout} variant="outlined" color="primary" /* component={Link} */ fullWidth>
              Logout
            </Button>
          </Box>
        </Menu>
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => setConfirm(true)} color="error" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>}
    </div>
  )
};

export default Profile;
