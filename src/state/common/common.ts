import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CommonState {
  // cities: {
  //   id: number;
  //   countryId: number;
  //   name: string;
  // }[];
  companies: {
    id: number;
    name: string;
    country?: string;
    currency?: string;
    owner_user_id?: number;
  }[];
  company: {
    id?: number;
    name?: string;
    country?: string;
    currency?: string;
    owner_user_id?: number;
  };
}
const storedCompany = localStorage.getItem("company");
const initialState: CommonState = {
  // cities: [],
  companies: [],
  company:storedCompany ? JSON.parse(storedCompany) : {},
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommon: (state, action: PayloadAction<any>) => {
      // state.companies = action.payload.categories;
      // state.cities = action.payload.cities;
    },
    setCompany: (state, action: PayloadAction<any>) => {
      state.company = action.payload;
    },
  },
});

export const { setCommon, setCompany } = commonSlice.actions;

export default commonSlice.reducer;
