// React
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Screens
import Products from '../screens/shop/Products/Products';
import Detail from '../screens/shop/Products/Detail/Detail';
import Cart from '../screens/shop/Cart/Cart';
// Constants
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: Products,
    ProductDetail: Detail,
    Cart: Cart
  },
  {
    defaultNavigationOptions: {
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
    }
  }
);

export default createAppContainer(ProductsNavigator);
