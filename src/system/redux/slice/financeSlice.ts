import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';
import { resetAll } from './appSlice ';


export interface FinanceState {
  getFinance: {
    state: string;
    actualPayload: any;
    error: string;
  };
  createFinance: {
    state: string;
    actualPayload: any;
    error: string;
  };

}

const initialState: FinanceState = {
  getFinance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  createFinance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  extraReducers: (builder) => builder.addCase(resetAll, () => initialState),
  reducers: {

//  Get Finance Actions
    getFinanceIdle: state => {
      const currentState = current(state);

      state.getFinance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getFinance.actualPayload,
        error: currentState.getFinance.error,
      };

      console.log('Slice-GET_Finance_Idle:', current(state).getFinance);
    },
    getFinancePending: state => {
      state.getFinance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-GET_Finance_Pending:', current(state).getFinance);
    },
    getFinanceSuccess: (state, action: PayloadAction<any>) => {
      state.getFinance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-GET_Finance_Success:', current(state).getFinance);
    },
    getFinanceError: (state, action: PayloadAction<any>) => {
      state.getFinance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-GET_Finance_Error:', current(state).getFinance);
    },
    
//  Create Finance Actions
    createFinanceIdle: state => {
      const currentState = current(state);

      state.createFinance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.createFinance.actualPayload,
        error: currentState.createFinance.error,
      };

      console.log('Slice-Create-finance_Idle:', current(state).createFinance);
    },
    createFinancePending: state => {
      state.createFinance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-Create-finance_Pending:', current(state).createFinance);
    },
    createFinanceSuccess: (state, action: PayloadAction<any>) => {
      state.createFinance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-Create-finance_Success:', current(state).createFinance);
    },
    createFinanceError: (state, action: PayloadAction<any>) => {
      state.createFinance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-Create-finance_Error:', current(state).createFinance);
    },


    logoutFinance: state => initialState,
}})
// Action creators are generate for each case reducer function
export const {
  getFinanceIdle,
  getFinancePending,
  getFinanceSuccess,
  getFinanceError,

  
  createFinanceIdle,
  createFinancePending,
  createFinanceSuccess,
  createFinanceError,


  logoutFinance,

} = financeSlice.actions;

export default financeSlice.reducer;
