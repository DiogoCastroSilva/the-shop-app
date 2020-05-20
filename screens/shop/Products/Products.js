// React
import React, { useEffect, useState, useCallback } from 'react';
import {
    FlatList,
    Button,
    Platform,
    View,
    ActivityIndicator,
    StyleSheet,
    Text
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import Product from '../../../components/shop/Product/Product';
import { addToCart } from '../../../store/actions/cart';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';

// Constants
import Colors from '../../../constants/Colors';
import { fetchProducts } from '../../../store/actions/products';

// Component
const Products = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(fetchProducts());
        } catch(e) {
            setError(e.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [loadProducts]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadProducts);

        return () => {
            unsubscribe();
        };
    }, [navigation, loadProducts]);


    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail',
            { id: id, title: title }
        );
    };

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
                <Button
                    title='Try again'
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }
    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View>
                <Text>No products found. Maybe start adding some</Text>
            </View>
        );
    }


    // View
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                    <Product
                        image={itemData.item.imageUrl}
                        price={itemData.item.price}
                        title={itemData.item.title}
                        onAddToCart={() => dispatch(addToCart(itemData.item))}
                        onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                    >
                        <Button
                            color={Colors.primary}
                            title="View Details"
                            onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                        />
                        <Button
                            color={Colors.primary}
                            title="To Cart"
                            onPress={() => dispatch(addToCart(itemData.item))}
                        />
                    </Product>
            )}
        />
    );
};

// Navigation
export const productsNavOptions = navData => {
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

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Products;