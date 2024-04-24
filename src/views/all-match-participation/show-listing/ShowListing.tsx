import React, { useState } from "react";

import { Box, Tab} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { IconTargetArrow, IconClipboardData, IconCircleMinus, IconArrowNarrowLeft } from "@tabler/icons-react";
import APP_ROUTES from "src/routes/routePaths";
import { Link } from "react-router-dom";
import PendingList from "./pendingList";
import ApprovedList from "./approvedList";
import DisApprovedList from "./disApprovedList";

const ShowListing = () => {

  const [value, setValue] = React.useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "16px" }} to={`${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}`}>
        <IconArrowNarrowLeft stroke={1.6} /> Back to the All Match Participation Report
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
            <PendingList/>
          </TabPanel>
          <TabPanel value="2">
            <ApprovedList/>
          </TabPanel>
          <TabPanel value="3">
            <DisApprovedList/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ShowListing;
