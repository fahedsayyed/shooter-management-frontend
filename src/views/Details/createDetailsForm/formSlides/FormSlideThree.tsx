// Your main component
import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Stack, FormControl, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import DetailTransferList from "./DetailTransferList";
import PageContainer from "src/components/page-container/PageContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { addDetailId, getDetailByIdRequest } from "src/store/reducers/detailsSlice";

interface FormSlideThreeProps {
  athletesOfcompetitionAndMatchGroup: any;
  step: number;
}

const FormSlideThree: React.FC<FormSlideThreeProps> = ({ step, athletesOfcompetitionAndMatchGroup }) => {
  const [details, setDetails] = useState({
    dropdown_one: "",
    dropdown_two: "",
  });

  const errorInitialState: any = generateErrorInitialState(details);
  const [error, setError] = useState(errorInitialState);
  const dispatch = useDispatch();
  const response = useSelector((state: AppState) => state.details.response);
  const addDateAndTimeResponse = useSelector((state: AppState) => state.details.addDateAndTimeResponse);
  const detailById = useSelector((state: AppState) => state.details.detailById);
  console.log(addDateAndTimeResponse, "addDateAndTimeResponse");
  console.log(response, "response in third slide");
  const { dropdown_one, dropdown_two } = details;
  console.log(detailById, "detailById");
  const { detail: detail } = detailById;

  const { total_details } = detail;
  console.log(total_details, "total_details");

  useEffect(() => {
    if (addDateAndTimeResponse?.status === 201 && response?.data?.detailId) {
      dispatch(getDetailByIdRequest(response.data.detailId));
    }
  }, [dispatch, response?.status, response?.data.detailId, addDateAndTimeResponse]);

  const wholeError = () => {
    const newErrors = validateForm(details);
    setError(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleDraft = () => {
    wholeError();

    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(details);
    localStorage.setItem("details", JSON.stringify(details));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <PageContainer>
        <Paper>
          <Grid container p={2} spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!error.dropdown_one}>
                <CustomFormLabel
                  sx={{
                    mt: 2,
                  }}
                  htmlFor="text-email"
                >
                  Select Detail
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect
                  id="text-email"
                  variant="outlined"
                  name="dropdown_one"
                  value={details.dropdown_one}
                  fullWidth
                  onChange={handleInputChange}
                  className="custom-select"
                  margin="normal"
                >
                  {[...Array(total_details)].map((_, index) => (
                    <MenuItem key={index + 1} value={(index + 1).toString()}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {error.dropdown_one && <FormHelperText>This Field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!error.dropdown_two}>
                <CustomFormLabel
                  sx={{
                    mt: 2,
                  }}
                  htmlFor="text-email"
                >
                  Select Detail
                  <RequiredStar />
                </CustomFormLabel>
                <CustomSelect
                  id="text-email"
                  variant="outlined"
                  name="dropdown_two"
                  value={details.dropdown_two}
                  fullWidth
                  onChange={handleInputChange}
                  className="custom-select"
                  margin="normal"
                >
                  {[...Array(total_details)].map((_, index) => (
                    <MenuItem key={index + 1} value={(index + 1).toString()}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </CustomSelect>
                {error.dropdown_two && <FormHelperText>This Field is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid justifyContent={"space-evenly"} sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <CustomFormLabel
                  sx={{
                    mt: 2,
                  }}
                  htmlFor="text-email"
                >
                  Detail1
                </CustomFormLabel>
                <CustomFormLabel
                  sx={{
                    mt: 2,
                  }}
                  htmlFor="text-email"
                >
                  Detail2
                </CustomFormLabel>
              </Grid>
              <DetailTransferList 
              details={details} 
              total_details={total_details} 
              athletesOfcompetitionAndMatchGroup={athletesOfcompetitionAndMatchGroup} />
            </Grid>

            {/* <Grid item xs={12} mt={2}>
              <Stack justifyContent="flex-end" direction="row">
                <Button onClick={handleDraft} variant="contained" color={"secondary"}>
                  Save Draft
                </Button>
              </Stack>
            </Grid> */}
          </Grid>
        </Paper>
      </PageContainer>
    </DndProvider>
  );
};

export default FormSlideThree;
