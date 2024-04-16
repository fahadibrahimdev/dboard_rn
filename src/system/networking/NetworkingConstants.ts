export const HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
};

const PROD = {
  BASEURL: "https://mab.thundertechsol.com/mab",
};

const UAT = {
  BASEURL: "https://dboarduat.thundertechsol.com/mab",
};

const QA= {
  BASEURL: "https://dboardqa.thundertechsol.com/mab",
};


//SET MAIN ENVIRONMENT
export const ENV = QA;

export const API = {
  //Auth Related APIs
  // (OLD API Deprecated)
  // SIGN_IN_API: `${ENV.BASEURL}/user/login`,

  //Auth Related APIs
  SIGN_IN_V2_API: `${ENV.BASEURL}/user/loginv2`,

  // Edit profile
  EDIT_PROFILE_API: `${ENV.BASEURL}/user/update_profile`,

  // Change Password
  CHANGE_PASSWORD_API: `${ENV.BASEURL}/user/change_password`,

  //SignUp Related APIs
  SIGN_UP_API: `${ENV.BASEURL}/user/signup`,

  //DeleteUser Related APIs
  DELETE_USER_API: `${ENV.BASEURL}/user/delete_user`,


  // LOGOUT APIs 
  LOGOUT_API: `${ENV.BASEURL}/user/logout`,
  //App Related APIs
  HEART_BEAT_API: `${ENV.BASEURL}/user/heartbeat`,

  // Update News APIs
  UPDATE_NEWS_API: `${ENV.BASEURL}/user/update_news_flags`,

  //Attendance Related APIs
  GET_ATTENDANCE_API: `${ENV.BASEURL}/attendance/user_id`,
  CREATE_ATTENDANCE_API: `${ENV.BASEURL}/attendance/create_attendance`,
  EDIT_ATTENDANCE_API: `${ENV.BASEURL}/attendance/edit_attendance_status`,
  EXPORT_USER_DATA_API: `${ENV.BASEURL}/user/export_user_data`,


  //Team Attendance
  GET_TEAM_ATTENDANCE_API: `${ENV.BASEURL}/attendance/team_id`,

  //Get Working Time
  GET_WORKING_TIME_API: `${ENV.BASEURL}/attendance/get_user_working_time`,

  //Get User By Id
  GET_USER_BY_ID__API: `${ENV.BASEURL}/user/get_users_by_team_id`,

  //Global Attendance
  GET_ATTENDANCE_BY_PAGINATION_API: `${ENV.BASEURL}/attendance/get_attendance_by_pagination`,

  //Finance Related APIs
  // GET_FINANCE_API: `${ENV.BASEURL}/attendance`,
  CREATE_PLAYER_ENTRY_API: `${ENV.BASEURL}/transaction/creat_transaction`,
  FILTER_PLAYER_ENTRY_API: `${ENV.BASEURL}/transaction/get_transactions_by_pagination`,

// Remarks Related APIs

CREATE_REMARKS_API: `${ENV.BASEURL}/attendance/remarks/create_remakrs`,

GET_REMARKS_API: `${ENV.BASEURL}/attendance/remarks/get_remarks_by_pagination`,


};
