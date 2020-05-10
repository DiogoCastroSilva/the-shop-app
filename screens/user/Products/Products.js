// React
import React, { useState } from 'react';
import {
    FlatList,
    Button,
    Platform,
    Alert,
    StyleSheet,
    View,
    Text
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../../store/actions/products';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


// Components
import Product from '../../../components/shop/Product/Product';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
// Constants
import Colors from '../../../constants/Colors';

// Component
const Products = ({ navigation }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        navigation.navigate('EditProduct', { id: id });
    };

    const fetchUserProducts = async () => {
        setIsRefreshing(true);
        setError();
        try {
            await dispatch(fetchProducts());
        } catch(e) {
            setError(e.message);
        }
        setIsRefreshing(false);
        
    };

    const deleteHandler = id => {
        Alert.alert(
            'Are you sure!!',
            'Do you realy want to delete this product',
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive',
                    onPress: () => dispatch(deleteProduct(id))
                }
            ]
        );
    };

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
                <Button
                    title='Try again'
                    onPress={fetchUserProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (userProducts.lenght === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No products found, maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            refreshing={isRefreshing}
            onRefresh={fetchUserProducts}
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <Product
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() =>
                            editProductHandler(itemData.item.id)
                        }
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() =>
                            deleteHandler(itemData.item.id)
                        }
                    />
                
                </Product>
            )}
        /> 
    );
};

Products.navigationOptions = navData => {
    return {
        headerTitle: 'You Products',
        headerLeft: () => (
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
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
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