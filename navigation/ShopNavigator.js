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
import UserProducts from '../screens/user/Products/Products';

// Constants
import Colors from '../constants/Colors';
import Orders from '../screens/shop/Orders/Orders';
import EditProduct from '../screens/user/Products/EditProduct/EditProduct';

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
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.tintColor}
          />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProduct: UserProducts,
    EditProduct: EditProduct
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
          <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
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
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
