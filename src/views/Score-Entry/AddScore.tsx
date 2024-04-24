import React, { useEffect, useState } from "react";
import { Grid, MenuItem, FormControlLabel, Button, Checkbox } from "@mui/material";
import PageContainer from "../../components/page-container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { useNavigate, useParams } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import TableHead from "src/components/table-head";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import NumberInputFields from "./NumberField";
import { RequiredStar } from "src/components/required-star";
import BackLink from "src/components/back-link";
import Scrollbar from "src/components/custom-scroll/Scrollbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import {
  addScoreEntryRequest,
  fetchAthleteByMatchStart,
  fetchMatchGroupDetailStart,
  fetchMatchGroupListStart,
  fetchMatchGroupSeriesTitleStart,
  fetchMatchesByMatchgroupIdStart,
} from "src/store/reducers/scoreEntry";
import { notifyMessage } from "src/utils/toastNotify";

interface currencyType {
  value: string;
  label: string;
}

const role: currencyType[] = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super Admin",
    label: "Super Admin",
  },
  {
    value: "Club Admin",
    label: "Club Admin",
  },
  {
    value: "Unit Admin",
    label: "Unit Admin",
  },
  {
    value: "Accountant",
    label: "Accountant",
  },
  {
    value: "Guest Shooter",
    label: "Guest Shooter",
  },
];

