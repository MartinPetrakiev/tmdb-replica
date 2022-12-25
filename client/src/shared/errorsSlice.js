import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
    name: 'errors',
    initialState: [],
    reducers: {
        updateErrors: (state, action) => {
            state.push(action.payload)
        },
        clearErrors: (state) => []
    }
})

export const { updateErrors, clearErrors } = errorsSlice.actions

export default errorsSlice.reducer