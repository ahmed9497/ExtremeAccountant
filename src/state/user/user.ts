import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: any;
  user: any;
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("access_token");



const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUserLogout: (state, action: PayloadAction<string>) => {
      console.log(action,"action")
      state.user = {};
      state.token = "";
      localStorage.clear();
    },
  },
});

export const { setUser,setUserLogout } = userSlice.actions;

export default userSlice.reducer;
