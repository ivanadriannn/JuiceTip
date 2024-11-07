import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    telephone: string;
    profileImage: string;
    gender: string;
    juiceCoin: number;
    created: Date;
    dob: Date;
    password: string;
    userId: string;
    reviewId: string
  };
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    telephone: "",
    password: "",
    userId: "",
    profileImage: "",
    gender: "",
    juiceCoin: 0,
    created: new Date(),
    dob: new Date(),
    reviewId: ""
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state: any, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
    TOPUP: (state, action: PayloadAction<number>) => ({
      ...state,
      user: {
        ...state.user,
        juiceCoin: state.user.juiceCoin + action.payload,
      },
    })
  },
});

export const { LOGIN, LOGOUT, TOPUP } = authSlice.actions;
export default authSlice;
