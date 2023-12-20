import {
  createFinanceError,
  createFinancePending,
  createFinanceSuccess,
  getFinanceError,
  getFinancePending,
  getFinanceSuccess,
} from '../redux/slice/financeSlice';
import {API, HEADERS} from './NetworkingConstants';

export const APIGetFinance = token => async dispatch => {
  try {
    const apiUrl = API.GET_FINANCE_API;

    dispatch(getFinancePending());

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        ...HEADERS,
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();

      dispatch(
        getFinanceSuccess({
          data: responseData,
        }),
      );
    } else if (response.status === 400) {
      const responseData = await response.json();
      dispatch(
        getFinanceError({
          error: responseData.message,
        }),
      );
    } else {
      dispatch(
        getFinanceError({
          error: 'Get_Finance Api Call Failed!',
        }),
      );
    }
  } catch (error) {
    dispatch(
      getFinanceError({
        error: ' Error in Get_Finance Api Call!',
      }),
    );
  }
};
export const APIcreateFinance =
  (teamId, start_time, end_time, shift_id) => async dispatch => {
    try {
      const apiUrl = API.CREATE_FINANCE_API;

      const data = new URLSearchParams();
      data.append('teamId', teamId);
      data.append('start_time', start_time);
      data.append('end_time', end_time);
      data.append('shift_id', shift_id);

      dispatch(createFinancePending());

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {...HEADERS},
        body: data.toString(),
      });

      if (response.status === 200) {
        const responseData = await response.json();

        dispatch(
          createFinanceSuccess({
            data: responseData,
          }),
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          createFinanceError({
            error: responseData.message,
          }),
        );
      } else {
        dispatch(
          createFinanceError({
            error: 'Create_Finance Api Call Failed!',
          }),
        );
      }
    } catch (error) {
      dispatch(
        createFinanceError({
          error: ' Error in Create_Finance Api Call!',
        }),
      );
    }
  };
