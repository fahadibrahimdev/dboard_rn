import moment from "moment-timezone";
import {
  approveAttendanceError,
  approveAttendancePending,
  approveAttendanceSuccess,
  createAttendanceError,
  createAttendancePending,
  createAttendanceSuccess,
  getAttendanceByPaginationError,
  getAttendanceByPaginationPending,
  getAttendanceByPaginationSuccess,
  getAttendanceError,
  getAttendancePending,
  getAttendanceSuccess,
  getTeamAttendanceError,
  getTeamAttendancePending,
  getTeamAttendanceSuccess,
  getWorkingTimeError,
  getWorkingTimePending,
  getWorkingTimeSuccess,
  getUserByIdIdle,
  getUserByIdPending,
  getUserByIdSuccess,
  getUserByIdError,
  getExportUserDataIdle,
  getExportUserDataPending,
  getExportUserDataSuccess,
  getExportUserDataError,
} from "../redux/slice/attendanceSlice";
import { API, HEADERS } from "./NetworkingConstants";
import { CALL_STATE } from "../../helpers/enum";
import { parseXmlData } from "../../helpers/Utils";

export const APIGetAttendanceByPagination =
  ({
    token,
    sortBy,
    sortDirection,
    pageNo,
    callState = CALL_STATE.FETCHING,
    start_day,
    end_day,
    shift,
    teamId,
    userId,
    status,
  }) =>
  async (dispatch, getState) => {
    try {
      // Define the URL of the API endpoint
      const apiUrl = API.GET_ATTENDANCE_BY_PAGINATION_API;

      let currentGetAttendanceByPagination = JSON.parse(
        JSON.stringify(getState().attendance.getAttendanceByPagination)
      );

      const data = new URLSearchParams();

      data.append("limit", (20).toString());

      if (!!sortBy) {
        data.append("sortBy", sortBy);
      }
      if (!!sortDirection) {
        data.append("sortDirection", sortDirection);
      }

      if (!!pageNo) {
        data.append("page", pageNo.toString());
      } else {
        data.append("page", (1).toString());
      }

      if (!!start_day) {
        const myUTCDateTime = moment(start_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("start_day", myUTCDateTime);
      }

      if (!!end_day) {
        const myUTCDateTime = moment(end_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("end_day", myUTCDateTime);
      }

      if (!!shift) {
        data.append("shift_id", shift);
      }

      if (!!teamId) {
        data.append("team_id", teamId.toString());
      }

      if (!!userId) {
        data.append("user_id", userId.toString());
      }

      if (!!status) {
        data.append("status", status.toString());
      }

      dispatch(
        getAttendanceByPaginationPending({
          status: callState,
        })
      );
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          ...HEADERS,
          Authorization: "Bearer " + token,
        },
        body: data.toString(), // Convert the data to a URL-encoded string
      });

      if (response.status === 200) {
        const responseData = await response.json();

        if (callState === CALL_STATE.REFRESHING) {
          dispatch(
            getAttendanceByPaginationSuccess({
              data: responseData,
            })
          );
        } else {
          let updatedData = responseData;

          let concatedArray = [
            ...currentGetAttendanceByPagination.actualPayload.data.attendances,
            ...updatedData.data.attendances,
          ];

          updatedData.data.attendances = concatedArray;

          dispatch(
            getAttendanceByPaginationSuccess({
              data: updatedData,
            })
          );
        }
      } else if (response.status === 401) {
        dispatch(
          getAttendanceByPaginationError({
            error: "Get_Attendance_By_pagination Api Call Auth Failed!",
          })
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          getAttendanceByPaginationError({
            error: responseData.message,
          })
        );
      } else {
        dispatch(
          getAttendanceByPaginationError({
            error: "Get_Attendance_By_pagination Api Call Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getAttendanceByPaginationError({
          error: " Error in Get_Attendance_By_pagination Api Call!",
        })
      );
    }
  };

// Get user by id

