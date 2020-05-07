// React
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

// Components
import CartItem from '../CartItem/CartItem';
// Constants
import Colors from '../../../constants/Colors';


// Component
const Order = ({
    amount,
    date,
    items
}) => {
    const [showDetails, setShowDetails] = useState(false);
    console.log(items);
    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button
                title={showDetails ? 'Hide Details' : 'Show Details'}
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />

            {showDetails && (
                <View style={styles.detailItems}>
                    {items.map(cartItem => (
                        <CartItem
                            key={cartItem.id}
                            title={cartItem.title}
                            quantity={cartItem.quantity}
                            ammount={cartItem.sum}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15 
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default Order;