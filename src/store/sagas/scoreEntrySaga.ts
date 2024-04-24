import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchTenantByIdStart,
  fetchTenantByIdFailure,
  fetchTenantByIdSuccess,
  fetchTenantListFailure,
  fetchTenantListStart,
  fetchTenantListSuccess,
  addTenantRequest,
  addTenantSuccess,
  addTenantFailure,
  editTenantFailure,
  editTenantSuccess,
  editTenantRequest,
  updateTenantStatusRequest,
  updateTenantStatusSuccess,
  updateTenantStatusFailure,
  getRoleAndPermissionRequest,
  getRoleAndPermissionSuccess,
  getRoleAndPermissionFailure,
  updateTenantRoleAndPermissionRequest,
  updateTenantRoleAndPermissionSuccess,
  updateTenantRoleAndPermissionFailure,
} from "../reducers/TenentSlice";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";
import {
  addScoreEntryFailure,
  addScoreEntryRequest,
  addScoreEntrySuccess,
  fetchAthleteByMatchStart,
  fetchAthletesByMatchFailure,
  fetchAthletesByMatchSuccess,
  fetchMatchGroupDetailFailure,
  fetchMatchGroupDetailStart,
  fetchMatchGroupDetailSuccess,
  fetchMatchGroupListFailure,
  fetchMatchGroupListStart,
  fetchMatchGroupListSuccess,
  fetchMatchGroupSeriesTitleFailure,
  fetchMatchGroupSeriesTitleStart,
  fetchMatchGroupSeriesTitleSuccess,
  fetchMatchesByMatchgroupIdFailure,
  fetchMatchesByMatchgroupIdStart,
  fetchMatchesByMatchgroupIdSuccess,
  fetchScoreDetailsStart,
  fetchScoreDetailsSuccess,
  fetchScoreDetailsFailure,
} from "../reducers/scoreEntry";

function* fetchMatchGroupListSaga(action: any): Generator<any, void, any> {
  const { comp_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/get-match-details/${comp_id}`));
    yield put(fetchMatchGroupListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchGroupListFailure(error.message));
  }
}

function* fetchMatchesByMatchgroupIdSaga(action: any): Generator<any, void, any> {
  const { matchGroupId } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/get-match-detail-by-match-group-id/${matchGroupId}`));
    yield put(fetchMatchesByMatchgroupIdSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchesByMatchgroupIdFailure(error.message));
  }
}

function* fetchMatchGroupDetailSaga(action: any): Generator<any, void, any> {
  const { matchGroupId } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/get-match-group-details/${matchGroupId}`));
    yield put(fetchMatchGroupDetailSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchGroupDetailFailure(error.message));
  }
}

function* fetchAthleteBymatchSaga(action: any): Generator<any, void, any> {
  const { comp_id, matchGroupId, matchId } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/get-athlete-detail-by-match/${comp_id}/${matchGroupId}/${matchId}`));
    yield put(fetchAthletesByMatchSuccess(response.data));
  } catch (error: any) {
    yield put(fetchAthletesByMatchFailure(error.message));
  }
}

function* fetchMatchGroupSeriesTitleSaga(action: any): Generator<any, void, any> {
  const { matchGroupId } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/get-match-series-title/${matchGroupId}`));
    yield put(fetchMatchGroupSeriesTitleSuccess(response.data));
  } catch (error: any) {
    yield put(fetchMatchGroupSeriesTitleFailure(error.message));
  }
}

function* addScoreEntrySaga(action: any): Generator<any, void, any> {
  const { data } = action.payload;
  try {
    const response = yield call(() => axiosServices.post(`/score-entry/add-score`, { data }));
    yield put(addScoreEntrySuccess(response));
  } catch (error: any) {
    yield put(addScoreEntryFailure(error.message));
  }
}

function* fetchScoreDetailsSaga(action: any): Generator<any, void, any> {
  const { competition_id } = action.payload;
  try {
    const response = yield call(() => axiosServices.get(`/score-entry/score-detail?competition_id=${competition_id}`));
    yield put(fetchScoreDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchScoreDetailsFailure(error.message));
  }
}

//http://localhost:5000/v1/score-entry/score-detail?competition_id=2

export function* watchFetchScoreDetails() {
  yield takeLatest(fetchScoreDetailsStart.type, fetchScoreDetailsSaga);
}

export function* watchFetchMatchGroupList() {
  yield takeLatest(fetchMatchGroupListStart.type, fetchMatchGroupListSaga);
}

export function* watchFetchMatchesByMatchgroupId() {
  yield takeLatest(fetchMatchesByMatchgroupIdStart.type, fetchMatchesByMatchgroupIdSaga);
}

export function* watchFetchAthleteBymatch() {
  yield takeLatest(fetchAthleteByMatchStart.type, fetchAthleteBymatchSaga);
}

export function* watchFetchMatchGroupDetail() {
  yield takeLatest(fetchMatchGroupDetailStart.type, fetchMatchGroupDetailSaga);
}

export function* watchFetchMatchGroupSeriesTitle() {
  yield takeLatest(fetchMatchGroupSeriesTitleStart.type, fetchMatchGroupSeriesTitleSaga);
}

export function* watchAddScoreEntry() {
  yield takeLatest(addScoreEntryRequest.type, addScoreEntrySaga);
}
