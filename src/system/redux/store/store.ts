import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from '../slice/authSlice';
import appSliceReducer from '../slice/appSlice ';
import attendanceSliceReducer from '../slice/attendanceSlice';
import financeSliceReducer from '../slice/financeSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    app:appSliceReducer,
    attendance:attendanceSliceReducer,
    finance:financeSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
