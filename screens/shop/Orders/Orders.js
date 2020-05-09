// React
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
    View,
    ActivityIndicator
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../../store/actions/orders';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import Order from '../../../components/shop/Order/Order';
// Constants
import Colors from '../../../constants/Colors';

// Component
const Orders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const getOrdersHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(fetchOrders());
        } catch(e) {
            setError(e.message);
        }
        setIsLoading(false);
        
    };

    useEffect(() => {
        getOrdersHandler();
    }, [getOrdersHandler]);

    
    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
                <Button
                    title='Try again'
                    onPress={getOrdersHandler}
                    color={Colors.primary}
                />
            </View>
        );
    }

    return <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <Order
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                    />
                )}
           />;
};

// Navigation
Orders.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft:() => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

// Styles
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Orders;