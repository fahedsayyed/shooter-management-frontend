import { Button, CardContent, Grid, MenuItem, Stack } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import TableHead from "src/components/table-head";
import PageContainer from "../../components/page-container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import React, { ChangeEvent } from "react";
import { RequiredStar } from "src/components/required-star";
// import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { Competition } from "src/types/Records";

const AddRecord = () => {
  const [competitions, setCompetitions] = React.useState<Competition[]>([{ type: "select competition", shooter: "" }]);

  const handleAddMore = () => {
    setCompetitions([...competitions, { type: "select competition", shooter: "" }]);
  };

  const handleCompetitionChange = (index: number, field: keyof Competition, value: string) => {
    const newCompetitions = [...competitions];
    newCompetitions[index][field] = value;
    setCompetitions(newCompetitions);
  };

  const handleRemove = () => {
    if (competitions.length > 1) {
      const newCompetitions = [...competitions];
      newCompetitions.pop();
      setCompetitions(newCompetitions);
    }
  };
  console.log(competitions, "comp");

  return (
    <>
      <PageContainer title="Records" description="this is Add Record Page">
        <ParentCard title="">
          <>
            <Grid sx={{ marginTop: "-35px" }}>
              <TableHead title="Add Record" />
            </Grid>
            <CardContent>
              <form>
                <Grid container columnSpacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <CustomFormLabel htmlFor="text-location">
                      Score Type <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect fullWidth className="custom-select" id="tenent-type" variant="outlined" name="tenentType" required>
                      <MenuItem value="Qualification Score">Qualification Score</MenuItem>
                      <MenuItem value="Final Score">Final Score</MenuItem>
                    </CustomSelect>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <CustomFormLabel htmlFor="text-location">
                      Competition Category <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect fullWidth className="custom-select" id="tenent-type" variant="outlined" name="tenentType" required>
                      <MenuItem value="state">State</MenuItem>
                      <MenuItem value="club">Club</MenuItem>
                    </CustomSelect>
                  </Grid>
                  {/* <Grid>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                            <Button variant="outlined" sx={{ width: '10px', textAlign: 'center' }} ><AddIcon /></Button>
                                
                                    <Button variant="outlined" sx={{ width: '20px', textAlign: 'center', ml: 0.5 }} >
                                      
                                    </Button>   
                              
                           </div>
                           </Grid> */}
                  <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ position: "relative", mt: 1 }}>
                      <Grid item xs={12} textAlign={"right"} mr={2} sx={{display:'flex',justifyContent:'flex-end',gap:'10px'}}>
                        <Button onClick={handleAddMore}>Add More</Button>
                        <Button color="error" onClick={handleRemove}>
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                    {competitions.map((competition, index) => (
                      <Grid container key={index} spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                          <CustomFormLabel sx={{ mt: 0 }} htmlFor={`competition-type-${index}`}>
                            Competition <RequiredStar />
                          </CustomFormLabel>
                          <CustomSelect
                            fullWidth
                            className="custom-select"
                            id={`competition-type-${index}`}
                            variant="outlined"
                            name="competitionType"
                            value={competition.type}
                            onChange={(e: ChangeEvent<{ value: unknown }>) => handleCompetitionChange(index, "type", e.target.value as string)}
                          >
                            <MenuItem value="select competition">select competition</MenuItem>
                            <MenuItem value="club">Club</MenuItem>
                          </CustomSelect>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <CustomFormLabel sx={{ mt: 0 }} htmlFor={`shooter-name-${index}`}>
                            Select Shooter <RequiredStar />
                          </CustomFormLabel>
                          <CustomTextField
                            id={`shooter-name-${index}`}
                            name={`shooterName-${index}`}
                            variant="outlined"
                            fullWidth
                            value={competition.shooter}
                            onChange={(e: ChangeEvent<{ value: unknown }>) => handleCompetitionChange(index, "shooter", e.target.value as string)}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <CustomFormLabel marginTop={0} htmlFor="text-address">
                      Select Event <RequiredStar />
                    </CustomFormLabel>
                    <CustomSelect fullWidth className="custom-select" id="tenent-type" variant="outlined" name="tenentType" required>
                      <MenuItem value="state">State</MenuItem>
                      <MenuItem value="club">Club</MenuItem>
                    </CustomSelect>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <CustomFormLabel htmlFor="text-address">
                      Score <RequiredStar />
                    </CustomFormLabel>
                    <CustomTextField id="text-address3" name="city" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }} mt={3}>
              <Button variant="contained" color={"secondary"}>
                save
              </Button>
            </Stack>
          </>
        </ParentCard>
      </PageContainer>
    </>
  );
};

export default AddRecord;
