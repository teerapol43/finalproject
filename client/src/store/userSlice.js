import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "j.s.power",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.value = 'login'; // Update the state property
        },
        logout: (state) => {
            state.value = 'logout'; // Update the state property
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload; // Update the state property
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
