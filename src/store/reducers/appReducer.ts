import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  UserData: {},
  selectedLanguage: 'en',
  SessionData: [],
  UserResponse: {},
};
const appData = createSlice({
  name: 'allStates',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<any>) => {
      return {...state, UserData: action.payload};
    },
    sessionData: (state, action: PayloadAction<any>) => {
      return {...state, SessionData: action.payload};
    },
    userResponse: (state, action: PayloadAction<any>) => {
      return {...state, UserResponse: action.payload};
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      console.log('Dispatching setLanguage action with:', action.payload);
      state.selectedLanguage = action.payload;
      console.log('Updated state:', state);
    },
  },
});

export const {userData, setLanguage, sessionData, userResponse} =
  appData.actions;

export default appData.reducer;
