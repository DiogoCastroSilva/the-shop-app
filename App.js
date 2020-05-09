// React
import React, { useState } from 'react';
// Redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';

// Expo
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

// Navigations
import ShopNavigator from './navigation/ShopNavigator';

// Redux config
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

// Component
export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return <AppLoading
              startAsync={fetchFonts}
              onFinish={() => setIsFontLoaded(true)}
            />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
