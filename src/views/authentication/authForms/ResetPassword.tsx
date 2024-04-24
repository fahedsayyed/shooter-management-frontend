import React, {useEffect} from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomFormLabel from 'src/utils/theme-elements/CustomFormLabel';
import CustomTextField from 'src/utils/theme-elements/CustomTextField';
import PageContainer from 'src/components/page-container/PageContainer';
import { Box } from '@mui/system';
import Logo from 'src/layouts/full/shared/logo/Logo';
import ShooterImg from "../../../assets/images/backgrounds/shooter.png";
import axios from 'axios';
import axiosServices from 'src/utils/axios';
import { notifyMessage } from 'src/utils/toastNotify';


const ResetPassword = () => {
    const navigate = useNavigate();
    const [tk, setTk] = React.useState<any>()
    
    const getTokenFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);

        return urlParams.get('token');
    };

    useEffect(() => {
        const token = getTokenFromUrl();
        setTk(token)
        console.log(token);
    }, []);

    const [userPassword, setUserPassword] = React.useState({ currentPassword: "", newPassword: "" });

    const changePassword = async () => {
        console.log("hi");
    
        try {
            if (!tk) {

                return;
            }
    
            if (!userPassword.currentPassword || !userPassword.newPassword) {
                notifyMessage.warning("Fill the password details");

                return;
            }
    
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/athlete/update-password?token=${tk}`, userPassword);
            console.log(res, 'response update password --');
    
            if (res.status !== 200) {
                if (res.status === 401) {
                    notifyMessage.warning("Invalid current password");
                } else {
                    notifyMessage.warning("Fill the password details");
                }
            } else {
                notifyMessage.success("Password updated successfully");
                navigate('/auth/login');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                notifyMessage.error("Invalid current password");
            } else if (error.response) {
                notifyMessage.error(error.response.data.message[0].message);
            } else {
                notifyMessage.error(error.toString());
            }
            console.log(error, 'from update password --');
        }
    };
    
    

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;

        setUserPassword((prevData: any) => {
            const newData = { ...prevData, [name]: value };

            return newData;
        });
    };

    return (
        <>

            <PageContainer title="Login" description="this is update password page">
                <Grid container spacing={3} sx={{ overflowX: "hidden" }}>
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
                    <Grid item xs={12} sm={12} lg={5} xl={4} >

                        <Stack direction='column' height='100%' alignItems='center' width='100%' justifyContent='center'>
                            <Box sx={{ width: '90%' }}>
                                <CustomFormLabel htmlFor="bi-name" > Current Password </CustomFormLabel>
                                <CustomTextField id="bi-name"
                                    placeholder="Current Password"
                                    name="currentPassword"
                                    value={userPassword.currentPassword}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{ width: '90%' }}>
                                <CustomFormLabel htmlFor="bi-name"> New Password </CustomFormLabel>
                                <CustomTextField id="bi-name" placeholder="New Password"
                                    name="newPassword"
                                    value={userPassword.newPassword}
                                    onChange={handleChange}
                                    error={""}
                                    helperText={""}
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ width: '90%', mt: 2 }}>
                                <Button color="primary" size="medium" fullWidth onClick={changePassword} > Click Next </Button>
                            </Box>
                        </Stack>

                    </Grid>
                </Grid>
            </PageContainer>

        </>
    )
}
export default ResetPassword;
