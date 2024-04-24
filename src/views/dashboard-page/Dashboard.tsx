import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import TopCards from "./topcards";
import TableList from "./table";
import Cards from "./sideCard";

const Dashboard = () => {
  return (
    <>
      {/* <Breadcrumb title="Dashboard page" items={BCrumb} /> */}
        <Cards />
      <Grid mt={2}>
        <TableList />
      </Grid>
    </>
  );
};

export default Dashboard;
