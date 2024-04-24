import React from "react";
import { useLocation } from "react-router";
import { Table, TableBody, TableRow, TableCell, TableContainer, Box, Grid } from "@mui/material";

import TableHead from "src/components/table-head";
import BlankCard from "src/components/shared/BlankCard";
import BackLink from "src/components/back-link";
import APP_ROUTES from "src/routes/routePaths";
import PageContainer from "src/components/page-container/PageContainer";

type TableRowData = {
  label: string;
  value: any;
  cellStyle?: React.CSSProperties;
};

type TableSection = {
  subheading: string;
  rows: TableRowData[];
};

function ViewShooterHistory() {
  const location: any = useLocation();
  const {
    shooter_id,
    shooter_name,
    gender,
    dob,
    email,
    phone,
    state,
    address,
    events,
    club_name,
    shoe_size,
    weight,
    track_suit_size,
    trained_by,
    gold_medal,
    silver_medal,
    bronze_medal,
  } = location.state.row;

  const cellStyle = {
    width: "calc(100% - 50%)",
    textAlign: "left",
    fontSize: "0.8rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderLeft: "1px solid #ccc",
  };

  const cellStyleGoldMedal: React.CSSProperties = {
    width: "calc(100% - 50%)",
    textAlign: "left",
    fontSize: "0.8rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderLeft: "1px solid #ccc",
    backgroundColor: "#dac12080",
  };

  const cellStyleSilverMedal: React.CSSProperties = {
    backgroundColor: "#C0C0C0",
    width: "calc(100% - 50%)",
    textAlign: "left",
    fontSize: "0.8rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderLeft: "1px solid #ccc",
  };

  const cellStyleBronzeMedal: React.CSSProperties = {
    backgroundColor: "#cd7f3299",
    width: "calc(100% - 50%)",
    textAlign: "left",
    fontSize: "0.8rem",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    borderLeft: "1px solid #ccc",
  };

  const tableSections: TableSection[] = [
    {
      subheading: "Personal Data",
      rows: [
        { label: "Shooter ID:", value: shooter_id },
        { label: "Shooter Name:", value: shooter_name },
        { label: "Gender:", value: gender },
        { label: "Date of Birth:", value: dob },
        { label: "Email:", value: email },
        { label: "Phone:", value: phone },
        { label: "State:", value: state },
        { label: "Address:", value: address },
      ],
    },
    {
      subheading: "Professional Data",
      rows: [
        { label: "Event:", value: events },
        { label: "Club Name:", value: club_name },
        { label: "Shoe Size:", value: shoe_size },
        { label: "Weight:", value: weight },
        { label: "Track Suit Size:", value: track_suit_size },
        { label: "Trained By:", value: trained_by },
      ],
    },
    {
      subheading: "Achievements",
      rows: [
        { label: "Gold Medals:", value: gold_medal, cellStyle: cellStyleGoldMedal },
        { label: "Silver Medals:", value: silver_medal, cellStyle: cellStyleSilverMedal },
        { label: "Bronze Medals:", value: bronze_medal, cellStyle: cellStyleBronzeMedal },
      ],
    },
    {
      subheading: "History",
      rows: [],
    },
  ];

  // const handleBack = () => {
  //   navigate("/shooters-history");
  // };

  return (
    <>
      <BackLink title="Back to the Shooter History Page" route={APP_ROUTES.SHOOTERS_HISTORY} />
      <PageContainer>
        <BlankCard>
          <Box p={2} textAlign="left">
            <Grid sx={{ padding: "0px" }}>
              <TableHead title="View Shooter History"></TableHead>
            </Grid>
            <TableContainer style={{ border: "1px solid #f2f2f2", marginTop: "24px" }}>
              <Table>
                <TableBody style={{ width: "100%" }}>
                  <TableRow></TableRow>
                  {tableSections.map((section, index) => (
                    <React.Fragment key={index}>
                      {/* Subheading */}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ fontSize: "1rem", fontWeight: "bold", backgroundColor: "#ECF2FF", padding: "30px" }}>
                          {section.subheading}
                        </TableCell>
                      </TableRow>
                      {/* Rows */}
                      {section.rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell sx={row.cellStyle || cellStyle}>{row.label}</TableCell>
                          <TableCell sx={row.cellStyle || cellStyle}>{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </BlankCard>
      </PageContainer>
    </>
  );
}

export default ViewShooterHistory;
