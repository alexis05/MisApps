import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import productoReducer from "./reducers";
import carritoReducer from "./reducers";
import misPedidosReducer from "./reducers"
import thunk from "redux-thunk";

const allReducers = combineReducers({
  productoReducer: productoReducer,
  carritoReducer: carritoReducer,
  misPedidosReducer:misPedidosReducer
});
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export default createStore(allReducers, enhancer);
