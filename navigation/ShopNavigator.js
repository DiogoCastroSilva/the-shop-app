// React
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// Expo
import { Ionicons } from '@expo/vector-icons';

// Screens
import Products from '../screens/shop/Products/Products';
import Detail from '../screens/shop/Products/Detail/Detail';
import Cart from '../screens/shop/Cart/Cart';
// Constants
import Colors from '../constants/Colors';
import Orders from '../screens/shop/Orders/Orders';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: Products,
    ProductDetail: Detail,
    Cart: Cart
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
          <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.tintColor}
          />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: Orders
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
          <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-LIST'}
              size={23}
              color={drawerConfig.tintColor}
          />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
