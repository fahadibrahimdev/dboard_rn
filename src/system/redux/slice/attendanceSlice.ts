import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice, current} from '@reduxjs/toolkit';
import {CALL_STATE} from '../../../helpers/enum';

export interface AttendanceState {
  getAttendance: {
    state: string;
    actualPayload: any;
    error: string;
  };
  createAttendance: {
    state: string;
    actualPayload: any;
    error: string;
  };
  approveAttendance: {
    state: string;
    actualPayload: any;
    error: string;
  };

  // Team Attendance
  getTeamAttendance: {
    state: string;
    actualPayload: any;
    error: string;
  };

  getAttendanceByPagination: {
    state: string;
    actualPayload: any;
    error: string;
  };


  getWorkingTime: {
    state: string;
    actualPayload: any;
    error: string;
  };
  getUserById: {
    state: string;
    actualPayload: any;
    error: string;
  };
  getExportUserData: {
    state: string;
    actualPayload: any;
    error: string;
  };
 

}

const initialState: AttendanceState = {
  getAttendance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  createAttendance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  approveAttendance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },

  getTeamAttendance: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },

  getAttendanceByPagination: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  getWorkingTime: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  getUserById: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  getExportUserData: {
    state: CALL_STATE.IDLE,
    actualPayload: {},
    error: '',
  },
  
};

