// import BlankCard from "src/components/shared/BlankCard"
import PageContainer from "../../components/page-container/PageContainer";
import { Grid, Box, useMediaQuery } from "@mui/material";
import MainTab from "./MainTabs";

function StsPaymentReport() {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <PageContainer title="STS PAYMENT REPORT" description="this is STS PAYMENT REPORT page">
      <Grid item xs={12}>
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
          }}
        >
          <MainTab />
        </Box>
      </Grid>
    </PageContainer>
  );
}

export default StsPaymentReport;
