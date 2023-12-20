import type {PayloadAction} from '@reduxjs/toolkit';
import {createAction, createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';

export interface AuthState {
  heartBeat: {
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

  },
});

// Action creators are generated for each case reducer function
export const {
  heartbeatIdle,
  heartbeatPending,
  heartbeatSuccess,
  heartbeatError,

} = appSlice.actions;

export default appSlice.reducer;
