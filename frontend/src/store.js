// store.js
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { productReducer, productDetailsReducer } from './reducers/productReducers'
import { authReducer } from './reducers/userReducers'

// If you need a combined reducer, just do it inline or import from another file:
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
  },
  // By default, RTK adds Redux Thunk. If you want to add more middleware:
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
  devTools: true, // Enabled by default in development
})

export default store