export const APIGetUserById = (token, team_id) => async (dispatch) => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.GET_USER_BY_ID__API;

    const data = new URLSearchParams();

    data.append("team_id", team_id);

    dispatch(getUserByIdPending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + token,
      },
      body: data.toString(),
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        getUserByIdSuccess({
          data: responseData,
        })
      );
    } else if (response.status === 401) {
      dispatch(
        getUserByIdError({
          error: "Get_User_By_Id Api Call Auth Failed!",
        })
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        getUserByIdError({
          error: responseData.message,
        })
      );
    } else {
      dispatch(
        getUserByIdError({
          error: "Get_User_By_Id  Api Call Failed!",
        })
      );
    }
  } catch (error) {
    dispatch(
      getUserByIdError({
        error: " Error in Get_User_By_Id  Api Call!",
      })
    );
  }
};

export const APIGetTeamAttendance = (token, teamId) => async (dispatch) => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.GET_TEAM_ATTENDANCE_API;

    const data = new URLSearchParams();

    data.append("teamId", teamId);

    dispatch(getTeamAttendancePending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + token,
      },
      body: data.toString(), // Convert the data to a URL-encoded string
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        getTeamAttendanceSuccess({
          data: responseData,
        })
      );
    } else if (response.status === 401) {
      dispatch(
        getTeamAttendanceError({
          error: "Get_Team_Attendance Api Call Auth Failed!",
        })
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        getTeamAttendanceError({
          error: responseData.message,
        })
      );
    } else {
      dispatch(
        getTeamAttendanceError({
          error: "Get_Team_Attendance Api Call Failed!",
        })
      );
    }
  } catch (error) {
    dispatch(
      getTeamAttendanceError({
        error: " Error in Get_Team_Attendance Api Call!",
      })
    );
  }
};

export const APIcreateAttendance =
  (token, start_time, end_time, shift_id, teamId) => async (dispatch) => {
    try {
      const apiUrl = API.CREATE_ATTENDANCE_API;

      const data = new URLSearchParams();

      data.append(
        "start_time",
        moment(start_time).utc().format("YYYY-MM-DD HH:mm:ss")
      );
      data.append("shift_id", shift_id);
      data.append("teamId", teamId);

      if (!!end_time) {
        data.append(
          "end_time",
          moment(end_time).utc().format("YYYY-MM-DD HH:mm:ss")
        );
      }

      dispatch(createAttendancePending());

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          ...HEADERS,
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: data.toString(),
      });

      if (response.status >= 200 && response.status <= 202) {
        const responseData = await response.json();

        dispatch(
          createAttendanceSuccess({
            data: responseData,
          })
        );
      } else if (response.status === 401) {
        dispatch(
          createAttendanceError({
            error: "Create_Attendance Api Call Auth Failed!",
          })
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          createAttendanceError({
            error: responseData.message,
          })
        );
      } else {
        dispatch(
          createAttendanceError({
            error: "Create_Attendance Api Call Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        createAttendanceError({
          error: " Error in Create_Attendance Api Call!",
        })
      );
    }
  };

// working time

