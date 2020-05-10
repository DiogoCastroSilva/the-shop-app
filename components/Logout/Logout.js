// React
import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Button
} from 'react-native';
// Bavigation
import { DrawerNavigatorItems } from 'react-navigation-drawer';
// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';


// Constants
import Colors from '../../constants/Colors';


// Component
const Logout = props => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.screen}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerNavigatorItems {...props} />
                <Button
                    title='Logout'
                    color={Colors.primary}
                    onPress={logoutHandler}
                />
            </SafeAreaView>
      </View>
    );
};

// Styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20
    }
});

export default Logout;