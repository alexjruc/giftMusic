import { createSlice } from "@reduxjs/toolkit";
import { axiosMusic } from "../../utils/configAxios";

const initialState = {
    name: "",
    email: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState: JSON.parse(localStorage.getItem("userInfo")) || initialState,
    reducers: {
        userLogin: (state, action) => {
            const dataLogin = action.payload;
            const newState = { ...state, ...dataLogin };
            localStorage.setItem("userInfo", JSON.stringify(newState));
            return newState;
        },
        UserLogOut: () => {
            localStorage.removeItem("userInfo");
            return initialState;
        },
    },
});

export const { userLogin, UserLogOut } = userSlice.actions;

export default userSlice.reducer;

export const loginThunk = (data) => (dispatch) => {
    axiosMusic
        .post("/api/auth/login", data)
        .then(({ data }) => dispatch(userLogin(data)))
        .catch((err) => console.log(err));
};
