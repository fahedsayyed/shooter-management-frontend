import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropdownState {
  dropdownValue: string | null;
}

const initialState: DropdownState = {
  dropdownValue: null,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setDropdownValue: (state, action: PayloadAction<string>) => {
      state.dropdownValue = action.payload;
    },
  },
});

export const { setDropdownValue } = dropdownSlice.actions;
export default dropdownSlice.reducer;
