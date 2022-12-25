import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        userId: ''
    },
    reducers: {
        setUser: (state, action) => {
            const { username, email, userId } = action.payload
            state = { ...state, username, email, userId }
        },
        removeUser: (state) => {
            state.user = ''
            state.email = ''
            state.userId = ''
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer