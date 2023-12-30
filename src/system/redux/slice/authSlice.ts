import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice, current} from '@reduxjs/toolkit';
import { CALL_STATE } from '../../../helpers/enum';
import { resetAll } from './appSlice ';

export interface AuthState {
  authUser: {
    state: string;
    accessToken: string;
    actualPayload: any;
    error: string;
  };

  signup: {
    state: string;
    actualPayload: any;
    error: string;
  };

  editprofile: {
    state: string;
    actualPayload: any;
    error: string;
  };

  
  changepassword: {
    state: string;
    actualPayload: any;
    error: string;
  };
  deleteUser: {
    state: string;
    actualPayload: any;
    error: string;
  }



}

const initialState: AuthState = {
  authUser: {
    state: CALL_STATE.IDLE,
    accessToken: '',
    actualPayload: {},
    error: '',
  },

  signup: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
  editprofile: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
  deleteUser: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
  changepassword: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
   
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => builder.addCase(resetAll, () => initialState),
  reducers: {
    signInIdle: state => {
      const currentState = current(state);

      state.authUser = {
        state: CALL_STATE.IDLE,
        accessToken: currentState.authUser.accessToken,
        actualPayload: currentState.authUser.actualPayload,
        error: currentState.authUser.error,
      };

      console.log('Slice-signInIdle:', current(state).authUser);
    },
    signInPending: state => {
      state.authUser = {
        state: CALL_STATE.FETCHING,
        accessToken: '',
        actualPayload: {},
        error: '',
      };
      console.log('Slice-signInPending:', current(state).authUser);
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.authUser = {
        state: CALL_STATE.SUCCESS,
        accessToken: action.payload.accessToken,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-signInSuccess:', current(state).authUser);
    },
    signInError: (state, action: PayloadAction<any>) => {
      state.authUser = {
        state: CALL_STATE.ERROR,
        accessToken: '',
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-signInError:', current(state).authUser);
    },
    signInSetData: (state, action: PayloadAction<any>) => {
      state.authUser = {
        state: CALL_STATE.UPDATED,
        accessToken: action.payload.accessToken,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-signIn_UPDATED:', current(state).authUser);
    },

// SignUp API

    signUPIdle: state => {
      const currentState = current(state);

      state.signup = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.signup.actualPayload,
        error: currentState.signup.error,
      };

      console.log('Slice-signUpIdle:', current(state).signup);
    },
    signUpPending: state => {
      state.signup = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-signUpPending:', current(state).signup);
    },
    signUpSuccess: (state, action: PayloadAction<any>) => {
      state.signup = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-signUpSuccess:', current(state).signup);
    },
    signUpError: (state, action: PayloadAction<any>) => {
      state.signup = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-signUpError:', current(state).signup);
    },
    // Delete user
    deleteuserIdle: state => {
      const currentState = current(state);
      state.deleteUser = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.deleteUser.actualPayload,
        error: currentState.deleteUser.error,
      };

      console.log('Slice-deleteuserIdle:', current(state).deleteUser);
    },
    deleteuserPending: state => {
      state.deleteUser = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-deleteuserPending:', current(state).deleteUser);
    },
    deleteuserSuccess: (state, action: PayloadAction<any>) => {
      state.deleteUser = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-deleteuserSuccess:', current(state).deleteUser);
    },
    deleteuserError: (state, action: PayloadAction<any>) => {
      state.deleteUser = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-deleteuserError:', current(state).deleteUser);
    },
    // Edit Profile

    editprofileIdle: state => {
      const currentState = current(state);

      state.editprofile = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.editprofile.actualPayload,
        error: currentState.editprofile.error,
      };

      console.log('Slice-editprofileIdle:', current(state).editprofile);
    },
    editprofilePending: state => {
      state.editprofile = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-editprofilePending:', current(state).editprofile);
    },
    editprofileSuccess: (state, action: PayloadAction<any>) => {
      state.editprofile = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-editprofileSuccess:', current(state).editprofile);
    },
    editprofileError: (state, action: PayloadAction<any>) => {
      state.editprofile = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-editprofileError:', current(state).editprofile);
    },

    
    // Change Password

    changepasswordIdle: state => {
      const currentState = current(state);

      state.changepassword = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.changepassword.actualPayload,
        error: currentState.changepassword.error,
      };

      console.log('Slice-changepasswordIdle:', current(state).changepassword);
    },
    changepasswordPending: state => {
      state.changepassword = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-changepasswordPending:', current(state).changepassword);
    },
    changepasswordSuccess: (state, action: PayloadAction<any>) => {
      state.changepassword = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-changepasswordSuccess:', current(state).changepassword);
    },
    changepasswordError: (state, action: PayloadAction<any>) => {
      state.changepassword = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-changepasswordError:', current(state).changepassword);
    },

    logoutAuth: state => initialState,

  },
});

// Action creators are generated for each case reducer function
export const {
  signInIdle,
  signInPending,
  signInSuccess,
  signInError,
  signInSetData,

  signUPIdle,
  signUpPending,
  signUpSuccess,
  signUpError,

  editprofileIdle,
  editprofilePending,
  editprofileSuccess,
  editprofileError,

  changepasswordIdle,
  changepasswordPending,
  changepasswordSuccess,
  changepasswordError,

  
  deleteuserIdle,
  deleteuserPending,
  deleteuserSuccess,
  deleteuserError,

  logoutAuth,
  
} = authSlice.actions;

export default authSlice.reducer;
