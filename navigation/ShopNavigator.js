// React
import React from 'react';
import {
  Platform,
  View,
  Button,
  SafeAreaView
} from 'react-native';
// Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { createStackNavigator, DrawerItemList } from '@react-navigation/drawer'
// Expo
import { Ionicons } from '@expo/vector-icons';
// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';


// Screens
import Products, { productsNavOptions } from '../screens/shop/Products/Products';
import Detail, { detailsNavOptions } from '../screens/shop/Products/Detail/Detail';
import Cart, { cartNavOptions } from '../screens/shop/Cart/Cart';
import UserProducts, { userProductsNavOptions } from '../screens/user/Products/Products';
import Orders, { ordersNavOptions } from '../screens/shop/Orders/Orders';
import EditProduct, { editProductsNavOptions } from '../screens/user/Products/EditProduct/EditProduct';
import Auth, { authNavOptions } from '../screens/user/Auth/Auth';
import StartUp from '../screens/StartUp/StartUp';


// Constants
import Colors from '../constants/Colors';


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

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
          name="ProductsOverview"
          component={Products}
          options={productsNavOptions}
      />
      <ProductsStackNavigator.Screen
          name="ProductDetail"
          component={Detail}
          options={detailsNavOptions}
      />
      <ProductsStackNavigator.Screen
          name="Cart"
          component={Cart}
          options={cartNavOptions}
      />
  </ProductsStackNavigator.Navigator>
);

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: Products,
//     ProductDetail: Detail,
//     Cart: Cart
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//           <Ionicons
//               name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//               size={23}
//               color={drawerConfig.tintColor}
//           />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
          name="Orders"
          component={Orders}
          options={ordersNavOptions}
      />
  </OrdersStackNavigator.Navigator>
);

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => (
  <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
          name="UserProduct"
          component={UserProducts}
          options={userProductsNavOptions}
      />
      <AdminStackNavigator.Screen
          name="EditProduct"
          component={EditProduct}
          options={editProductsNavOptions}
      />
  </AdminStackNavigator.Navigator>
);

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={ props => {
                return (
                  <View>
                    <SafeAreaView>
                        <DrawerItemList {...props} />
                        <Button
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => dispatch(logout()) }
                        />
                    </SafeAreaView>
                  </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductsNavigator}
                options={{
                  drawerIcon: drawerConfig => (
                      <Ionicons
                          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                          size={23}
                          color={drawerConfig.color}
                      />
                  )}}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                  drawerIcon: drawerConfig => (
                      <Ionicons
                          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                          size={23}
                          color={drawerConfig.color}
                      />
                  )}}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                  drawerIcon: drawerConfig => (
                      <Ionicons
                          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                          size={23}
                          color={drawerConfig.color}
                      />
                  )}}
            />
        </ShopDrawerNavigator.Navigator>
    );
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
          name="Auth"
          component={Auth}
          options={authNavOptions}
      />
  </AuthStackNavigator.Navigator>
);


const MainNavigator = createSwitchNavigator({
  StartUp: StartUp,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
