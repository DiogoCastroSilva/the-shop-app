// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { ProductsNavigator } from './ShopNavigator';


// Component
const NavigationContainer = () => {
    const isAuth = useSelector(state => !!state.auth.token);

    return (
        <NavigationContainer>
           <ProductsNavigator />
        </NavigationContainer>
    );
};

export default NavigationContainer;