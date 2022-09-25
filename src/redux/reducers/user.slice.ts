import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface userState {
  email: string;
  token: string;
}

const initialState: userState = {
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUser: () => {
      return {
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export const selectEmail = (state: RootState) => state.user.email;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
