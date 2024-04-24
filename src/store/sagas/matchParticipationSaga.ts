import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchCompetitionListStart,
  fetchCompetitionListSuccess,
  fetchCompetitionListFailure,
  fetchMatchParticipationListStart,
  fetchMatchParticipationListSuccess,
  fetchMatchParticipationListFailure,
  fetchCompetitionByIdStart,
  fetchCompetitionByIdSuccess,
  fetchCompetitionByIdFailure,
  fetchEventsListStart,
  fetchEventsListSuccess,
  fetchEventsListFailure,
  addMatchEntryRequest,
  addMatchEntrySuccess,
  addMatchEntryFailure,
  fetchMatchParticipationDtailListStart,
  fetchMatchParticipationDetailListSuccess,
  fetchMatchParticipationDetailListFailure,
  updateAthleteMatchStatusSuccess,
  updateAthleteMatchStatusRequest,
  editUpdateAthleteMatchStatusRequest,
  editUpdateAthleteMatchStatusSuccess,
  editUpdateAthleteMatchStatusFailure,
  getUpcomingMatchParticipationListRequest,
  getUpcomingMatchParticipationListSuccess,
  getUpcomingMatchParticipationListFailure,
  getMatchDetailListBycompetitionRequest,
  getMatchDetailListBycompetitionSuccess,
  getMatchDetailListBycompetitionFailure,
  getPreferedLocationByCompetitionRequest,
  getPreferedLocationByCompetitionSuccess,
  getPreferedLocationByCompetitionFailure,
  fetchtAthleteOfCompetitionFailure,
  fetchtAthleteOfCompetitionStart,
  fetchtAthleteOfCompetitionSuccess,
} from "../reducers/matchParticipationSlice";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";

function* fetchCompetitionListSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() => axiosServices.get("/api/tenants/championship/competition"));
    yield put(fetchCompetitionListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchCompetitionListFailure(error.message));
  }
}

function* fetchMatchParticipationListSaga(action: any): Generator<any, void, any> {
  const id = action.payload.id;

  try {
    const response = yield call(() => axiosServices.get(`/match-participation/match-participations/${id}`));

    yield put(fetchMatchParticipationListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchParticipationListFailure(error.message));
  }
}

function* updateAthleteMatchStatusSaga(action: any): Generator<any, void, any> {
  const { updateStatus, id } = action.payload;
  console.log(updateStatus, id, "action");

  const matchParticipationId = id;
  try {
    const response = yield call(() => axiosServices.put(`/match-participation/update-match-participation/${matchParticipationId}`, { updateStatus }));

    yield put(updateAthleteMatchStatusSuccess(response));
    notifyMessage.success(response.data.message);

    if (response.status === 200) {
      window.history.back();
    }
  } catch (error: any) {
    yield put(fetchMatchParticipationListFailure(error.message));
    notifyMessage.error(error.message);
  }
}


function* fetchCompetitonbyIdSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() => axiosServices.get(`/api/tenants/championship/competition/${action.payload}`));
    yield put(fetchCompetitionByIdSuccess(response.data));
  } catch (error: any) {
    yield put(fetchCompetitionByIdFailure(error.message));
  }
}

function* fetchEventsListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() => axiosServices.get(`/api/tenants/championship/event/${action.payload}`));

    yield put(fetchEventsListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchEventsListFailure(error.message));
  }
}

function* addMatchEntrySaga(action: any): Generator<any, void, any> {
  const requestData = action.payload;
  try {
    const response = yield call(() => axiosServices.post(`/match-participation/match-entry`, requestData));

    const serializableData = {
      status: response.status,
      data: response.data,
    };

    yield put(addMatchEntrySuccess(response));

    if (response.status === 201) {
      notifyMessage.success(response.data.message);
    } else {
      notifyMessage.error("Something Went Wrong!!");
    }
  } catch (error: any) {
    yield put(addMatchEntryFailure(error.response.data.message));
    notifyMessage.error(error.response.data.message);
  }
}

