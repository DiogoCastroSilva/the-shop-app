// React
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../../../../store/actions/products';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../../../components/UI/CustomHeaderButton/CustomHeaderButton';
import Input from '../../../../components/UI/Input/Input';
// Constants
import Colors from '../../../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const id = navigation.getParam('id');
    const product = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === id)
    );  

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occoured!', error, [{ text: 'Ok' }]);
        }
    }, [error]);

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

    const textChangeHandler = useCallback((inputIdentifier, value, validity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: value,
            isValid: validity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    const submitHandler = useCallback(async () => {
        closeKeyboard();
        console.log(formState);
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please enter a valid value', [{ text: 'Ok'}]);
            return;
        }
        setError();
        setIsLoading(true);
        try {
            if (product) {
                await dispatch(updateProduct(
                    id,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ));
            } else {
                await dispatch(createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                ));
            }
            navigation.goBack();
        } catch(e) {
            setError(e.message);
        }

        setIsLoading(false);
        
    }, [dispatch, id, formState]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    
                    <Input 
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title"
                        value={product ? product.title : ''}
                        isValid={!!product}
                        onInputChange={textChangeHandler}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image URL"
                        errorText="Please enter a valid image URL"
                        value={product ? product.imageUrl : ''}
                        isValid={!!product}
                        onInputChange={textChangeHandler}
                        returnKeyType="next"
                        required
                    />
                    {!product && (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price value"
                            onInputChange={textChangeHandler}
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description"
                        value={product ? product.description : ''}
                        isValid={!!product}
                        onInputChange={textChangeHandler}
                        autoCapitalize="sentences"
                        multiline
                        numberOfLines={3}
                        required
                        minLength={5}
                    />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProduct;