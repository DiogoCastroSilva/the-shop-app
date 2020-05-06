// React
import React from 'react';
import {
    FlatList,
    Text
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';

// Components
import Product from '../../../components/shop/Product/Product';

// Component
const Products = ({ navigation }) => {

    const products = useSelector(state => state.products.availableProducts);

    // View
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                    <Product
                        image={itemData.item.imageUrl}
                        price={itemData.item.price}
                        title={itemData.item.title}
                        onAddToCart={() => {}}
                        onGoToViewDetails={() => 
                            navigation.navigate('ProductDetail',
                                { id: itemData.item.id, title: itemData.item.title }
                            )
                        }
                    />
            )}
        />
    );
};

Products.navigationOptions = {
    headerTitle: 'All Products'
};

export default Products;