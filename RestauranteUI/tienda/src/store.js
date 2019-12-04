import { createStore, applyMiddleware, combineReducers } from "redux";
import productoReducer from "./reducers";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  productoReducer: productoReducer
});

export default createStore(allReducers, applyMiddleware(thunk));
