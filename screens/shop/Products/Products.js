// React
import React from 'react';
import {
    FlatList,
    Text
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';

// Component
const Products = () => {

    const products = useSelector(state => state.products.availableProducts);

    // View
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    );
};

Products.navigationOptions = {
    headerTitle: 'All Products'
};

export default Products;