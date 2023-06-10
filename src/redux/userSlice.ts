import { createSlice } from "@reduxjs/toolkit"

interface UserInfo {
    email: string;
    firstName: string;
    image: string;
    lastName: string;
    _id: string;
    token: string;
}

const initialState: UserInfo = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
    token: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.token = action.payload.token;
        }
    }
})

export const { loginRedux } = userSlice.actions;

export default userSlice.reducer;