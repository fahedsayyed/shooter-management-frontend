import DataTable from "../../../components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Paper, Accordion, AccordionSummary, Typography, AccordionDetails, FormControlLabel, Button, FormControl, Stack } from "@mui/material";

import { IconChevronDown } from "@tabler/icons";
import CustomCheckbox from "src/utils/theme-elements/CustomCheckbox";
import { IShowListing } from "src/types/AllMatchParticipation";
import { useState } from "react";

function DisApprovedList() {
    
  const [selected, setSelected] = useState<any>([]);

  const checkLabels = ["paid Amount", "DRA/Club Of Representaion"];

  const handleSelect = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item: string) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: " Sr. No", width: 100 },
    { field: "firstName", headerName: "Shooter name", width: 200 },
    { field: "lastName", headerName: "DRA/RC/UNIT", width: 200 },
    { field: "role", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  const rows: IShowListing[] = [
    { id: 1, lastName: "Snow", firstName: "Jon", status: "Recomended By Unit", role: "software developer" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", status: "Recomended By Club", role: "software developer" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", status: "Recomended By Unit", role: "software developer" },
    { id: 4, lastName: "Stark", firstName: "Arya", status: "Recomended By Unit", role: "software developer" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", status: "Recomended By Unit", role: "software developer" },
    { id: 6, lastName: "Melisandre", firstName: "Targaryen", status: "Recomended By Unit", role: "software developer" },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", status: "Recomended By Unit", role: "software developer" },
    { id: 8, lastName: "Frances", firstName: "Rossini", status: "Recomended By Unit", role: "software developer" },
    { id: 9, lastName: "Roxie", firstName: "Harvey", status: "Recomended By Unit", role: "software developer" },
  ];

  const selectAllChecks = () => {
    if (selected.length === checkLabels.length) {
      setSelected([]);
    } else {
      setSelected(checkLabels);
    }
  };

  const isAllChecked = selected.length === checkLabels.length;

  return (
    <>
      <Box>
              <Accordion>
                <AccordionSummary expandIcon={<IconChevronDown />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="subtitle1" color="#000">
                    Export Disapproved Participation List
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: "100%" }}>
                    <FormControl sx={{ width: "100%" }}>
                      <Stack direction="row" width="100%" sx={{ gap: 2, flexWrap: "wr" }} spacing={3}>
                        {checkLabels.map((item: any) => (
                          <FormControlLabel
                            key={item}
                            control={<CustomCheckbox color="success" checked={selected.includes(item)} onChange={() => handleSelect(item)} />}
                            label={item}
                          />
                        ))}
                        <FormControlLabel control={<CustomCheckbox color="success" name="select-all" checked={isAllChecked} onChange={selectAllChecks} />} label="Select All" />
                        <Button sx={{ height: "fit-content" }} variant="outlined" color="info">
                          Export
                        </Button>
                      </Stack>
                    </FormControl>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Paper>
              {/* <DataTable rows={rows} columns={columns} /> */}
            </Paper>
    </>
  )
}

export default DisApprovedList;