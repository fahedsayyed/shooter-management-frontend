import { createSlice } from "@reduxjs/toolkit";

interface chanpionshipState {
  eventModal: any;
  loading: boolean;
  error: any;
}

const initialState: chanpionshipState = {
  eventModal: false,
  loading: false,
  error: null,
};

export const championshipSlice = createSlice({
  name: "championship",
  initialState,
  reducers: {
    handleOpenModal: (state, action) => {
      state.eventModal = action.payload;
    },
  },
});

export const { handleOpenModal } = championshipSlice.actions;

export default championshipSlice.reducer;
