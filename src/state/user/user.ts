import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any;
}
let user: any = {};
const data = localStorage.getItem("user");
if (data) {
  user = JSON.parse(data);
}

const initialState: UserState = {
  user: name,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.user = action.payload;
    },
    setUserLogout: (state, action: PayloadAction<string>) => {
      console.log(action,"action")
      state.user = {};
      localStorage.clear();
    },
  },
});

export const { setUser,setUserLogout } = userSlice.actions;

export default userSlice.reducer;
