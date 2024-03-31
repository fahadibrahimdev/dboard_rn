import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';
import { resetAll } from './appSlice ';


export interface RemarksState {
  getRemarks: {
    state: string;
    actualPayload: any;
    error: string;
  };
  createRemarks: {
    state: string;
    actualPayload: any;
    error: string;
  };

}

const initialState: RemarksState = {
  getRemarks: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  createRemarks: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
};

export const remarksSlice = createSlice({
  name: 'remarks',
  initialState,
  extraReducers: (builder) => builder.addCase(resetAll, () => initialState),
  reducers: {

// Get Remarks 
getRemarksIdle: state => {
  const currentState = current(state);

  state.getRemarks= {
    state: CALL_STATE.IDLE,
    actualPayload: currentState.getRemarks.actualPayload,
    error: currentState.getRemarks.error,
  };

  console.log('Slice-get-Remarks-Idle:', current(state).getRemarks);
},
getRemarksPending: state => {
  state.getRemarks = {
    state: CALL_STATE.FETCHING,
    actualPayload: {},
    error: '',
  };
  console.log('Slice-get-Remarks-Pending:', current(state).getRemarks);
},
getRemarksSuccess: (state, action: PayloadAction<any>) => {
  state.getRemarks = {
    state: CALL_STATE.SUCCESS,
    actualPayload: action.payload.data,
    error: '',
  };

  console.log('Slice-get-Remarks-Success:', current(state).getRemarks);
},
getRemarksError: (state, action: PayloadAction<any>) => {
  state.getRemarks = {
    state: CALL_STATE.ERROR,
    actualPayload: {},
    error: action.payload.error,
  };

  console.log('Slice-get-Remarks-Error:', current(state).getRemarks);
},




// Create Remarks 
createRemarksIdle: state => {
  const currentState = current(state);

  state.createRemarks= {
    state: CALL_STATE.IDLE,
    actualPayload: currentState.createRemarks.actualPayload,
    error: currentState.createRemarks.error,
  };

  console.log('Slice-create-Remarks-Idle:', current(state).createRemarks);
},
createRemarksPending: state => {
  state.createRemarks = {
    state: CALL_STATE.FETCHING,
    actualPayload: {},
    error: '',
  };
  console.log('Slice-create-Remarks-Pending:', current(state).createRemarks);
},
createRemarksSuccess: (state, action: PayloadAction<any>) => {
  state.createRemarks = {
    state: CALL_STATE.SUCCESS,
    actualPayload: action.payload.data,
    error: '',
  };

  console.log('Slice-create-Remarks-Success:', current(state).createRemarks);
},
createRemarksError: (state, action: PayloadAction<any>) => {
  state.createRemarks = {
    state: CALL_STATE.ERROR,
    actualPayload: {},
    error: action.payload.error,
  };


  console.log('Slice-create-Remarks-Error:', current(state).createRemarks);

  
},







    logoutRemarks: state => initialState,
}})
// Action creators are generate for each case reducer function
export const {
  getRemarksIdle,
  getRemarksPending,
  getRemarksSuccess,
  getRemarksError,


  createRemarksIdle,
  createRemarksPending,
  createRemarksSuccess,
  createRemarksError,

  logoutRemarks,

} = remarksSlice.actions;

export default remarksSlice.reducer;
