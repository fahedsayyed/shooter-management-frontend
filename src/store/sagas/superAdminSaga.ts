import { takeLatest, call, put } from 'redux-saga/effects';
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
  sendEmailToTenantRequest,
  sendEmailToTenantSuccess,
  sendEmailToTenantFailure,
  getSubscriptionAndPlanSuccess,
  getSubscriptionAndPlanFailure,
  getSubscriptionAndPlanRequest,
  checkStateUniqueNameSuccess,
  checkStateUniqueNameFailure,
  checkStateUniqueNameRequest,
  fetchClubAndDraListRequest,
  fetchClubAndDraListFailure,
  fetchClubAndDraListSuccess,
} from '../reducers/TenentSlice';
import axiosServices from 'src/utils/axios';
import { notifyMessage } from 'src/utils/toastNotify';





function* fetchTenantListSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      axiosServices.get('/tenants/get-tenant-list')
    );
    yield put(fetchTenantListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchTenantListFailure(error.message));
  }
}

function* fetchClubAndDraListSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      axiosServices.get('/tenants/club-dra-listing')
    );
    yield put(fetchClubAndDraListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchClubAndDraListFailure(error.message));
  }
}

function* fetchTenantByIdSaga(action:any): Generator<any, void, any> {
  const id = action.payload;
  try {
    const response = yield call(() =>
      axiosServices.get(`/tenants/get-tenant/${id}`)
    );
    console.log(response,"ress")
    yield put(fetchTenantByIdSuccess(response.data.tenant));
  } catch (error: any) {

    yield put(fetchTenantByIdFailure(error.message));
  }
}

function* checkUniqueStateNameSaga(action:any): Generator<any, void, any> {
  const state = action.payload;
  try {
    const response = yield call(() =>
      axiosServices.get(`/tenants/check-unique-state/${state}`)
    );
    
      yield put(checkStateUniqueNameSuccess(response));
    
  } catch (error: any) {

    yield put(checkStateUniqueNameFailure(error.message));
  }
}


function* addTenantDataSaga(action: any): Generator<any, void, any> {
  const data = action.payload;
  try {
    const response = yield call(() => axiosServices.post(`/tenants/create`, data));

    const serializableData = {
      status: response.status,
      data: response.data,
    };

    yield put(addTenantSuccess(serializableData));

    if (response.status === 201) {
      notifyMessage.success(response.data.message);
    } else {
      notifyMessage.error("Something Went Wrong!!");
    }

    return response.data; 
  } catch (error: any) {
    yield put(addTenantFailure(error.response.data.message));
    notifyMessage.error(error.response.data.message);
    throw error; 
  }
}
function* editTenantDataSaga(action:any): Generator<any, void, any> {
  const {formData,id} = action.payload;

  try {
    const response = yield call(() =>
      axiosServices.put(`/tenants/edit-tenant/${id}`,formData)
    );

      yield put(editTenantSuccess(response));
     if(response.status === 200){
      notifyMessage.success(response.data.message)

    }
    else{
      notifyMessage.error("Something Went Wrong!!")
    }

  } catch (error: any) {

    yield put(editTenantFailure(error.message));
    notifyMessage.error(error.message)
  }
}

function* updateUserStatusSaga(action: any): Generator<any, void, any> {
  const { data, id } = action.payload;

  try {
    const response = yield call(() =>
      axiosServices.patch(`/tenants/tenant-status-update/${id}`, {
        name:data.name,
        contactPerson:data.contactPerson,
        email:data.email,
        tenantType:data.tenantType,
        user_status: data.user_status,
        in_active_reason: data.in_active_reason || null,
        in_active_by: data.in_active_by || null,
        state:data.state
      })
    );

    yield put(updateTenantStatusSuccess(response));
    if (response.status === 201) {
      notifyMessage.success(response.data.message);
    }
  } catch (error:any) {
    yield put(updateTenantStatusFailure(error));
     notifyMessage.error(error.message)

    // notifyMessage.error("You Didn't Edit Anything")
  }
}

function* gettenantRoleAndPermissionByIdSaga(action: any): Generator<any, void, any> {
  const  id  = action.payload;
  try {
    const response = yield call(() =>
      axiosServices.get(`/tenants/role-and-permission/${id}`)
    );


    yield put(getRoleAndPermissionSuccess(response.data.roleAndPermissions));
    // if (response.status === 200) {
    //   console.log("edited done ", response);
    //   // notifyMessage.success(response.data.message);
    // }
  } catch (error) {

    yield put(getRoleAndPermissionFailure(error));
    // notifyMessage.error("You Didn't Edit Anything")
  }
}

function* updateTenantRoleAndPermissionSaga(action: any): Generator<any, void, any> {
  const { data, id } = action.payload;

  try {
    const response = yield call(() =>
      axiosServices.put(`/tenants/update-role-and-permission/${id}`, {
        roleAndPermissions: data.roleAndPermissions,
      })
    );

    yield put(updateTenantRoleAndPermissionSuccess(response));
    if (response.status === 201) {
      notifyMessage.success(response.data.message);
    }
  } catch (error) {

    yield put(updateTenantRoleAndPermissionFailure(error));
    // notifyMessage.error("You Didn't Edit Anything")
  }
}

function* sendEmailToTenantSaga(action: any): Generator<any, void, any> {
  const { userEmail,associatedWith,fullName } = action.payload;

  try {
    const response = yield call(() =>
      axiosServices.post("/tenants/invite-email", {
        userEmail,
        associatedWith,
        fullName
      })
    );

    yield put(sendEmailToTenantSuccess(response));
    if (response.status === 200) {
      notifyMessage.success(response.data.message);
    }
  } catch (error) {

    yield put(sendEmailToTenantFailure(error));
    // notifyMessage.error("You Didn't Edit Anything")
  }
}


function* getSubscriptionAndPlanSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      axiosServices.get('/tenants/subscription-and-plan')
    );

    yield put(getSubscriptionAndPlanSuccess(response.data.subscriptionAndPlan));

  } catch (error) {
    yield put(getSubscriptionAndPlanFailure(error));
  }
}
export function* watchFetchTenantList() {
  yield takeLatest(fetchTenantListStart.type, fetchTenantListSaga);
}
export function* watchFetchTenantById() {
  yield takeLatest(fetchTenantByIdStart.type, fetchTenantByIdSaga);
}
export function* watchPostTenant() {
  yield takeLatest(addTenantRequest.type, addTenantDataSaga);
}
export function* watcheditTenant() {
  yield takeLatest(editTenantRequest.type, editTenantDataSaga);
}
export function* watcheupdateUserStatusTenant() {
  yield takeLatest(updateTenantStatusRequest.type, updateUserStatusSaga);
}
export function* watchGetRoleAndPermissionById() {
  yield takeLatest(getRoleAndPermissionRequest.type, gettenantRoleAndPermissionByIdSaga);
}
export function* watchUpdateRoleAndPermissionById() {
  yield takeLatest(updateTenantRoleAndPermissionRequest.type, updateTenantRoleAndPermissionSaga);
}
export function* watchSendEmailToTenant() {
  yield takeLatest(sendEmailToTenantRequest.type, sendEmailToTenantSaga);
}
export function* watchGetSubscriptionAndPlan() {
  yield takeLatest(getSubscriptionAndPlanRequest.type, getSubscriptionAndPlanSaga);
}

export function* watchCheckStateUniqueName() {
  yield takeLatest(checkStateUniqueNameRequest.type, checkUniqueStateNameSaga);
}
export function* watchFetchClubAndDraList() {
  yield takeLatest(fetchClubAndDraListRequest.type, fetchClubAndDraListSaga);
}