// React
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Button
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../../store/actions/cart';

// Constants
import Colors from '../../../../constants/Colors';


// Component
const Detail = ({ navigation }) => {
    const id = navigation.route.params.id;
    const product = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === id)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add To Cart"
                    onPress={() => dispatch(addToCart(product))}
                />
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>${product.description}</Text>
        </ScrollView>
    );
};

export const detailsNavOptions = navData => {
    const title = navData.route.params.title;
    return {
        headerTitle: title
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default Detail;