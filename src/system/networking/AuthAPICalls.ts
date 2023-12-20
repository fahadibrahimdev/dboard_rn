import {Platform} from 'react-native';
import {
  changepasswordError,
  changepasswordPending,
  changepasswordSuccess,
  editprofileError,
  editprofilePending,
  editprofileSuccess,
  signInError,
  signInPending,
  signInSuccess,
  signUpError,
  signUpPending,
  signUpSuccess,
} from '../redux/slice/authSlice';
import {API, HEADERS} from './NetworkingConstants';

export const APISignIn = (email, password) => async dispatch => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.SIGN_IN_API;

    // Define the data you want to send in the body as key-value pairs
    const data = new URLSearchParams();
    data.append('user_name', email?.trim());
    data.append('password', password?.trim());
    data.append('device_token', 'Dummy Token');
    data.append('platform', Platform.OS);

    dispatch(signInPending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {...HEADERS},
      body: data.toString(), // Convert the data to a URL-encoded string
    });

    if (response.status === 200) {
      const responseData = await response.json();

      const apiAccessToken =
        !!responseData && !!responseData.data && !!responseData.data.token
          ? responseData.data.token
          : '';

      dispatch(
        signInSuccess({
          accessToken: apiAccessToken,
          data: responseData,
        }),
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        signInError({
          error: responseData.message,
        }),
      );
    } else {
      dispatch(
        signInError({
          error: 'Api Called Failed!',
        }),
      );
    }
  } catch (error) {
    dispatch(
      signInError({
        error: 'Error in Api Call!',
      }),
    );
  }
};

// SignUp API CALL

export const APISignUp =
  (fullname, UserName, email, password) => async dispatch => {
    try {
      // Define the URL of the API endpoint
      const apiUrl = API.SIGN_UP_API;

      // Define the data you want to send in the body as key-value pairs
      const data = new URLSearchParams();

      data.append('full_name', fullname?.trim());
      data.append('user_name', UserName?.trim());
      data.append('email', email?.trim());
      data.append('password', password?.trim());
      data.append('device_token', 'DUMMY TOKEN');
      data.append('platform', Platform.OS);

      dispatch(signUpPending());
      // Make the POST request

      //   fetch("https://mab.thundertechsol.com/mab/user/signup", {
      //     method: 'POST',
      //       headers: { ...HEADERS,
      //         Accept: 'application/json',
      //        },
      //       body: data.toString(),
      //   })
      // .then(response => response.text())
      // .then(result => console.log(result))
      // .catch(error => console.log('error', error));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {...HEADERS},
        body: data.toString(), // Convert the data to a URL-encoded string
      });

      if (response.status === 200) {
        const responseData = await response.json();

        dispatch(
          signUpSuccess({
            data: responseData,
          }),
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          signUpError({
            error: responseData.message,
          }),
        );
      } else {
        dispatch(
          signUpError({
            error: 'Api Called Failed!',
          }),
        );
      }
    } catch (error) {
      dispatch(
        signUpError({
          error: 'Error in Api Call!',
        }),
      );
    }
  };

// Edit profile

export const APIEditProfile =
  (token, email, fullname, mobile) => async dispatch => {
    try {
      // Define the URL of the API endpoint
      const apiUrl = API.EDIT_PROFILE_API;

      var formdata = new FormData();
      formdata.append('email', email?.trim());
      formdata.append('full_name', fullname?.trim());
      formdata.append('mobile', mobile?.trim());

      dispatch(editprofilePending());
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          ...HEADERS,
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        body: formdata,
      });

      if (response.status === 200) {
        const responseData = await response.json();

        dispatch(
          editprofileSuccess({
            data: responseData,
          }),
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          editprofileError({
            error: responseData.message,
          }),
        );
      } else {
        dispatch(
          editprofileError({
            error: 'Api Called Failed!',
          }),
        );
      }
    } catch (error) {
      dispatch(
        editprofileError({
          error: 'Error in Api Call!',
        }),
      );
    }
  };

// SignUp API CALL

export const API_CHANGE_PASSWORD =
  (token, old_password, new_password, user_name) => async dispatch => {
    try {
      // Define the URL of the API endpoint
      const apiUrl = API.CHANGE_PASSWORD_API;

      // Define the data you want to send in the body as key-value pairs
      const data = new URLSearchParams();

      data.append('old_password', old_password?.trim());
      data.append('new_password', new_password?.trim());
      data.append('user_name', user_name?.trim());

      dispatch(changepasswordPending());

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          ...HEADERS,
          Authorization: 'Bearer ' + token,
        },
        body: data.toString(), // Convert the data to a URL-encoded string
      });

      if (response.status === 200) {
        const responseData = await response.json();

        dispatch(
          changepasswordSuccess({
            data: responseData,
          }),
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          changepasswordError({
            error: responseData.message,
          }),
        );
      } else {
        dispatch(
          changepasswordError({
            error: 'Api Called Failed!',
          }),
        );
      }
    } catch (error) {
      dispatch(
        changepasswordError({
          error: 'Error in Api Call!',
        }),
      );
    }
  };
