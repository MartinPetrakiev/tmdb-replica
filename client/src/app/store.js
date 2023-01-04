import { configureStore } from '@reduxjs/toolkit'
import errorsReducer from '../shared/errorsSlice'
import userReducer from '../shared/userSlice'
import { movieApiSlice } from '../shared/moviesApi';

export default configureStore({
    reducer: {
        errors: errorsReducer,
        user: userReducer,
        [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(movieApiSlice.middleware)
})

