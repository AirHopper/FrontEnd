import { createSlice } from "@reduxjs/toolkit";

// Default (initial) state
const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
}

// Slice actions and reducer
export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, action)  => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            if (action.payload) {
                localStorage.setItem("token", action.payload);
            } else {
                localStorage.removeItem("token");
            }
            state.token = action.payload;
        }
    }
});

// Export the action
export const {setToken, setUser} = authSlice.actions;

// Export the state/reducers
export default authSlice.reducer;