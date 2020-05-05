import React from 'react';
import { combineReducers, createStore } from 'redux';
import productReducer from './store/reducers/products';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productReducer
});
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
