import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import SearchSlice from './SearchSlice'


export const store = configureStore({
    reducer: {
        user: userSlice,
        search: SearchSlice
    },
})