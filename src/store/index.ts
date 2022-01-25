import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from './counter/counterSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
