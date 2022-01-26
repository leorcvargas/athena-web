import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as userService from '../../services/user';
import type { RootState } from '../../app/store';

// here we are typing the types for the state
export type UserState = {
  profile: {
    data: {
      id: string;
      email: string;
      username: string;
    };
    pending: boolean;
    error: boolean;
  };
};

const initialState: UserState = {
  profile: {
    data: {
      id: '',
      email: '',
      username: '',
    },
    pending: false,
    error: false,
  },
};

export const getUserProfile = createAsyncThunk('user/profile', async () => {
  const response = await userService.getProfile();

  return response.data;
});

export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state.profile = { ...initialState.profile };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, state => {
        state.profile.pending = true;
        state.profile.error = false;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.profile.pending = false;
        state.profile.data = payload;
      })
      .addCase(getUserProfile.rejected, state => {
        state.profile.pending = false;
        state.profile.error = true;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export const { resetUser } = userSlicer.actions;

export default userSlicer.reducer;
