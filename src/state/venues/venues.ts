import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {

  user:any
}

const initialState: CounterState = {
   user:{}
};

const venuesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
  
    setUser: (state, action: PayloadAction<number>) => {
      state.user += action.payload;
    },
  },
 
});



export const { setUser } = venuesSlice.actions;

export default venuesSlice.reducer;