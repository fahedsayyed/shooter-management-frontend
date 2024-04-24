import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

interface AddEventGroupFormState {
  eventData: {
    eventName: string;
    eventType: string;
    isMixed: boolean;
    numberOfShots: number;
    maxShots: number;
    seriesCount: number;
    shotsInSeries: number;
    seriesTitles: {
      boolean: boolean;
      values: Record<string, string[]>;
    };
    stageCount: number;
    stageTitles: {
      boolean: boolean;
      values: Record<string, string[]>;
    };
  };
}

const initialState: AddEventGroupFormState = {
  eventData: {
    eventName: "",
    eventType: "",
    isMixed: false,
    numberOfShots: 0,
    maxShots: 0,
    seriesCount: 0,
    shotsInSeries: 0,
    seriesTitles: {
      boolean: false,
      values: {},
    },
    stageCount: 0,
    stageTitles: {
      boolean: false,
      values: {},
    },
  },
};

const addEventGroupFormSlice = createSlice({
  name: "addEventGroupForm",
  initialState,
  reducers: {
    setEventData: (state, action: PayloadAction<AddEventGroupFormState["eventData"]>) => {
      state.eventData = action.payload;
    },
    setInputValuesForTitles: (state, action: PayloadAction<{ field: string; seriestitle: string; inputValues: string[] }>) => {
      const { field, seriestitle, inputValues } = action.payload;

      if (field === "seriesTitles") {
        state.eventData.seriesTitles.boolean = true;
        state.eventData.seriesTitles.values[seriestitle] = inputValues;
      } else if (field === "stageTitles") {
        state.eventData.stageTitles.boolean = true; // Assuming that setting to true indicates the presence of values
        state.eventData.stageTitles.values[seriestitle] = inputValues;
      }
    },

    updateFormData: (
      state: Draft<AddEventGroupFormState>,
      action: PayloadAction<{
        eventName: string;
        eventType: string;
        isMixed: boolean;
        numberOfShots: number;
        maxShots: number;
        seriesCount: number;
        shotsInSeries: number;
        seriesTitles: {
          boolean: boolean;
          values: Record<string, string[]>;
        };
        stageCount: number;
        stageTitles: {
          boolean: boolean;
          values: Record<string, string[]>;
        };
      }>,
    ) => {
      const { eventName, eventType, isMixed, numberOfShots, maxShots, seriesCount, shotsInSeries, seriesTitles, stageCount, stageTitles } = action.payload;

      state.eventData = {
        ...state.eventData,
        eventName,
        eventType,
        isMixed,
        numberOfShots,
        maxShots,
        seriesCount,
        shotsInSeries,
        seriesTitles,
        stageCount,
        stageTitles,
      };
    },
  },
});

export const { setEventData, setInputValuesForTitles, updateFormData } = addEventGroupFormSlice.actions;
export default addEventGroupFormSlice.reducer;
