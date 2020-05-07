// React
import React from 'react';
import {
    FlatList,
    Platform
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import Product from '../../../components/shop/Product/Product';
import { addToCart } from '../../../store/actions/cart';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';

// Component
const Products = ({ navigation }) => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

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
                        onAddToCart={() => dispatch(addToCart(itemData.item))}
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

// Navigation
Products.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        )
    };
};

export default Products;