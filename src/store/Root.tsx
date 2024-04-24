import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerSlice";
import TenentReducer from "./reducers/TenentSlice";
import AuthConfigureSlice from "./auth/AuthConfigure";
import dropdownReducer from "./eventgroups/DropdownSlice";
import AddEventGroupFormReducer from "./eventgroups/addEventGroupFormSlice";
import AddCompetitionFormReducer from "./championship-reducer/addCompetitionFormSlice";
import AthleteFormDataSlice from "./athlete-register-formdata/AthleteFormDataSlice";
import detailsReducer from "./reducers/detailsSlice";
import authToken from "./slices/authToken";
import AthleteSlice from "./reducers/atheleteSlice";
import CompetitionSlice from "./reducers/matchParticipationSlice";
import viewAthlete from "../store/athlete-register-formdata/AthleteViewAndEdit";
import viewClubAthlete from "../store/clubRegister/ClubAthleteViewEdit";
import scoreEntrySlice from "./reducers/scoreEntry";
import utilFormSlice from "./athlete-register-formdata/common/ThunkSlideForms";
import championshipSlice from "./reducers/championship";
import matchDataReducer from "./championship-reducer/getMatchData";
import athleteFormDataReducer from "./clubRegister/AthleteFormDataSlice";
import AthleteActivities from "./athlete-register-formdata/common/AthleteActivities";

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  tenent: TenentReducer,
  AuthConfig: AuthConfigureSlice,
  dropdown: dropdownReducer,
  addEventGroupForm: AddEventGroupFormReducer,
  athleteRegister: AthleteFormDataSlice,
  athleteActivities: AthleteActivities,
  AddCompetitionForm: AddCompetitionFormReducer,
  details: detailsReducer,
  authToken: authToken,
  athelete: AthleteSlice,
  competition: CompetitionSlice,
  viewAthlete: viewAthlete,
  scoreEntry: scoreEntrySlice,
  utilFormSlice: utilFormSlice,
  championship: championshipSlice,
  matchData: matchDataReducer,
  athleteFormData: athleteFormDataReducer,
  viewClubAthlete: viewClubAthlete,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
