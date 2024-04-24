import React, { useState } from "react";

import { Box, Tab} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { IconTargetArrow, IconClipboardData, IconCircleMinus, IconArrowNarrowLeft } from "@tabler/icons-react";
import APP_ROUTES from "src/routes/routePaths";
import { Link } from "react-router-dom";
import UpcomingMatchApprovedParticipationList from "./UpcomingMatchApprovedParticipationList";
import UpcomingPendingCompetitionList from "./UpcomingPendingCompetitionList";
import UpcomingMatchDisApprovedparticipationList from "./UpcomingMatchDisApprovedparticipationList";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";

const UpcomingCompetitionListing :any = () => {
  const response = useSelector((state:AppState)=>state.competition.response)
  const [value, setValue] = React.useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}`}>
        <IconArrowNarrowLeft stroke={1.6} /> Back to the All Match Participation
      </Link>
      <Box justifyContent={"end"} display="flex" flexDirection="column" sx={{ overflow: "auto", width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderRadius: "0" }}>
            <TabList centered sx={{ color: (theme) => theme.palette.grey[100] }} onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ width: "32%" }} wrapped icon={<IconTargetArrow />} iconPosition="start" label="Pending Match participation" value="1" />
              <Tab sx={{ width: "32%" }} wrapped icon={<IconClipboardData />} iconPosition="start" label="Match participation Listing" value="2" />
              <Tab sx={{ width: "32%" }} wrapped icon={<IconCircleMinus />} iconPosition="start" label="Disapproved Participation Listing" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UpcomingPendingCompetitionList/>
          </TabPanel>
          <TabPanel value="2">
            <UpcomingMatchApprovedParticipationList/>
          </TabPanel>
          <TabPanel value="3">
            <UpcomingMatchDisApprovedparticipationList/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default UpcomingCompetitionListing;
