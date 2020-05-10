// React
import React, { useEffect, useRef } from 'react';
// Redux
import { useSelector } from 'react-redux';

// Navigation
import { NavigationActions } from 'react-navigation';
import ShopNavigator from './ShopNavigator';

// Component
const NavigationContainer = () => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;