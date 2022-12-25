import { configureStore } from '@reduxjs/toolkit'
import errorsReducer from '../shared/errorsSlice'
import userReducer from '../shared/userSlice'

export default configureStore({
    reducer: {
        errors: errorsReducer,
        user: userReducer
    }
})

