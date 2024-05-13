import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';
import { resetAll } from './appSlice ';
import { API } from '../../networking/NetworkingConstants';


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

  filterPlayerEntry: {
    state: string;
    actualPayload: any;
    error: string;
  };

  editPlayerEntry: {
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
  

  filterPlayerEntry: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  

  editPlayerEntry: {
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
  

    // Filter Player Entry 
    filterPlayerEntryIdle: state => {
      const currentState = current(state);

      state.filterPlayerEntry = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.filterPlayerEntry.actualPayload,
        error: currentState.filterPlayerEntry.error,
      };

      console.log(
        'Slice-Filter-Player-Entry-Idle:',
        current(state).filterPlayerEntry,
      );
    },
    filterPlayerEntryPending: state => {
      state.filterPlayerEntry = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-Filter-Player-Entry-Pending:',
        current(state).filterPlayerEntry,
      );
    },
    filterPlayerEntrySuccess: (state, action: PayloadAction<any>) => {
      state.filterPlayerEntry = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-Filter-Player-Entry-Success:',
        current(state).filterPlayerEntry,
      );
    },
    filterPlayerEntryError: (state, action: PayloadAction<any>) => {
      state.filterPlayerEntry = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-Filter-Player-Entry-Error:',
        current(state).filterPlayerEntry,
      );
    },

    // Edit Player Entry

    editplayeridle: state => {
      const currentState = current(state);

      state.editPlayerEntry = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.editPlayerEntry.actualPayload,
        error: currentState.editPlayerEntry.error,
      };

      console.log(
        'Slice-edit-PlayerEntryIdle:',
        current(state).editPlayerEntry,
      );
    },
    editPlayerEntryPending: state => {
      state.editPlayerEntry = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-edit-PlayerEntryPending:',
        current(state).editPlayerEntry,
      );
    },
    editPlayerEntrySuccess: (state, action: PayloadAction<any>) => {
      state.editPlayerEntry = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-edit-PlayerEntrySuccess:',
        current(state).editPlayerEntry,
      );
    },
    editPlayerEntryError: (state, action: PayloadAction<any>) => {
      state.editPlayerEntry = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-edit-PlayerEntryError:',
        current(state).editPlayerEntry,
      );
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

  
  filterPlayerEntryIdle,
  filterPlayerEntryPending,
  filterPlayerEntrySuccess,
  filterPlayerEntryError,

  editPlayerEntryError,
  editPlayerEntryPending,
  editPlayerEntrySuccess,
  editplayeridle,

  logoutFinance,

} = financeSlice.actions;

export default financeSlice.reducer;