export const APIGetWorkingTime =
  ({ token, start_day, end_day, shift, teamId, userId, status }) =>
  async (dispatch) => {
    try {
      const apiUrl = API.GET_WORKING_TIME_API;

      const data = new URLSearchParams();

      // data.append("user_id", '1');

      // data.append("start_date", '2023-10-01');

      // data.append("end_date", '2023-12-30');

      if (!!start_day) {
        const myUTCDateTime = moment(start_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("start_date", myUTCDateTime);
      }

      if (!!end_day) {
        const myUTCDateTime = moment(end_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("end_date", myUTCDateTime);
      } else {
        const myUTCDateTime = moment(new Date())
          .utc()
          .format("YYYY-MM-DD 23:59:59");
        data.append("end_date", myUTCDateTime);
      }

      if (!!shift) {
        data.append("shift_id", shift);
      }

      if (!!teamId) {
        data.append("team_id", teamId.toString());
      }

      if (!!userId) {
        data.append("user_id", userId.toString());
      }

      if (!!status) {
        data.append("status", status.toString());
      }

      dispatch(getWorkingTimePending());

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          ...HEADERS,
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: data.toString(),
      });

      if (response.status >= 200 && response.status <= 202) {
        const responseData = await response.json();

        dispatch(
          getWorkingTimeSuccess({
            data: responseData,
          })
        );
      } else if (response.status === 401) {
        dispatch(
          getWorkingTimeError({
            error: "Get_Working_Time Api Call Auth Failed!",
          })
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          getWorkingTimeError({
            error: responseData.message,
          })
        );
      } else {
        dispatch(
          createAttendanceError({
            error: "Get_Working_Time Api Call Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getWorkingTimeError({
          error: " Error in Get_Working_TimeError Api Call!",
        })
      );
    }
  };


export const ApiApproveAttendance =
  (token, end_time, attendanceID, attendanceStatus) => async (dispatch) => {
    try {
      const apiUrl = API.EDIT_ATTENDANCE_API;

      const data = new URLSearchParams();

      data.append("attendance_id", attendanceID);

      if (!!end_time) {
        data.append(
          "end_time",
          moment(end_time).utc().format("YYYY-MM-DD HH:mm:ss")
        );
      }

      if (!!attendanceStatus && attendanceStatus === "Approved") {
        data.append("approve", true);
      }

      if (!!!!attendanceStatus && attendanceStatus === "Denied") {
        data.append("deny", true);
      }

      dispatch(approveAttendancePending());

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          ...HEADERS,
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: data.toString(),
      });

      if (response.status >= 200 && response.status <= 202) {
        const responseData = await response.json();

        dispatch(
          approveAttendanceSuccess({
            data: responseData,
          })
        );
      } else if (response.status === 401) {
        dispatch(
          approveAttendanceError({
            error: "Approve_Attendance Api Call Auth Failed!",
          })
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          approveAttendanceError({
            error: responseData.message,
          })
        );
      } else {
        dispatch(
          approveAttendanceError({
            error: "Approve_Attendance Api Call Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        approveAttendanceError({
          error: " Error in Approve_Attendance Api Call!",
        })
      );
    }
  }
    // Get Export user Data

    export const APIexportUserdata =
    ({
      token,
      start_day,
      end_day,
      shift,
      teamId,
      userId,
      status,
    }) => async (dispatch) => {
      try {
        const apiUrl = API.EXPORT_USER_DATA_API;
  
        const data = new URLSearchParams();


      if (!!start_day) {
        const myUTCDateTime = moment(start_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("start_date", myUTCDateTime);
      }

      if (!!end_day) {
        const myUTCDateTime = moment(end_day)
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
        data.append("end_date", myUTCDateTime);
      } else {
        const myUTCDateTime = moment(new Date())
          .utc()
          .format("YYYY-MM-DD 23:59:59");
        data.append("end_date", myUTCDateTime);
      }

      if (!!shift) {
        data.append("shift_id", shift);
      }

      if (!!teamId) {
        data.append("team_id", teamId.toString());
      }

      if (!!userId) {
        data.append("user_id", userId.toString());
      }

      if (!!status) {
        data.append("status", status.toString());
      }

        dispatch(getExportUserDataPending());
  
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            ...HEADERS,
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: data.toString(),
        });
  
        if (response.status >= 200 && response.status <= 202) {
          // const responseData = await response.json();

          const xmlData = await response.text();
          parseXmlData(xmlData);
          
  
          dispatch(
            getExportUserDataSuccess({
              data: {},
            })
          );
        } else if (response.status === 401) {
          dispatch(
            getExportUserDataError({
              error: "Export-User-Data  Api Call Auth Failed!",
            })
          );
        } else if (response.status === 400) {
          const responseData = await response.json();
          dispatch(
            getExportUserDataError({
              error: responseData.message,
            })
          );
        } else {
          dispatch(
            getExportUserDataError({
              error: "Export-User-Data  Api Call Failed!",
            })
          );
        }
      } catch (error) {
        dispatch(
          getExportUserDataError({
            error: " Error in Export-User-Data Api Call!",
          })
        );
      }
    };
