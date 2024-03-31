import {


} from '../redux/slice/financeSlice';
import { createRemarksError, createRemarksPending, createRemarksSuccess, getRemarksError, getRemarksPending, getRemarksSuccess } from '../redux/slice/remarksSlice';
import { API, HEADERS } from './NetworkingConstants';

export const APIGetRemarks = (token, attendance_id) => async dispatch => {
  try {
    const apiUrl = API.GET_REMARKS_API;

    dispatch(getRemarksPending());

    const data = new URLSearchParams();

    data.append("attendance_id", attendance_id);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: 'Bearer ' + token,
      },
      body: data.toString(),
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        getRemarksSuccess({
          data: responseData,
        }),
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        getRemarksError({
          error: responseData.message,
        }),
      );
    } else {
      dispatch(
        getRemarksError({
          error: 'Get_Remarks Api Call Failed!',
        }),
      );
    }
  } catch (error) {
    dispatch(
      getRemarksError({
        error: ' Error in Get_Remarks Api Call!',
      }),
    );
  }
};

export const APICreateRemarks = token => async dispatch => {
  try {
    // Define the URL of the API endpoint
    const apiUrl = API.CREATE_REMARKS_API;

    const data = new URLSearchParams();

    dispatch(createRemarksPending());
    // Make the POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ...HEADERS,
        Authorization: 'Bearer ' + token,
      },
      body: data.toString(),
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        createRemarksSuccess({
          data: responseData,
        }),
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        createRemarksError({
          error: responseData.message,
        }),
      );
    } else {
      dispatch(
        createRemarksError({
          error: 'Api Called Failed!',
        }),
      );
    }
  } catch (error) {
    dispatch(
      createRemarksError({
        error: 'Error in Api Call!',
      }),
    );
  }

};
