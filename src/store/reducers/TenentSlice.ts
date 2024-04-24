import { createSlice } from "@reduxjs/toolkit";


interface SlideOne {
  tenentType: string;
  name: string;
  state: string;
  address: string;
  address2: string;
  address3: string;
  city: string;
  pincode: string;
  memoRandomProof : any
  

}

interface SlideTwo {
  contactPerson: string;
  alternateContactPerson: string;
  email: string;
  alternateEmail: string;
  phoneNo: string;
  alternatePhoneNo: string;
}

interface SlideThree {
  transactionNumber:string;
  subscriptionAndPlanId : any;
  amount:number;
  contract_document: string;
  contractName:string;
  contractStatus: string;
  contract_start_date: string;
  contract_end_date: string;
}

interface FormData {
  slideOne: SlideOne;
  slideTwo: SlideTwo;
  slideThree: SlideThree;
}

interface StateRow {
  id: number;
  payment_module: string;
  status: boolean;
}
interface contract {
  contract_document: string;
  contractName: string;
  contractStatus: string;
  contract_start_date:string;
  contract_end_date:string;
}
interface RoleAndPermission {
  id: number;
  tenant_data_id: number;
  resources: string;
  permissions: {
    [key: string]: boolean;
  };
}
interface TenentState {
  findTenent: string | null;
  formData: FormData;
  stateRows: StateRow[];
  contract: contract[];
  tenantRoleAndPermission:RoleAndPermission[];
  tenantList:any,
  tenant:any,
  subscriptionsAndPlans:any;
  emailSendError : any,
  uniqueStateCheckMessage:any,
  clubAndDra :any;
  loading:boolean,
  error:any,
  response:any,
//   errors: Record<string, Record<string, string>>;
}

const initialState: TenentState = {
  findTenent: null,
  tenantList: [],
  tenant:[],
  tenantRoleAndPermission:[],
  subscriptionsAndPlans :[],
  uniqueStateCheckMessage : null,
  loading:false,
  error:null,
  response:null,
  emailSendError:null,
  clubAndDra:null,
  formData: {
    slideOne: {
      tenentType: '',
      name: '',
      state: '',
      address: '',
      address2: '',
      address3: '',
      city: '',
      pincode: '',
      memoRandomProof:''
    },
    slideTwo: {
      contactPerson: '',
      alternateContactPerson: '',
      email: '',
      alternateEmail: '',
      phoneNo: '',
      alternatePhoneNo: '',
    },
    slideThree: {
      transactionNumber:'',
      subscriptionAndPlanId : '',
      amount:0,
      contract_document: '',
      contractName:'',
      contractStatus: '',
      contract_start_date: '',
      contract_end_date: '',
    },
  },
  stateRows: [
    { id: 1, payment_module: 'YOUTH RIFLE CLUB', status: true },
    { id: 2, payment_module: 'YASHWANT KESHAV PATIL COLLEGE OF COMMERCE', status: false },
  ],
  contract: [
     
  ],
  
};

