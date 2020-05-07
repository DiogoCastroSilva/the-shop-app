// React
import React from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    Platform
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import Order from '../../../components/shop/Order/Order';

// Component
const Orders = () => {
    const orders = useSelector(state => state.orders.orders);
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
const styles = StyleSheet.create({});

export default Orders;