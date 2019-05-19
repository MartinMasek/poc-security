import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './src/services/reducers'

export default createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware
    ));