function* fetchMatchParticipationDetailListSaga(action: any): Generator<any, void, any> {
  const { id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/match-participation/match-participations-details/${id}`));

    yield put(fetchMatchParticipationDetailListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchParticipationDetailListFailure(error.message));
  }
}

function* editUpdateAthleteMatchStatusSaga(action: any): Generator<any, void, any> {
  const { matchParticipationId, status } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/match-participation/match-participant-detail-status/${matchParticipationId}/${status}`));

    yield put(editUpdateAthleteMatchStatusSuccess(response.data));
  } catch (error: any) {
    yield put(editUpdateAthleteMatchStatusFailure(error.message));
  }
}

function* getUpcomingMatchParticipationListSaga(action: any): Generator<any, void, any> {
  const { match_status, comp_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/match-participation/match-participant-approve-disapprove/${match_status}/${comp_id}`));

    yield put(getUpcomingMatchParticipationListSuccess(response.data));
  } catch (error: any) {
    yield put(getUpcomingMatchParticipationListFailure(error.message));
  }
}

function* getMatchDetailByCompetitionSaga(action: any): Generator<any, void, any> {
  const { comp_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/api/tenants/championship/event-by-competition/${comp_id}`));

    yield put(getMatchDetailListBycompetitionSuccess(response.data));
  } catch (error: any) {
    yield put(getMatchDetailListBycompetitionFailure(error.message));
  }
}

function* getPreferedLocationByCompetitionSaga(action: any): Generator<any, void, any> {
  const { comp_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/api/tenants/championship/get-preferred-location-competition/${comp_id}`));

    yield put(getPreferedLocationByCompetitionSuccess(response.data));
  } catch (error: any) {
    yield put(getPreferedLocationByCompetitionFailure(error.message));
  }
}

function* fetchtAthleteOfCompetitionSaga(action: any): Generator<any, void, any> {
  const { comp_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/api/tenants/championship/get-all-athelete-by-competition-id/${comp_id}`));

    yield put(fetchtAthleteOfCompetitionSuccess(response.data));
  } catch (error: any) {
    yield put(fetchtAthleteOfCompetitionFailure(error.message));
  }
}

export function* watchFetchCompetitionList() {
  yield takeLatest(fetchCompetitionListStart.type, fetchCompetitionListSaga);
}
export function* watchFetchMatchParticipationList() {
  yield takeLatest(fetchMatchParticipationListStart.type, fetchMatchParticipationListSaga);
}
export function* watchFetchCompetitionById() {
  yield takeLatest(fetchCompetitionByIdStart.type, fetchCompetitonbyIdSaga);
}
export function* watchFetchEventsId() {
  yield takeLatest(fetchEventsListStart.type, fetchEventsListSaga);
}
export function* watchAddMatchEntry() {
  yield takeLatest(addMatchEntryRequest.type, addMatchEntrySaga);
}
export function* watchFetchmatchParticipationDetailList() {
  yield takeLatest(fetchMatchParticipationDtailListStart.type, fetchMatchParticipationDetailListSaga);
}
export function* watchUpdateAthleteMatchStatus() {
  yield takeLatest(updateAthleteMatchStatusRequest.type, updateAthleteMatchStatusSaga);
}
export function* watchEditUpdateAthleteMatchStatus() {
  yield takeLatest(editUpdateAthleteMatchStatusRequest.type, editUpdateAthleteMatchStatusSaga);
}
export function* watchGetUpcomingMatchParticipationList() {
  yield takeLatest(getUpcomingMatchParticipationListRequest.type, getUpcomingMatchParticipationListSaga);
}
export function* watchGetMatchDetailByCompetition() {
  yield takeLatest(getMatchDetailListBycompetitionRequest.type, getMatchDetailByCompetitionSaga);
}
export function* watchGetPreferedLocationByCompetition() {
  yield takeLatest(getPreferedLocationByCompetitionRequest.type, getPreferedLocationByCompetitionSaga);
}

export function* watchFetchtAthleteOfCompetition() {
  yield takeLatest(fetchtAthleteOfCompetitionStart.type, fetchtAthleteOfCompetitionSaga);
}
