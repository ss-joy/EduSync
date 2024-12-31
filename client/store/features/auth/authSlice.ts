import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  userId: string;
  roles: string[];
} | null;

const initialState: User = {
    userId:null,
    roles:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
        state.
    },
  },
});

export default authSlice.reducer;
