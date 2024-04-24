import { takeLatest, call, put } from "redux-saga/effects";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";
import { addDetailFailure, addDetailRequest, addDetailSuccess, addDetailsDateAndTimeFailure, addDetailsDateAndTimeRequest, addDetailsDateAndTimeSuccess, fetchtAthleteOfCompetitionandMatchGroupFailure, fetchtAthleteOfCompetitionandMatchGroupRequest, fetchtAthleteOfCompetitionandMatchGroupSuccess, getDetailByIdFailure, getDetailByIdRequest, getDetailByIdSuccess } from "../reducers/detailsSlice";

function* addDetailSaga(action: any): Generator<any, void, any> {
  const data = action.payload;
  try {
    const response = yield call(() => axiosServices.post("/details/create-details", { data }));
    yield put(addDetailSuccess(response));
  } catch (error: any) {
    yield put(addDetailFailure(error.message));
  }
}

function* getDetailByIdSaga(action: any): Generator<any, void, any> {
  const  detailId  = action.payload;

  try {
    const response = yield call(() => axiosServices.get(`/details/get-detail/${detailId}`));

    yield put(getDetailByIdSuccess(response.data));
  } catch (error: any) {
    yield put(getDetailByIdFailure(error.message));
    notifyMessage.error(error.message);
  }
}

function* fetchtAthleteOfCompetitionAndMatchGroupSaga(action:any): Generator<any, void, any> {
    const { comp_id,match_group_id } = action.payload
    try {
      const response = yield call(() =>
        axiosServices.get(`/api/tenants/championship/get-all-athelete-by-competition-and-eventgroup-id/${comp_id}/${match_group_id}`)
      );
      
      yield put(fetchtAthleteOfCompetitionandMatchGroupSuccess(response.data));
    } catch (error: any) {
  
      yield put(fetchtAthleteOfCompetitionandMatchGroupFailure(error.message));
    }
  }


function* addDetailDateAndTimeSaga(action: any): Generator<any, void, any> {
    const {data,detailId} = action.payload;
    try {
      const response = yield call(() => axiosServices.post(`/details/create-detail-date-and-time/${detailId}`, { data }));
      yield put(addDetailsDateAndTimeSuccess(response));
    } catch (error: any) {
      yield put(addDetailsDateAndTimeFailure(error.message));
    }
  }

export function* watchAddDetail() {
  yield takeLatest(addDetailRequest.type, addDetailSaga);
}

export function* watchGetDetailById() {
  yield takeLatest(getDetailByIdRequest.type, getDetailByIdSaga);
}

export function* watchFetchtAthleteOfCompetitionAndMatchGroupSaga() {
    yield takeLatest(fetchtAthleteOfCompetitionandMatchGroupRequest.type, fetchtAthleteOfCompetitionAndMatchGroupSaga);
  }

export function* watchAddDetailDateAndTime() {
    yield takeLatest(addDetailsDateAndTimeRequest.type, addDetailDateAndTimeSaga);
  }
