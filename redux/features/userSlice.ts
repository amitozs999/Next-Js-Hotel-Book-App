import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: any;
  isAuthenticated: boolean;
}

//by default  user null and notauthenticated
const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};


//create user slice with 2 reducers  set user and setisauthenticated
export const userSlice = createSlice({

  initialState,
  name: "userSlice",

  reducers: {
    setUser: (state, action: PayloadAction<any>) => {  //payload value
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated } = userSlice.actions;
