import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchAthleteListFailure,
  fetchAthleteListStart,
  fetchAthleteListSuccess,
  fetchSingleAthleteFailure,
  fetchSingleAthleteRequest,
  fetchSingleAthleteSuccess,
  updateAthleteStatusFailure,
  updateAthleteStatusStart,
  updateAthleteStatusSuccess,
} from "../reducers/atheleteSlice";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";
import { jwtDecode } from "jwt-decode";

function* fetchAthleteListSaga(): Generator<any, void, any> {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken, "hii");

    try {
      let response;
      if (decodedToken.isClub) {
        response = yield call(() => axiosServices.get("/club/athlete"));
        console.log(response.data, "for cl");
      } else {
        response = yield call(() => axiosServices.get("/athlete"));
      }

      yield put(fetchAthleteListSuccess(response.data));
    } catch (error: any) {
      yield put(fetchAthleteListFailure(error.message));
    }
  }
}

function* fetchSingleAthleteSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    const response = yield call(() => axiosServices.get(`/athlete/${id}`));
    yield put(fetchSingleAthleteSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSingleAthleteFailure(error.message));
  }
}

function* updateAthleteStatusSaga(action: any): Generator<any, void, any> {
  const data = action.payload.data;
  console.log(action.payload, "Action");
  const { approved_by, rejected_reason, block_reason } = data;
  const id = action.payload.id;

  try {
    const response = yield call(() =>
      axiosServices.patch(`/athlete/update-athlete-status/${id}`, {
        approved_by: approved_by,
        rejected_reason: rejected_reason,
        block_reason: block_reason,
        // is_blocked : block_reason ? "blocked" : null
        // in_active_reason: data.in_active_reason || null,
        // in_active_by: data.in_active_by || null,
      }),
    );

    yield put(updateAthleteStatusSuccess(response));
    if (response.status === 200) {
      notifyMessage.success(response.data.message);
    }
  } catch (error) {
    notifyMessage.error("SomeThing Went Wrong !!");
    yield put(updateAthleteStatusFailure(error));
  }
}

export function* watchFetchAthleteList() {
  yield takeLatest(fetchAthleteListStart.type, fetchAthleteListSaga);
}

export function* watchUpdateAthleteStatus() {
  yield takeLatest(updateAthleteStatusStart.type, updateAthleteStatusSaga);
}

export function* watchfetchSingleAthlete() {
  yield takeLatest(fetchSingleAthleteRequest.type, fetchSingleAthleteSaga);
}
