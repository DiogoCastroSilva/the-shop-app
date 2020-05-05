// React
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import producstReducer from './store/reducers/products';

//#region  Data Management
const rootReducer = combineReducers({
  prodcuts: producstReducer
});

const store = createStore(rootReducer);
//#endregion Data Management

// Component
export default function App() {

  // View
  return (
    <Provider store={store}>
      
    </Provider>
  );
}

// Styles
const styles = StyleSheet.create({});
