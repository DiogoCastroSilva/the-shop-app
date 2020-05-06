// React
import React, { useState } from 'react';
// Redux
import { combineReducers, createStore } from 'redux';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import { Provider } from 'react-redux';
// Expo
import { AppLoading } from 'expo';
import * as Font from 'expo-font'

// Navigations
import ShopNavigator from './navigation/ShopNavigator';

// Redux config
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
});
const store = createStore(rootReducer);

// Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

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