export const TenentSlice = createSlice({
  name: 'tenent',
  initialState,
  reducers: {
    setSlideOneFormData: (state: any, action: any) => {
        
      return {

           ...state,
          formData: {
            
            ...state.formData,
            slideOne: {
              ...state.formData.slideOne,
              ...action.payload,
            },
          },
        };
      },
      setSlideTwoFormData: (state: any, action: any) => {
        return {
          ...state,
          formData: {
            ...state.formData,
            slideTwo: {
              ...state.formData.slideTwo,
              ...action.payload,
            },
          },
        };
      },
      setSlideThreeFormData: (state: any, action: any) => {
        return {
          ...state,
          formData: {
            ...state.formData,
            slideThree: {
              ...state.formData.slideThree,
              ...action.payload,
            },
          },
        };
      },
      pushSlideThreeToContract: (state, action) => {
        return {
          ...state,
          contract: [...state.contract, action.payload],
        };
      },
      fetchTenantListStart: state => {
        state.loading = true;
      },
      fetchTenantListSuccess: (state, action) => {
        state.loading = false;
        state.tenantList = action.payload;
        state.error = null;
      },
      fetchTenantListFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fetchTenantByIdStart: (state,action) => {
        state.loading = true;
        
      },
      fetchTenantByIdSuccess: (state, action) => {
        state.loading = false;
        state.tenant = action.payload;
        state.error = null;
      },
      fetchTenantByIdFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      addTenantRequest : (state,action)=>{
        state.loading = true
      },
      addTenantSuccess : (state,action)=>{
        state.loading = true
        state.response = action.payload
        state.loading = false

      },
      addTenantFailure : (state,action)=>{
        state.loading = true
        state.error = action.payload
        state.loading = false


      },
      editTenantRequest : (state,action)=>{
        state.loading = true
      },
      editTenantSuccess : (state,action)=>{
        state.loading = false
        // state.response = action.payload
      },
      editTenantFailure : (state,action)=>{
        state.error = action.payload
      },
      updateTenantStatusRequest :(state,action)=>{
        state.loading = true
      },
      updateTenantStatusSuccess :(state,action)=>{
        state.loading = true
        state.response = action.payload
        state.loading = false
      },
      updateTenantStatusFailure :(state,action)=>{
        state.loading = true
        state.error = action.payload
        state.loading = false
      },
      getRoleAndPermissionRequest :(state,action)=>{
        state.loading = true
      },
      getRoleAndPermissionSuccess :(state,action)=>{
        state.loading = false
        state.tenantRoleAndPermission = action.payload
      },
      getRoleAndPermissionFailure :(state,action)=>{
        state.error = action.payload
      },
      updateTenantRoleAndPermissionRequest :(state,action)=>{
        state.loading = true
      },
      updateTenantRoleAndPermissionSuccess :(state,action)=>{
        state.loading = false
        // state.response = action.payload
      },
      updateTenantRoleAndPermissionFailure :(state,action)=>{
        state.error = action.payload
      },
      sendEmailToTenantRequest :(state,action)=>{
        state.loading = true
      },
      sendEmailToTenantSuccess :(state,action)=>{
        state.loading = true
        state.emailSendError = action.payload
        state.loading = false
      },
      sendEmailToTenantFailure :(state,action)=>{
        state.loading = true
        state.error = action.payload
        state.loading = false
      },
      getSubscriptionAndPlanRequest :(state)=>{
        state.loading = true
      },
      getSubscriptionAndPlanSuccess :(state,action)=>{
        state.loading = false
        state.subscriptionsAndPlans = action.payload
      },
      getSubscriptionAndPlanFailure :(state,action)=>{
        state.error = action.payload
      },
      checkStateUniqueNameRequest: (state, action) => {
        state.loading = true;
      },
      checkStateUniqueNameSuccess: (state, action) => {
        state.uniqueStateCheckMessage = action.payload;
        state.loading = false; // Set loading to false on success
      },
      checkStateUniqueNameFailure: (state, action) => {
        state.uniqueStateCheckMessage = action.payload; // Update uniqueStateCheckMessage
        state.loading = false; // Set loading to false on failure
      },
      clearStateUniqueNameError : (state,action)=>{
        state.uniqueStateCheckMessage = action.payload
      },
      fetchClubAndDraListRequest: (state) => {
        state.loading = false; // Set loading to false on success
      },
      fetchClubAndDraListSuccess: (state, action) => {
        state.clubAndDra = action.payload; // Update uniqueStateCheckMessage
        state.loading = false; // Set loading to false on failure
      },
      fetchClubAndDraListFailure : (state,action)=>{
        state.error = action.payload
      }
},
});

export const {
  setSlideOneFormData,
  setSlideTwoFormData,
  setSlideThreeFormData,
  fetchTenantListStart,
  fetchTenantListSuccess,
  fetchTenantListFailure,
  fetchTenantByIdStart,
  fetchTenantByIdSuccess,
  fetchTenantByIdFailure,
  addTenantRequest,
  addTenantSuccess,
  addTenantFailure,
  editTenantRequest,
  editTenantSuccess,
  editTenantFailure,
  pushSlideThreeToContract,
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
  getSubscriptionAndPlanRequest,
  getSubscriptionAndPlanSuccess,
  getSubscriptionAndPlanFailure,
  checkStateUniqueNameRequest,
  checkStateUniqueNameSuccess,
  checkStateUniqueNameFailure,
  clearStateUniqueNameError,
  fetchClubAndDraListRequest,
  fetchClubAndDraListSuccess,
  fetchClubAndDraListFailure
 } = TenentSlice.actions;


export default TenentSlice.reducer;
