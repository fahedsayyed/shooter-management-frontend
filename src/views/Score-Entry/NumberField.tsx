import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTotalScore, saveScores } from "src/store/reducers/scoreEntry";

interface RoundData {
  [key: string]: number | undefined;
}

interface NumberInputFieldsProps {
  comp_id: any;
  matchGroupDetail: any;
  seriesTitle: any;
  matchGroupState: any;
  matchState: any;
  competitorCode: any;
}

const NumberInputFields: React.FC<NumberInputFieldsProps> = ({
  comp_id,
  matchGroupDetail,
  seriesTitle,
  matchGroupState,
  matchState,
  competitorCode,
}) => {
  const dispatch = useDispatch();

  let no_of_shots: any | undefined;
  let no_of_series: any | undefined;
  let max_value: any | undefined;

  if (matchGroupDetail && matchGroupDetail.length > 0) {
    const [element] = matchGroupDetail;
    ({ no_of_shots, no_of_series, max_value } = element);
  } else {
  
    no_of_shots = 0;
    no_of_series = 0;
    max_value = 0;
  }

  const [inputValues, setInputValues] = useState<RoundData[]>(Array(no_of_series).fill({}));
  const [penalties, setPenalties] = useState<number[]>(Array(no_of_series).fill(0));

  const handleInputChange = (roundIndex: number, columnIndex: any, value: any) => {
    const newValue = value === "" ? undefined : parseInt(value, 10);
    const newInputValues = [...inputValues];
    const roundData = newInputValues[roundIndex] ?? {};
    newInputValues[roundIndex] = {
      ...roundData,
      [`shoot${columnIndex + 1}`]: newValue,
    };

    setInputValues(newInputValues);
    dispatch(saveScores(newInputValues));
  };

  const calculateTotal = (roundIndex: number) => {
    
    const { penalty, ...roundData } = inputValues[roundIndex] || {};

    
    const roundScores = Object.values(roundData).map((score) => score || 0);
    const roundTotal = roundScores.reduce((total, score) => total + score, 0);

   
    return roundTotal - (penalty || 0);
  };

  const calculateTotalScores = () => {
    let totalScores = 0;
    inputValues.forEach((roundData, roundIndex) => {

      totalScores += calculateTotal(roundIndex);
    });

    return totalScores;
  };

  useEffect(() => {
    
    const totalScores = calculateTotalScores();
    dispatch(addTotalScore(totalScores));
  }, [inputValues, dispatch, penalties]);

  const handlePenalty = (roundIndex: number, value: any) => {
    const newValue = value === "" ? 0 : parseInt(value, 10);

    setPenalties((prevPenalties) => {
      const newPenalties = [...prevPenalties];
      newPenalties[roundIndex] = newValue;

      return newPenalties;
    });

    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      const roundData = newInputValues[roundIndex] ?? {};
      newInputValues[roundIndex] = {
        ...roundData,
        penalty: newValue,
      };

      dispatch(saveScores(newInputValues));

      return newInputValues;
    });
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Grid container alignItems="flex-start" justifyContent="flex-start" sx={{ width: "100%" }}>
        <Grid item xs={11} sx={{ overflow: "hidden" }}>
          <Box sx={{ overflow: "scroll", border: "1px solid #f2f2f2", padding: "1%" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <CustomFormLabel>Series</CustomFormLabel>
                  </TableCell>
                  {[...Array(no_of_shots)].map((_, index) => (
                    <TableCell key={index}>
                      <CustomFormLabel>{`${index + 1}`}</CustomFormLabel>
                    </TableCell>
                  ))}
                  <Grid sx={{ display: "flex", gap: "7px" }}>
                    <CustomFormLabel>Penalty</CustomFormLabel>
                    <CustomFormLabel>Total</CustomFormLabel>
                  </Grid>
                </TableRow>
                {[...Array(no_of_series)].map((_, roundIndex) => (
                  <TableRow key={roundIndex}>
                    <TableCell>
                      <CustomFormLabel>
                        {seriesTitle[roundIndex]?.title
                          ? `${seriesTitle[roundIndex]?.title}`
                          : `${roundIndex + 1}${["st", "nd", "rd", "th"][roundIndex] || "th"}`}
                      </CustomFormLabel>
                    </TableCell>
                    {[...Array(no_of_shots)].map((_, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <Box sx={{ overflow: "hidden" }}>
                          <CustomTextField
                            type="number"
                            sx={{ width: "50px", border: "1px solid #c0c0c0", borderRadius: "7px" }}
                            value={(inputValues[roundIndex]?.[`shoot${columnIndex + 1}`] || "")?.toString()}
                            onChange={(e: any) =>
                              handleInputChange(roundIndex, columnIndex, Math.min(e.target.value, max_value))
                            }
                            max={max_value}
                          />
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell style={{ display: "flex", padding: "3px", gap: "3px", marginTop: "9px" }}>
                      <CustomTextField
                        type="number"
                        sx={{ width: "70px", border: "1px solid #c0c0c0", borderRadius: "7px" }}
                        value={penalties[roundIndex].toString()}
                        onChange={(e: any) => handlePenalty(roundIndex, Math.min(e.target.value, max_value))}
                        max={max_value}
                      />
                      <CustomTextField
                        type="number"
                        sx={{ width: "70px", backgroundColor: "#efefef" }}
                        value={calculateTotal(roundIndex)}
                        disabled
                        max={10}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NumberInputFields;
