import { Grid, Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import ParentCard from "src/components/shared/ParentCard";
import userimg from "src/assets/images/profile/user-1.jpg";
import { useNavigate } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import BackLink from "src/components/back-link";
import PageContainer from "src/components/page-container/PageContainer";

function ViewRenewal() {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50b2fc,#f44c66)",
    borderRadius: "50%",
    width: "110px",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }));

  const handleCancel = () => {
    navigate(`${APP_ROUTES.RENEWAL}`);
  };

  return (
    <>
      <BackLink title="Back to the Renewal Page" route={APP_ROUTES.RENEWAL} />
      <PageContainer>
        <Box
          sx={{
            flexShrink: 0,
            border: "0",
            borderLeft: "1px",
            borderStyle: "solid",
            right: "0",
            background: (theme) => theme.palette.background.paper,
            boxShadow: "3",
            position: lgUp ? "relative" : "absolute",
            borderColor: (theme) => theme.palette.divider,
            marginTop: "0px",
          }}
        >
          {/* <TableHead title='Edit User' /> */}
          <ParentCard
            title=""
            footer={
              <>
                <Button
                  color="error"
                  onClick={handleCancel}
                  sx={{
                    ml: 1,
                  }}
                >
                  cancel
                </Button>
              </>
            }
          >
            <>
              {/* <Alert severity="info">Edit Info</Alert> */}
              <TableHead title="Renewal Details" />
              <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", boxShadow: "lg", alignItems: "center", marginRight: "20%", gap: "100px" }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid sx={{ display: "flex" }}>
                    <CustomFormLabel htmlFor="lname-text">Registration Status :</CustomFormLabel>
                    <CustomFormLabel style={{ marginLeft: "8px" }}>APPROVED</CustomFormLabel>
                  </Grid>
                  <Grid sx={{ display: "flex" }}>
                    <CustomFormLabel htmlFor="lname-text">Renewal Status : </CustomFormLabel>
                    <CustomFormLabel style={{ marginLeft: "8px" }}>APPROVED</CustomFormLabel>
                  </Grid>
                  <Grid sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Grid sx={{ display: "flex" }}>
                      <span>Email Id : </span>
                      <p style={{ marginLeft: "8px" }}>mitaleekamble24@yopmail.com</p>
                    </Grid>
                    <Grid sx={{ display: "flex" }}>
                      <span>Contact No : </span>
                      <p style={{ marginLeft: "8px" }}>9869535151</p>
                    </Grid>
                    <Grid sx={{ display: "flex" }}>
                      <span>Shooter Id </span>
                      <p style={{ marginLeft: "8px" }}>MHPF2409199301MS</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ position: "relative" }}>
                  <ProfileImage>
                    <Avatar
                      src={userimg}
                      alt={userimg}
                      sx={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        border: "4px solid #fff",
                      }}
                    />
                  </ProfileImage>
                  <Box mt={1}>
                    <Typography fontWeight={600} variant="h5">
                      Name : Mathew Anderson
                    </Typography>
                    <Typography color="textSecondary" variant="h6" fontWeight={400}>
                      awardee : Designer
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          </ParentCard>
        </Box>
      </PageContainer>
    </>
  );
}

export default ViewRenewal;
