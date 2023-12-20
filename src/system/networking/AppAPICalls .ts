import {
  heartbeatError,
  heartbeatPending,
  heartbeatSuccess,
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
