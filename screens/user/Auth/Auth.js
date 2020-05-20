// React
import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
// Redux
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../../store/actions/auth';
// Expo
import { LinearGradient } from 'expo-linear-gradient';


// Components
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
// Constants
import Colors from '../../../constants/Colors';

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
const Auth = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occoured!', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    const authHandler = async () => {
        setIsLoading(true);
        let action = isSignUp ? signUp : login;
        try {
            await dispatch(action(formState.inputValues.email, formState.inputValues.password));
            navigation.navigate('Shop');
        } catch(e) {
            setError(e.message);
            setIsLoading(false);
        }
        
    };

    const textChangeHandler = useCallback((inputIdentifier, value, validity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: value,
            isValid: validity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            keyboardVerticalOffset={100}
        >
                <Card style={styles.content}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            errorText="Please enter a valid email address."
                            value=''
                            onInputChange={textChangeHandler}
                        />
                        <Input
                            id="password"
                            label="Password"
                            required
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            minLength={5}
                            value=''
                            secureTextEntry={true}
                            onInputChange={textChangeHandler}
                        />
                        <View style={styles.btnContainer}>
                            {isLoading
                                ? <ActivityIndicator
                                    size='small'
                                    color={Colors.primary}
                                  />
                                : <Button
                                    title={isSignUp ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                  />
                            }
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                title={`Swith to ${isSignUp ? 'Login' : 'Sign Up'}`}
                                color={Colors.secondary}
                                onPress={() => {
                                    setIsSignUp(prevState => !prevState)
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            
        </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export const authNavOptions = {
    headerTitle: 'Authenticate'
};

// Styles
const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    btnContainer: {
        marginTop: 10
    }
});

export default Auth;