export const AttendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    getAttendanceIdle: state => {
      const currentState = current(state);

      state.getAttendance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getAttendance.actualPayload,
        error: currentState.getAttendance.error,
      };

      console.log('Slice-GET-attendanceIdle:', current(state).getAttendance);
    },
    getAttendancePending: state => {
      state.getAttendance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log('Slice-GET-attendancePending:', current(state).getAttendance);
    },
    getAttendanceSuccess: (state, action: PayloadAction<any>) => {
      state.getAttendance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log('Slice-GET-attendanceSuccess:', current(state).getAttendance);
    },

    getAttendanceError: (state, action: PayloadAction<any>) => {
      state.getAttendance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log('Slice-GET-attendanceError:', current(state).getAttendance);
    },

    createAttendanceIdle: state => {
      const currentState = current(state);

      state.createAttendance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.createAttendance.actualPayload,
        error: currentState.createAttendance.error,
      };

      console.log(
        'Slice-Create-attendanceIdle:',
        current(state).createAttendance,
      );
    },
    createAttendancePending: state => {
      state.createAttendance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-Create-attendancePending:',
        current(state).createAttendance,
      );
    },
    createAttendanceSuccess: (state, action: PayloadAction<any>) => {
      state.createAttendance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-Create-attendanceSuccess:',
        current(state).createAttendance,
      );
    },
    createAttendanceError: (state, action: PayloadAction<any>) => {
      state.createAttendance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-Create-attendanceError:',
        current(state).createAttendance,
      );
    },

    // Approve
    approveAttendanceIdle: state => {
      const currentState = current(state);

      state.approveAttendance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.createAttendance.actualPayload,
        error: currentState.approveAttendance.error,
      };

      console.log(
        'Slice-Approve-attendanceIdle:',
        current(state).approveAttendance,
      );
    },
    approveAttendancePending: state => {
      state.approveAttendance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-Approve-attendancePending:',
        current(state).approveAttendance,
      );
    },
    approveAttendanceSuccess: (state, action: PayloadAction<any>) => {
      state.approveAttendance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-Approve-attendanceSuccess:',
        current(state).approveAttendance,
      );
    },
    approveAttendanceError: (state, action: PayloadAction<any>) => {
      state.approveAttendance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-Approve-attendanceError:',
        current(state).approveAttendance,
      );
    },
    //Get Working Time

    getWorkingTimeIdle: state => {
      const currentState = current(state);

      state.getWorkingTime = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getWorkingTime.actualPayload,
        error: currentState.getWorkingTime.error,
      };

      console.log(
        'Slice-get-workingTimeIdle:',
        current(state).getWorkingTime,
      );
    },
    getWorkingTimePending: state => {
      state.getWorkingTime = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-get-workingTimePending:',
        current(state).getWorkingTime,
      );
    },
    getWorkingTimeSuccess: (state, action: PayloadAction<any>) => {
      state.getWorkingTime = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-get-workingTimeSuccess:',
        current(state).getWorkingTime,
      );
    },
    getWorkingTimeError: (state, action: PayloadAction<any>) => {
      state.getWorkingTime = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-get-workingTimeError:',
        current(state).getWorkingTime,
      );
    },
    //get user by id 
    getUserByIdIdle: state => {
      const currentState = current(state);

      state.getUserById = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getUserById.actualPayload,
        error: currentState.getUserById.error,
      };

      console.log(
        'Slice-Get-UserByIDIdle:',
        current(state).getUserById,
      );
    },
    getUserByIdPending: state => {
      state.getUserById = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-Get-UserByIDPending:',
        current(state).getUserById,
      );
    },
    getUserByIdSuccess: (state, action: PayloadAction<any>) => {
      state.getUserById = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-Get-UserByIDSuccess:',
        current(state).getUserById,
      );
    },
    getUserByIdError: (state, action: PayloadAction<any>) => {
      state.getUserById = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-Get-UserByIDError:',
        current(state).getUserById,
      );
    },

    
    // Team Attendance
    getTeamAttendanceIdle: state => {
      const currentState = current(state);

      state.getTeamAttendance = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getTeamAttendance.actualPayload,
        error: currentState.getTeamAttendance.error,
      };

      console.log(
        'Slice-GET-Team-attendanceIdle:',
        current(state).getTeamAttendance,
      );
    },
    getTeamAttendancePending: state => {
      state.getTeamAttendance = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-GET-Team-attendancePending:',
        current(state).getTeamAttendance,
      );
    },
    getTeamAttendanceSuccess: (state, action: PayloadAction<any>) => {
      state.getTeamAttendance = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-GET-Team-attendanceSuccess:',
        current(state).getTeamAttendance,
      );
    },
    getTeamAttendanceError: (state, action: PayloadAction<any>) => {
      state.getTeamAttendance = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-GET-Team-attendanceError:',
        current(state).getTeamAttendance,
      );
    },

    // Attendance By Pagination
    getAttendanceByPaginationIdle: state => {
      const currentState = current(state);

      state.getAttendanceByPagination = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getAttendanceByPagination.actualPayload,
        error: currentState.getAttendanceByPagination.error,
      };

      console.log(
        'Slice-GET-attendance-by-pagination-Idle:',
        current(state).getAttendanceByPagination,
      );
    
    },
    getAttendanceByPaginationPending: (state, action: PayloadAction<any>) => {
      const currentState = current(state);

      state.getAttendanceByPagination = {
        state: action.payload.status,
        actualPayload:
          action.payload.status === CALL_STATE.REFRESHING
            ? {}
            : currentState.getAttendanceByPagination.actualPayload,
        error: '',
      };
      console.log(
        'Slice-GET-attendance-by-pagination-Pending:',
        current(state).getAttendanceByPagination,
      );
    },
    getAttendanceByPaginationSuccess: (state, action: PayloadAction<any>) => {
      state.getAttendanceByPagination = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-GET-attendance-by-pagination-Success:',
        current(state).getAttendanceByPagination,
      );
    },
    getAttendanceByPaginationError: (state, action: PayloadAction<any>) => {
      state.getAttendanceByPagination = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-GET-attendance-by-pagination-Error:',
        current(state).getAttendanceByPagination,
      );
    },

    // Export User Data 
    getExportUserDataIdle: state => {
      const currentState = current(state);

      state.getExportUserData = {
        state: CALL_STATE.IDLE,
        actualPayload: currentState.getExportUserData.actualPayload,
        error: currentState.getExportUserData.error,
      };

      console.log(
        'Slice-getExport-User-DataIdle:',
        current(state).getExportUserData,
      );
    },
    getExportUserDataPending: state => {
      state.getExportUserData = {
        state: CALL_STATE.FETCHING,
        actualPayload: {},
        error: '',
      };
      console.log(
        'Slice-getExport-User-DataPending:',
        current(state).getExportUserData,
      );
    },
    getExportUserDataSuccess: (state, action: PayloadAction<any>) => {
      state.getExportUserData = {
        state: CALL_STATE.SUCCESS,
        actualPayload: action.payload.data,
        error: '',
      };

      console.log(
        'Slice-getExport-User-DataSuccess:',
        current(state).getExportUserData,
      );
    },
    getExportUserDataError: (state, action: PayloadAction<any>) => {
      state.getExportUserData = {
        state: CALL_STATE.ERROR,
        actualPayload: {},
        error: action.payload.error,
      };

      console.log(
        'Slice-getExport-User-DataError:',
        current(state).getExportUserData,
      );
    },
    
    logoutAttendance: state => initialState,
  },
  
});

// Action creators are generated for each case reducer function
export const {
  getAttendanceIdle,
  getAttendancePending,
  getAttendanceSuccess,
  getAttendanceError,

  createAttendanceIdle,
  createAttendancePending,
  createAttendanceSuccess,
  createAttendanceError,

  approveAttendanceIdle,
  approveAttendancePending,
  approveAttendanceSuccess,
  approveAttendanceError,

  getTeamAttendanceIdle,
  getTeamAttendancePending,
  getTeamAttendanceSuccess,
  getTeamAttendanceError,

  getAttendanceByPaginationIdle,
  getAttendanceByPaginationPending,
  getAttendanceByPaginationSuccess,
  getAttendanceByPaginationError,

  
  getWorkingTimeIdle,
  getWorkingTimePending,
  getWorkingTimeSuccess,
  getWorkingTimeError,

  getUserByIdIdle,
  getUserByIdPending,
  getUserByIdSuccess,
  getUserByIdError,

  getExportUserDataIdle,
  getExportUserDataPending,
  getExportUserDataSuccess,
  getExportUserDataError,

  logoutAttendance,
} = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
