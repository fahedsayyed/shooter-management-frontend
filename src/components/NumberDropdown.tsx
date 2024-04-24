import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Scrollbar from "./custom-scroll/Scrollbar";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { useDispatch, useSelector } from "../store/Store";
import { setInputValuesForTitles } from "src/store/eventgroups/addEventGroupFormSlice";

interface NumberDropdownProps {
  numberToShow: number;
  field: string;
  onInputChange: (inputValues: string[]) => void;
}

const NumberDropdown: React.FC<NumberDropdownProps> = ({ numberToShow, field, onInputChange }) => {
  const eventData = useSelector((state) => state.addEventGroupForm.eventData);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState<string[]>([]);
  // console.log(numberToShow, "ser");
  useEffect(() => {
    setInputValues(Array.from({ length: numberToShow }, (_, index) => (index + 1).toString()));
  }, [numberToShow]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    dispatch(setInputValuesForTitles({ field, seriestitle: field === "seriesTitles" ? "seriestitle" : "stagetitle", inputValues: newInputValues }));
    onInputChange(newInputValues);
  };

  return (
    <Box>
      <Scrollbar sx={{ height: "60px", mr: 45 }}>
        {inputValues.map((value, index) => (
          <Box key={index + 1} display="flex" alignItems="center" mb={1}>
            <CustomTextField variant="outlined" size="small" value={value} onChange={(e: any) => handleInputChange(index, e.target.value)} />
          </Box>
        ))}
      </Scrollbar>
    </Box>
  );
};

export default NumberDropdown;
