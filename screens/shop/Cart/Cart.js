// React
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../store/actions/cart';
import { addOrder } from '../../../store/actions/orders';

// Constants
import Colors from '../../../constants/Colors';
// Components
import CartItem from '../../../components/shop/CartItem/CartItem';
import Card from '../../../components/UI/Card/Card';

// Component
const Cart = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                id: key,
                title: state.cart.items[key].title,
                price: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.id > b.id ? 1 : -1
        );
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.ammount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button
                    title="Order Now"
                    color={Colors.secondary}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <CartItem
                        title={itemData.item.title}
                        quantity={itemData.item.quantity}
                        ammount={itemData.item.sum}
                        canRemove
                        onRemove={() =>
                            dispatch(removeFromCart(itemData.item.id))
                        }
                    />
                )}
            />
        </View>
    );
};

// Navigation
Cart.navigationOptions = {
    headerTitle: 'Your Cart'
};

// Styles
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    ammount: {
        color: Colors.primary
    }
});

export default Cart;