import {
  heartbeatError,
  heartbeatPending,
  heartbeatSuccess,
  
  updatenewsIdle,
  updatenewsPending,
  updatenewsSuccess,
  updatenewsError,
} from '../redux/slice/appSlice ';
import {API, HEADERS} from './NetworkingConstants';

export const APIHeartBeat = token => async dispatch => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.HEART_BEAT_API;

    dispatch(heartbeatPending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        heartbeatSuccess({
          data: responseData,
        }),
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        heartbeatError({
          error: responseData.message,
        }),
      );
    } else {
      dispatch(
        heartbeatError({
          error: 'Api Called Failed!',
        }),
      );
    }
  } catch (error) {
    dispatch(
      heartbeatError({
        error: 'Error in Api Call!',
      }),
    );
  }

};

export const APIUpdateNews = (token) => async (dispatch) => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.UPDATE_NEWS_API;

    const data = new URLSearchParams();

    

    dispatch(updatenewsPending());
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
        updatenewsSuccess({
          data: responseData,
        })
      );
    } else if (response.status === 401) {
      dispatch(
        updatenewsError({
          error: "Update_News Api Call Auth Failed!",
        })
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        updatenewsError({
          error: responseData.message,
        })
      );
    } else {
      dispatch(
        updatenewsError({
          error: "Update_News Api Call Failed!",
        })
      );
    }
  } catch (error) {
    dispatch(
      updatenewsError({
        error: " Error in Update_News Api Call!",
      })
    );
  }
};

