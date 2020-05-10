// React
import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';

// Constants
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/actions/auth';

// Component
const StartUp = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, email, expirationDate } = transformedData;
            const expDate = new Date(expirationDate);

            if (expDate <= new Date().getTime() || token || userId || email) {
                navigation.navigate('Auth');
                return;
            }

            const expirationTime = expDate.getTime() - new Date().getTime();

            navigation.navigate('Shop');
            dispatch(authenticate(token, userId, email, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartUp;