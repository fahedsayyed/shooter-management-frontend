import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, Stack } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { RequiredStar } from "src/components/required-star";
import { notifyMessage } from "src/utils/toastNotify";
import { IDetails } from "src/types/Details";
import {
  addDetailDateAndTime,
  addDetailId,
  getDetailByIdRequest,
  setDetailsInReducer,
} from "src/store/reducers/detailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import PageContainer from "src/components/page-container/PageContainer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";  // Updated import
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { parseISO, isValid } from "date-fns"; // Add this import
import { formatDateWithMoment } from "src/utils/basicFormaters";
import moment from "moment";


interface FormSlideTwoProps {
  totalDetails: any;
  step: number;
  createFieldHandlers: (fieldName: keyof IDetails) => { onBlur: () => void };
  errors: any;
}

const FormSlideTwo: React.FC<FormSlideTwoProps> = ({
  step,
  totalDetails,
  createFieldHandlers,
  errors,
}) => {
  const [detailDates, setDetailDates] = useState<{ [key: string]: string }[]>([]);


  const detailsFromReducer = useSelector(
    (state: AppState) => state.details.details.formSlideOne
  );
  const response = useSelector((state: AppState) => state.details.response);
  const detailById = useSelector((state: AppState) => state.details.detailById);
  const detailDateAndTime = useSelector((state:AppState)=>state.details.detailDateAndTime)
  
  const dispatch = useDispatch();
  const {end_date,start_date} = detailsFromReducer

  console.log(response?.data?.detailId, "detailById");
  const { detail } = detailById;
  console.log(detail, "---details");



  useEffect(() => {
    if (response?.status === 201 && response?.data?.detailId) {
      dispatch(addDetailId(response?.data?.detailId))
      dispatch(getDetailByIdRequest(response.data.detailId));
    }
  }, [dispatch, response?.status, response?.data.detailId]);


  

  const handleDraft = (e: React.FormEvent) => {
    e.preventDefault();

    const check = Object.values(detailsFromReducer).every((e) => e !== "");
    console.log(check, "check");
    if (!check) {
      notifyMessage.error("Check all the required fields");
    } else {
      notifyMessage.success("Saved Draft Successfully");
    }
    const storedDetails = localStorage.getItem("details");
    const details = storedDetails ? JSON.parse(storedDetails) : [];
    details.push(detailsFromReducer);
    localStorage.setItem("details", JSON.stringify(details));
  };

  // const handleInputChange = (value: any, fieldName: keyof IDetails) => {
  //   if (value !== null) {
  //     try {
  //       const selectedDate = parseISO(value);
  
  //       // Manual check for a valid date
  //       if (!isNaN(selectedDate.getTime())) {
  //         const updatedDetails: any = {
  //           [fieldName]: { dateTime: selectedDate },
  //         };
  //         console.log(updatedDetails, "updatedDetails");
  //         dispatch(setDetailsInReducer(updatedDetails));
  //       } else {
  //         notifyMessage.error("Invalid date");
  //       }
  //     } catch (error) {
  //       console.error("Error parsing date:", error);
  //       notifyMessage.error("Invalid date format");
  //     }
  //   }
  // };
  
  
  const renderDateTimePickers = () => {
    const totalDetail: number = totalDetails || 0;
    const dateTimePickers: JSX.Element[] = [];
  
    for (let i = 1; i <= totalDetail; i++) {
      const fieldName: keyof IDetails = `detail${i}` as keyof IDetails;
      const fieldValue: any = detailDateAndTime.find((detail: any) => detail.fields_name === fieldName)?.detail_date_time;
      
      let parsedDate = null;
      if (fieldValue) {
        parsedDate = moment(fieldValue, 'YYYY-MM-DDTHH:mm:ss');
        if (!parsedDate.isValid()) {
          console.error(`Invalid date format for field ${fieldName}: ${fieldValue}`);
          continue; 
        }
      }
  
      dateTimePickers.push(
        <DateTimePicker
          key={i}
          label={`Detail ${i}`}
          name={fieldName}
          value={parsedDate ? parsedDate.toDate() : null}
          onChange={(value: any) => handleInputChange(value, fieldName)}
        />
      );
    }
  
    return dateTimePickers;
  };
  

  const handleInputChange = (value: any, fieldName: keyof IDetails) => {
    if (value !== null) {
      try {
        const selectedDate = moment(value);
        console.log(value,"value")
        
        const dateToValidate = formatDateWithMoment(selectedDate);
        const startDate = formatDateWithMoment(start_date);
        const endDate = formatDateWithMoment(end_date);
        
        console.log(endDate, "end_date raw"); // Check the raw value of end_date
        console.log(formatDateWithMoment(selectedDate), startDate, endDate, "selectedDate after");
        if (selectedDate.isValid()) {
          if (dateToValidate >= startDate && dateToValidate <= endDate) {
            console.log("corrected date")
            const index = detailDates.findIndex((item) => item.fields_name === fieldName);
  
            if (index !== -1) {
              const updatedDetails = {
                ...detailDates[index],
                detail_date_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
              };
  
              const updatedDates = [
                ...detailDates.slice(0, index),
                updatedDetails,
                ...detailDates.slice(index + 1),
              ];
  
              setDetailDates(updatedDates);
            } else {
              const updatedDetails: any = {
                fields_name: fieldName,
                detail_date_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
              };
  
              setDetailDates((prevDates) => [...prevDates, updatedDetails]);
            }
  
            console.log(detailDates, "updatedDetails");
            dispatch(addDetailDateAndTime(detailDates));
          } else {
            console.log("not cprretec date")
            notifyMessage.error("Selected date must be between start and end dates");
          }
        } else {
          notifyMessage.error("Invalid date");
        }
      } catch (error) {
        console.error("Error parsing date:", error);
        notifyMessage.error("Invalid date format");
      }
    }
  };
  

  
  console.log(detailDates,"detailDates")

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
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>  
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              {renderDateTimePickers()}
            </DemoContainer>
          </LocalizationProvider>
          {/* <Grid item xs={12} mt={2}>
            <Stack justifyContent="flex-end" direction="row">
              <Button
                onClick={handleDraft}
                variant="contained"
                color={"secondary"}
              >
                Save Draft
              </Button>
            </Stack>
          </Grid> */}
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default FormSlideTwo;





















// const handleInputChange = (value: any, fieldName: keyof IDetails) => {
//   if (value !== null) {
//     try {
//       const selectedDate = moment(value);
//       console.log(value,"value")
//       console.log(formatDateWithMoment(selectedDate), "selectedDate after");
// const dateToValidate = formatDateWithMoment(selectedDate)
//       const startDate = formatDateWithMoment(detail.start_date);
//       const endDate = formatDateWithMoment(detail.end_date);

//       if (selectedDate.isValid()) {
//         if (dateToValidate >= startDate && dateToValidate <= endDate) {
//           console.log("corrected date")
//           const index = detailDates.findIndex((item) => item.fields_name === fieldName);

//           if (index !== -1) {
//             const updatedDetails = {
//               ...detailDates[index],
//               detail_date_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
//             };

//             const updatedDates = [
//               ...detailDates.slice(0, index),
//               updatedDetails,
//               ...detailDates.slice(index + 1),
//             ];

//             setDetailDates(updatedDates);
//           } else {
//             const updatedDetails: any = {
//               fields_name: fieldName,
//               detail_date_time: selectedDate.format("YYYY-MM-DD HH:mm:ss"),
//             };

//             setDetailDates((prevDates) => [...prevDates, updatedDetails]);
//           }

//           console.log(detailDates, "updatedDetails");
//           // dispatch(setDetailsInReducer(detailDates));
//         } else {
//           console.log("not cprretec date")
//           notifyMessage.error("Selected date must be between start and end dates");
//         }
//       } else {
//         notifyMessage.error("Invalid date");
//       }
//     } catch (error) {
//       console.error("Error parsing date:", error);
//       notifyMessage.error("Invalid date format");
//     }
//   }
// };