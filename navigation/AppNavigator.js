// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { ShopNavigator, AuthNavigator } from './ShopNavigator';

// Screens
import StartUp from '../screens/StartUp/StartUp';


// Component
const NavigationContainer = () => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartUp />}
           <ShopNavigator />
        </NavigationContainer>
    );
};

export default NavigationContainer;