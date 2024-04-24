import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Stack } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { RequiredStar } from "src/components/required-star";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { notifyMessage } from "src/utils/toastNotify";
import { ICreateDetails } from "src/types/Details";
import PageContainer from "src/components/page-container/PageContainer";

interface FormSlideTwoProps {
  step: number;
}

const FormSlideTwo: React.FC<FormSlideTwoProps> = ({ step }) => {
  const [detail, setDetail] = React.useState<ICreateDetails>({
    detailone: "",
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

  const checkError = (fieldName: keyof ICreateDetails) => {
    const newErrors: { [key in keyof ICreateDetails]?: string } = validateForm({ [fieldName]: detail[fieldName] });
    setError((prevErrors: { [key in keyof ICreateDetails]?: string }) => ({ ...prevErrors, [fieldName]: newErrors[fieldName] }));
  };

  const createFieldHandlers = (fieldName: keyof ICreateDetails) => ({
    onBlur: () => checkError(fieldName),
  });

  const handleDraft = (e: React.FormEvent) => {
    e.preventDefault();

    const check = Object.values(detail).every((e) => e !== "");
    console.log(check, "check");
    if (!check) {
      notifyMessage.error("Check all the required fields");
      wholeError();
    } else {
      notifyMessage.success("Saved Draft Successfully");
    }
    //   // Save the association data to local storage
    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(detail);
    localStorage.setItem("details", JSON.stringify(details));
  };
  //   const handleNext = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const check = Object.values(detail).every((e) => e !== "");
  //     console.log(check, "check");
  //     if (!check) {
  //       notifyMessage.error("Check all the required fields");
  //       wholeError();
  //     } else {
  //       navigate("/details/create/page3");
  //       console.log("send data");
  //     }
  //     //   // Save the association data to local storage
  //     const storedDetails = localStorage.getItem("details");
  //     const details = storedDetails ? JSON.parse(storedDetails) : [];
  //     details.push(detail);
  //     localStorage.setItem("details", JSON.stringify(details));

  //     // Redirect back to the association list page
  //     // navigate("/details/create/page3");
  //   };

  return (
    <PageContainer>
      <Paper>
        <Grid container p={2} spacing={2}>
          <Grid item xs={6}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="text-email"
            >
              Detail
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="text-email"
              variant="outlined"
              name="detailone"
              type="date"
              value={detail.detailone}
              fullWidth
              onChange={handleInputChange}
              error={!!error.detailone}
              helperText={error.detailone}
              {...createFieldHandlers("detailone")}
              margin="normal"
            />
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
  );
};

export default FormSlideTwo;
