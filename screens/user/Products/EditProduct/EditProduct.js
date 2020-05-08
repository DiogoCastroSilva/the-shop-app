// React
import React, { useCallback, useEffect, useReducer } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Platform,
    Alert
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../../../../store/actions/products';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../../../components/UI/CustomHeaderButton/CustomHeaderButton';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValues,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};
// Component
const EditProduct = ({ navigation }) => {
    const id = navigation.getParam('id');
    const product = useSelector(state => state.products.userProducts.find(prod => prod.id === id));  

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: product ? product.title : '',
            imageUrl: product ? product.imageUrl : '',
            description: product ? product.description : '',
            price: ''
        },
        inputValidities: {
            title: product ? true : false,
            imageUrl: product ? true : false,
            description: product ? true : false,
            price: product ? true : false
        },
        formIsValid: product ? true : false
    });

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    }

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please enter a valid value', [{ text: 'Ok'}]);
            return;
        }
        if (product) {
            dispatch(updateProduct(
                id,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            dispatch(createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }
        navigation.goBack();
    }, [dispatch, id, formState, updateProduct, createProduct]);

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
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                        returnKeyType="next"
                    />
                    {!formState.inputValidities.imageUrl && <Text>Please enter a valid image</Text>}
                </View>
                {product ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={textChangeHandler.bind(this, 'price')}
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                        />
                        {!formState.inputValidities.price && <Text>Please enter a valid price</Text>}
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        returnKeyType="done"
                    />
                    {!formState.inputValidities.description && <Text>Please enter a valid description</Text>}
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