import { Alert } from 'react-native';
import {
  createFinanceError,
  createFinancePending,
  createFinanceSuccess,
  filterPlayerEntryError,
  filterPlayerEntryPending,
  filterPlayerEntrySuccess,
  getFinanceError,
  getFinancePending,
  getFinanceSuccess,
} from '../redux/slice/financeSlice';
import {API, HEADERS} from './NetworkingConstants';
import { CALL_STATE } from '../../helpers/enum';
import moment from 'moment-timezone';

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
  (token,team_id,shift_id,lead_user_id,type,game,platform,is_active,client_info,fb_page,backend,amount) => async dispatch => {
    try {
      const apiUrl = API.CREATE_FINANCE_API;

      

      const data = new URLSearchParams();
      data.append('teamId', team_id);
      data.append('shift_id', shift_id);
      // data.append('lead_user_id', lead_user_id);
      // data.append('type', type);
      // data.append('game', game);
      // data.append('platform', platform);
      // data.append('is_active', is_active);
      // data.append('client_info', client_info);
      // data.append('fb_page', fb_page);
      // data.append('backend', backend);
      // data.append('amount', amount);

      dispatch(createFinancePending());

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          ...HEADERS,
          Authorization: 'Bearer ' + token,
        },        body: data.toString(),
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
  export const filterPlayerEntry =
  ({
    token,
    callState = CALL_STATE.FETCHING,
    user_id,
    shift_id,
    isActive,
    clientInfo,
    sortDirection,
    sortBy,
    team_id,
    page,
    limit,
  }) =>
  async (dispatch, getState) => {
    try {
      // Define the URL of the API endpoint
      const apiUrl = API.FILTER_PLAYER_ENTRY_API;

      let currentFinanceSuccess = JSON.parse(
        JSON.stringify(getState().finance.filterPlayerEntry)
      );

      const data = new URLSearchParams();

      data.append("limit", (20).toString());

      if (!!limit) {
        data.append("limit", limit);
      }
      // if (!!team_id) {
      //   data.append("team_id", team_id);
      // }
      if (!!sortBy) {
        data.append("sortBy", sortBy);
      }
      // if (!!shift_id) {
      //   data.append("shift_id", shift_id);
      // }
      // if (!!clientInfo) {
      //   data.append("clientInfo", clientInfo);
      // }
      // if (!!isActive) {
      //   data.append("isActive", isActive);
      // }

 if (!!sortDirection) {
        data.append("sortDirection", sortDirection);
      }
      
//  if (!!user_id) {
//   data.append("user_id", user_id);
// }
      
      if (!!page) {
        data.append("page", page.toString());
      } else {
        data.append("page", (1).toString());
      }




      console.log("My API Body: ", data);
      
      dispatch(
        filterPlayerEntryPending({
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
            filterPlayerEntrySuccess({
              data: responseData,
            })
          );
        } else {
          let updatedData = responseData;

          let concatedArray = [
            ...currentFinanceSuccess.actualPayload.data.finance,
            ...updatedData.data.finance,
          ];

          updatedData.data.finance = concatedArray;

          dispatch(
          filterPlayerEntrySuccess({
              data: updatedData,
            })
          );
        }
      } else if (response.status === 401) {
        dispatch(
          filterPlayerEntryError({
            error: "Filter-Player-Entry Api Call Auth Failed!",
          })
        );
      } else if (response.status === 400) {
        const responseData = await response.json();
        dispatch(
          filterPlayerEntryError({
            error: responseData.message,
          })
        );
      } else {
        dispatch(
          filterPlayerEntryError({
            error: "Filter-Player-Entry Api Call Failed!",
          })
        );
      }
    } catch (error) {
      dispatch(
        filterPlayerEntryError({
          error: " Error in Filter-Player-Entry Api Call!",
        })
      );
    }
  };

