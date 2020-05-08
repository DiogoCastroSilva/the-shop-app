// React
import React from 'react';
import {
    FlatList,
    Button,
    Platform,
    Alert
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


// Components
import Product from '../../../components/shop/Product/Product';
import CustomHeaderButton from '../../../components/UI/CustomHeaderButton/CustomHeaderButton';
// Constants
import Colors from '../../../constants/Colors';
import { deleteProduct } from '../../../store/actions/products';

// Component
const Products = ({ navigation }) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        navigation.navigate('EditProduct', { id: id });
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

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <Product
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
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
                        onPress={() => deleteHandler(itemData.item.id)}
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

export default Products;