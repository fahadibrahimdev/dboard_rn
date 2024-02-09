import type {PayloadAction} from '@reduxjs/toolkit';
import {createAction, createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';
import { State } from 'react-native-gesture-handler';

export interface AuthState {
  heartBeat: {
    state: string;
    actualPayload: any;
    error: string;
  };

  updateNews: {
    state: string;
    actualPayload: any;
    error: string;
  };
}

const initialState: AuthState = {
  heartBeat: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },

  updateNews: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
};

export const resetAll = createAction('RESET_ALL')

export const appSlice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => builder.addCase(resetAll, () => initialState),

  reducers: {
    heartbeatIdle: state => {
      const currentState = current(state);

      state.heartBeat = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.heartBeat.actualPayload,
        error: currentState.heartBeat.error,
      };

      console.log('Slice-heartbeatIdle:', current(state).heartBeat);
    },
    heartbeatPending: state => {
      state.heartBeat = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-heartbeatPending:', current(state).heartBeat);
    },
    heartbeatSuccess: (state, action: PayloadAction<any>) => {
      state.heartBeat = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-heartbeatSuccess:', current(state).heartBeat);
    },
    heartbeatError: (state, action: PayloadAction<any>) => {
      state.heartBeat = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-heartbeatError:', current(state).heartBeat);
    },
    heartbeatUpdate: (state, action: PayloadAction<any>) => {
      state.heartBeat = {
        ...state.heartBeat,
        actualPayload: action.payload.data,
      };

      console.log('Slice-heartbeatUpdated:', current(state).heartBeat);
    },

// Update news 
    updatenewsIdle: state => {
      const currentState = current(state);
  
      state.updateNews = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.updateNews.actualPayload,
        error: currentState.updateNews.error,
      };
  
      console.log(
        'Slice-Update-NewsIdle:',
        current(state).updateNews,
      );
    },
    updatenewsPending: state => {
      state.updateNews = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-Update-News-Pending:',
        current(state).updateNews,
      );
    },
    updatenewsSuccess: (state, action: PayloadAction<any>) => {
      state.updateNews = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };
  
      console.log(
        'Slice-Update-News-Succes:',
        current(state).updateNews,
      );
    },
    updatenewsError: (state, action: PayloadAction<any>) => {
      state.updateNews = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };
  
      console.log(
        'Slice-Update-News-Error:',
        current(state).updateNews,
      );

  },
  
  },

});

// Action creators are generated for each case reducer function
export const {
  heartbeatIdle,
  heartbeatPending,
  heartbeatSuccess,
  heartbeatError,
  heartbeatUpdate,

  updatenewsIdle,
  updatenewsPending,
  updatenewsSuccess,
  updatenewsError,

} = appSlice.actions;

export default appSlice.reducer;
