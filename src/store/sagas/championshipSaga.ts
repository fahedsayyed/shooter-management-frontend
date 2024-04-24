import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchAthleteListFailure,
  fetchAthleteListStart,
  fetchAthleteListSuccess,
  updateAthleteStatusFailure,
  updateAthleteStatusStart,
  updateAthleteStatusSuccess,
} from "../reducers/atheleteSlice";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";

function* fetchAthleteListSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() => axiosServices.get("/athlete"));
    console.log(response, "---athlete response");
    yield put(fetchAthleteListSuccess(response.data));
  } catch (error: any) {
    console.error("Error in fetchTenantListSaga:", error);
    yield put(fetchAthleteListFailure(error.message));
  }
}

function* updateAthleteStatusSaga(action: any): Generator<any, void, any> {
  const data = action.payload.data;
  const { approved_by, rejected_reason, block_reason } = data;
  const { athleteId } = action.payload.athleteId;

  const athelete_id = athleteId;

  try {
    const response = yield call(() =>
      axiosServices.patch(`/athlete/update-athlete/${athelete_id}`, {
        approved_by: approved_by,
        rejected_reason: rejected_reason,
        block_reason: block_reason,
        // in_active_reason: data.in_active_reason || null,
        // in_active_by: data.in_active_by || null,
      }),
    );

    yield put(updateAthleteStatusSuccess(response));
    if (response.status === 200) {
      notifyMessage.success(response.data.message);
    }
  } catch (error) {
    yield put(updateAthleteStatusFailure(error));
  }
}

export function* watchFetchAthleteist() {
  yield takeLatest(fetchAthleteListStart.type, fetchAthleteListSaga);
}
export function* watchUpdateAthleteStatus() {
  yield takeLatest(updateAthleteStatusStart.type, updateAthleteStatusSaga);
}