const AddScore = () => {
  const [matchGroupState, setMatchGroupState] = useState("");
  const [matchState, setMatchState] = useState("");
  const [competitorCode, setCompetitorCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [formState, setFormState] = useState({
    penalty: "",
    scores: Array(5).fill(0),
    series_score: {}, // Assuming 5 rounds, adjust the array length as needed
  });
  const [seriesType, setSeriesType] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { competitionId } = params;
  const competitionIdAsNumber = Number(competitionId);
  const matchGroup = useSelector((state: AppState) => state.scoreEntry.matchGroups);
  const matchesOfMatchgroupId = useSelector((state: AppState) => state.scoreEntry.matchesOfMatchgroupId);
  const athleteOfMatch = useSelector((state: AppState) => state.scoreEntry.athleteOfMatches);
  const matchGroupDetail = useSelector((state: AppState) => state.scoreEntry.matchGroupDetails);
  const seriesTitle = useSelector((state: AppState) => state.scoreEntry.seriesTitle);
  const scores = useSelector((state: AppState) => state.scoreEntry.scores);
  const totalScore = useSelector((state:AppState)=>state.scoreEntry.totalScore)
  const response = useSelector((state: AppState) => state.scoreEntry.response);
  let no_of_series, max_value;

  if (matchGroupDetail && matchGroupDetail.length > 0) {
    const [element] = matchGroupDetail;
    ({ no_of_series, max_value } = element);
  } else {
    
    no_of_series = 0; 
    max_value = 0;   
  }

  console.log(totalScore,"totalScore")
  useEffect(() => {
    if (competitionId) {
      dispatch(fetchMatchGroupListStart({ comp_id: competitionId }));
    }
  }, [dispatch, competitionId]);

  useEffect(() => {
    if (matchGroupState) {
      dispatch(fetchMatchesByMatchgroupIdStart({ matchGroupId: matchGroupState }));
      dispatch(fetchMatchGroupDetailStart({ matchGroupId: matchGroupState }));
    }
  }, [dispatch, matchGroupState]);

  useEffect(() => {
    if (matchGroupState && competitionId) {
      dispatch(fetchMatchGroupSeriesTitleStart({ matchGroupId: matchGroupState }));
    }
  }, [matchGroupState, competitionId, dispatch]);

  useEffect(() => {
    if (matchState) {
      dispatch(fetchAthleteByMatchStart({ comp_id: competitionId, matchGroupId: matchGroupState, matchId: matchState }));
    }
  }, [matchState, competitionId, dispatch, matchGroupState]);

  const calculateTotal = () => {
    const totalWithoutPenalty = formState.scores.reduce((acc, curr) => acc + curr, 0);
    console.log(totalWithoutPenalty, "---totalWithoutPenalty");
    
    const totalWithPenalty = totalWithoutPenalty - (checked ? parseInt(formState.penalty || "0", 10) : 0);
    console.log(totalWithPenalty, '---totalWithPenalty');
  
    return isNaN(totalWithPenalty) ? "" : totalWithPenalty.toString();
  };
  

  const handlePenaltyChange = (value: string) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      penalty: value,
    }));
  };
  

  const handleRoundChange = (roundIndex: number, value: any) => {
    setFormState((prevFormState) => {
      const { scores, series_score } = prevFormState;
  
      const updatedSeriesScore: any = { ...series_score };
  
      updatedSeriesScore[`round${roundIndex + 1}`] = value === "" ? 0 : parseInt(value, 10);
  
      const updatedScores = Object.values(updatedSeriesScore);
      
      return {
        ...prevFormState,
        scores: updatedScores,
        series_score: updatedSeriesScore,
      };
    });
  };
  

  const handleChangeForMatchGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatchGroupState(event.target.value);
  };

  const handleChangeForCompetitorCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompetitorCode(event.target.value);
  };

  const handleChangeForMatch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatchState(event.target.value);
  };

  const handleCheckValue: any = (e: any) => {
    setChecked(e.target.checked);
    const updatedScoreType = e.target.checked ? "series" : "";

    setSeriesType(updatedScoreType);
  };

  const navigateToBack: any = () => {
    navigate(`${APP_ROUTES.SCORE_ENTRY}`);
  };
  const submitScore = () => {
    const data = {
      competitionID: competitionIdAsNumber,
      matchGroupId: matchGroupState,
      competitor_code: parseInt(competitorCode),
      score_type: seriesType,
      ...(seriesType === "series" && { series_score: formState.series_score }),
      ...(seriesType !== "series" && { scores: scores }),
    };

    dispatch(addScoreEntryRequest({ data }));
    if (response.status == 201) {
      notifyMessage.success(response.data.message);
      navigate(`${APP_ROUTES.SCORE_ENTRY}`);
    } else {
      notifyMessage.error(response.data.error);
    }
  };

  return (
    <>
      <BackLink title="Back to the Score Entry Page" route={APP_ROUTES.SCORE_ENTRY} />
      <PageContainer title="" description="this is Custom Form page">
        <ParentCard title="">
          <>
            <TableHead title="Qualification Shotgun Score Entry Form" />
            <Grid container spacing={3} mb={3}>
              <Grid item lg={5} md={10} sm={10}>
                <CustomFormLabel htmlFor="fname-text">
                  Event Group
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect id="standard-select-currency" className="custom-select" value={matchGroupState} onChange={handleChangeForMatchGroup} fullWidth variant="outlined">
                  {!matchGroup ? (
                    <MenuItem>No Event Group Found For This Competition</MenuItem>
                  ) : (
                    matchGroup.map((match: any) => (
                      <MenuItem key={match.id} value={match.id}>
                        {match.name}
                      </MenuItem>
                    ))
                  )}
                </CustomSelect>
                <CustomFormLabel htmlFor="lname-text">
                  Competitor Number
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  className="custom-select"
                  value={competitorCode}
                  disabled={!matchState}
                  onChange={handleChangeForCompetitorCode}
                  fullWidth
                  variant="outlined"
                >
                
                  {!athleteOfMatch ? (
                    <MenuItem>No Athlete Found</MenuItem>
                  ) : (
                    athleteOfMatch?.map((option: any) => (
                      <MenuItem key={option.id} value={option.competitor_code}>
                        {`${option.competitor_code} \u00A0 - \u00A0 ${option.first_name} ${option.last_name}`}
                      </MenuItem>
                    ))
                  )}
                </CustomSelect>

                <Grid sx={{ display: "flex" }}>
                  {" "}
                  <CustomFormLabel htmlFor="fname-text">By Series?</CustomFormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedsmall"
                        onClick={handleCheckValue}
                        sx={{ marginTop: "20px", marginLeft: "5px" }}
                      />
                    }
                    label=""
                  />
                </Grid>
              </Grid>
              <Grid item lg={5} md={10} sm={10}>
                <CustomFormLabel htmlFor="fname-text">
                  Match
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  className="custom-select"
                  value={matchState}
                  onChange={handleChangeForMatch}
                  fullWidth
                  variant="outlined"
                  disabled={!matchGroupState}
                  sx={{
                    ...(matchGroupState && {
                      "&:disabled": {
                        backgroundColor: "black",
                      },
                    }),
                  }}
                >
                  {!matchesOfMatchgroupId ? (
                  <MenuItem>No Match Found For This Event Group</MenuItem>
                  ) : (
                     matchesOfMatchgroupId?.map((option: any) => (
                      <MenuItem key={option.value} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))
                  )
                 
                  }
                </CustomSelect>
                <CustomFormLabel htmlFor="df-email-address">
                  Squad
                  <RequiredStar />
                </CustomFormLabel>
                <CustomTextField id="df-email-address" helperText="We'll never share your email with anyone else." variant="outlined" fullWidth />
              </Grid>
            </Grid>

            <Grid container>
              {checked && matchGroupState ? (
                <Grid container spacing={1}>
                  {[...Array(no_of_series)].map((_, index) => (
                    <Grid item xs={2.2} lg={2.2} md={2.2} key={index}>
                      <CustomFormLabel>{!seriesTitle[index]?.title ? `Round ${index + 1}` : `${seriesTitle[index]?.title}`}</CustomFormLabel>
                      <CustomTextField fullWidth type='number' onChange={(e: any) => handleRoundChange(index, e.target.value)} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                matchGroupState && (
                  <Grid container>
                    <Grid item xs={12}>
                      <Scrollbar sx={{ width: "110%", overflowX: "hidden" }}>
                        <NumberInputFields
                          comp_id={competitionId}
                          matchGroupDetail={matchGroupDetail}
                          matchGroupState={matchGroupState}
                          matchState={matchState}
                          competitorCode={competitorCode}
                          seriesTitle={seriesTitle}
                        />
                      </Scrollbar>
                    </Grid>
                  </Grid>
                )
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3} lg={3} md={3}>
                <CustomFormLabel>Shoot Off</CustomFormLabel>
                <CustomTextField fullWidth />
              </Grid>
              {checked && (
                <Grid item xs={3} lg={3} md={3}>
                  <CustomFormLabel>Penalty</CustomFormLabel>
                  <CustomTextField fullWidth value={formState.penalty} onChange={(e: any) => handlePenaltyChange(e.target.value)} />
                </Grid>
              )}

              <Grid item xs={3} lg={3} md={3}>
                <CustomFormLabel>
                  Total Score
                  <RequiredStar />
                </CustomFormLabel>
                {checked ? <CustomTextField fullWidth value={calculateTotal()} disabled sx={{ backgroundColor: "#efefef" }} />:<CustomTextField fullWidth value={totalScore} disabled sx={{ backgroundColor: "#efefef" }} />}
              </Grid>
            </Grid>
            <Grid item>
              <CustomFormLabel htmlFor="lname-text">
                Remarks
                <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                sx={{ width: "40%" }}
                id="standard-select-currency"
                className="custom-select"
                value={matchGroupState}
                onChange={handleChangeForMatchGroup}
                fullWidth
                variant="outlined"
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Button variant="contained" color="error" sx={{ mr: 1, mt: 3 }} onClick={navigateToBack}>
              Cancel
            </Button>

            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={submitScore}>
              Submit
            </Button>
          </>
        </ParentCard>
      </PageContainer>
    </>
  );
};

export default AddScore;
