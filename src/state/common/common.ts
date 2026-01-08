import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CommonState {
  cities: {
    id: number;
    countryId: number;
    name: string;
  }[];
  countries: {
    id: number;
    countryId: number;
    name: string;
  }[];
  categories: {
    id: number;
    modelName: string;
    name: string;
  }[];
  articlesCategories: {
    id: number;
    modelName: string;
    name: string;
  }[];
  menuCategories: {
    id: number;
    modelName: string;
    name: string;
  }[];
  eventCategories: {
    id: number;
    modelName: string;
    name: string;
  }[];
  attractionCategories: {
    id: number;
    modelName: string;
    name: string;
  }[];
  locations: {
    id: number;
    cityId: number;
    isActive: boolean;
    address: string;
    coordinates: string;
    office: string;
    building: string;
    url: string;
    moderation: string;
  }[];
  days: {
    id: number;   
    name: string;
  }[];
  currencies: {
    id: number;   
    name: string;
    code: string;
  }[];
  menuIcons:{
    id: number;   
    name: string;
    code: string;
  }[],
  eventIcons:{
    id: number;   
    name: string;
    code: string;
  }[],
  attractionIcons:{
    id: number;   
    name: string;
    code: string;
  }[],
  artists:{
    id: number;   
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }[]
}

const initialState: CommonState = {
  cities: [],
  categories: [],
  countries: [],
  locations: [],
  days:[],
  currencies:[],
  articlesCategories:[],
  menuCategories:[],
  eventCategories:[],
  menuIcons:[],
  eventIcons:[],
  attractionIcons:[],
  artists:[],
  attractionCategories:[],
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCommon: (state, action: PayloadAction<any>) => {
      state.categories = action.payload.categories;
      state.cities = action.payload.cities;
      state.locations = action.payload.locations;
      state.days = action.payload.days;
      state.currencies = action.payload.currencies;
      state.articlesCategories = action.payload.articlesCategories;
      state.menuCategories = action.payload.menuCategories;
      state.menuIcons = action.payload.menuIcons;
      state.eventCategories = action.payload.eventCategories;
      state.eventIcons = action.payload.eventIcons;
      state.attractionIcons = action.payload.attractionIcons;
      state.artists = action.payload.artists;
      state.attractionCategories = action.payload.attractionCategories;
      state.countries = action.payload.countries;
    },
  },
});

export const { setCommon } = commonSlice.actions;

export default commonSlice.reducer;
