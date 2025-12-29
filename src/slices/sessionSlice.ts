import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  phone: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenHasExpired: boolean;
}

const initialState: SessionState = {
  phone: null,
  accessToken: null,
  refreshToken: null,
  accessTokenHasExpired: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string | null>) {
      state.phone = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      if (!action.payload) {
        state.accessTokenHasExpired = false;
      }
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },
    setAccessTokenHasExpired(state, action: PayloadAction<boolean>) {
      state.accessTokenHasExpired = action.payload;
    },
    clearSession(state) {
      state.phone = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenHasExpired = false;
    },
  },
});

export const {
  setPhone,
  setAccessToken,
  setRefreshToken,
  setAccessTokenHasExpired,
  clearSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;


