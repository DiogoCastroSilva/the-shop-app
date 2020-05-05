import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import Products from '../screens/shop/Products/Products';
import Colors from '../constants/Colors';
import { createStackNavigator } from 'react-navigation-stack';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: Products
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);
