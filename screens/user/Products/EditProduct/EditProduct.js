// React
import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../../../../store/actions/products';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../../../components/UI/CustomHeaderButton/CustomHeaderButton';

// Component
const EditProduct = ({ navigation }) => {
    const id = navigation.getParam('id');
    const product = useSelector(state => state.products.userProducts.find(prod => prod.id === id));  

    const [title, setTitle] = useState(product ? product.title : '');
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        console.log('submit', product);
        if (product) {
            dispatch(updateProduct(id, title, description, imageUrl));
        } else {
            dispatch(createProduct(title, description, imageUrl, +price));
        }
        navigation.goBack();
    }, [dispatch, id, title, description, imageUrl, price, updateProduct, createProduct]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {product ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProduct.navigationOptions = navData => {
    const id = navData.navigation.getParam('id');
    const submit = navData.navigation.getParam('submit');
    return {
        headerTitle: id ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submit}
                />
            </HeaderButtons>
        )
    };
};

// Styles
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProduct;