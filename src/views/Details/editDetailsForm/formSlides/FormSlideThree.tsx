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

interface FormSlideThreeProps {
  step: number;
}

const FormSlideThree: React.FC<FormSlideThreeProps> = ({ step }) => {
  const [detail, setDetail] = useState({
    dropdown_one: "",
    dropdown_two: "",
  });

  const errorInitialState: any = generateErrorInitialState(detail);
  const [error, setError] = useState(errorInitialState);

  const wholeError = () => {
    const newErrors = validateForm(detail);
    setError(newErrors);
  };

  useEffect(() => {
    console.log(step);
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleDraft = () => {
    wholeError();

    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(detail);
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
                  value={detail.dropdown_one}
                  fullWidth
                  onChange={handleInputChange}
                  className="custom-select"
                  margin="normal"
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
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
                  value={detail.dropdown_two}
                  fullWidth
                  onChange={handleInputChange}
                  className="custom-select"
                  margin="normal"
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
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
              <DetailTransferList />
            </Grid>

            <Grid item xs={12} mt={2}>
              <Stack justifyContent="flex-end" direction="row">
                <Button onClick={handleDraft} variant="contained" color={"secondary"}>
                  Save Draft
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </PageContainer>
    </DndProvider>
  );
};

export default FormSlideThree;
