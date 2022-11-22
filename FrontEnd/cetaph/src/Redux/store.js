import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './reducers/mainReducer'
import thunk from 'redux-thunk'
import adminReducer from './reducers/adminReducer'
export default configureStore({
  reducer: {
    main: mainReducer,
    admin: adminReducer,
  },
  middleware: [thunk],
})
