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
} from "../redux/slice/attendanceSlice";
import { API, HEADERS } from "./NetworkingConstants";
import { CALL_STATE } from "../../helpers/enum";

export const APIGetAttendanceByPagination =
  ({
    token,
    teamId,
    sortBy,
    sortDirection,
    pageNo,
    callState = CALL_STATE.FETCHING,

    start_day,
    end_day,
    shift,
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

      if (!!teamId) {
        data.append("team_id", teamId.toString());
      }

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
        data.append("start_day", start_day);
      }

      if (!!end_day) {
        data.append("end_day", end_day);
      }

      if (!!shift) {
        data.append("shift_id", shift);
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

export const APIGetAttendance = (token) => async (dispatch) => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.GET_ATTENDANCE_API;

    dispatch(getAttendancePending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        getAttendanceSuccess({
          data: responseData,
        })
      );
    } else if (response.status === 401) {
      dispatch(
        getAttendanceError({
          error: "Get_Attendance Api Call Auth Failed!",
        })
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        getAttendanceError({
          error: responseData.message,
        })
      );
    } else {
      dispatch(
        getAttendanceError({
          error: "Get_Attendance Api Call Failed!",
        })
      );
    }
  } catch (error) {
    dispatch(
      getAttendanceError({
        error: " Error in Get_Attendance Api Call!",
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
  };
