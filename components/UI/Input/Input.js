// React
import React, { useReducer, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';

// Constants
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    if (action.type === INPUT_CHANGE) {
        return {
            ...state,
            value: action.value,
            isValid: action.isValid
        };
    }
    if (action.type === INPUT_BLUR) {
        return {
            ...state,
            touched: true
        }
    }
    return state;
};

// Component
const Input = ({
    id,
    label,
    value,
    isValid = true,
    onInputChange,
    keyboardType = 'default',
    autoCapitalize = 'none',
    autoCorrect,
    returnKeyType = 'default',
    errorText = 'Invalid input',
    multiline = false,
    numberOfLines,
    required = false,
    email,
    min,
    max,
    minLength,
    secureTextEntry = false
}) => {
    const [inputState, dispatchInput] = useReducer(inputReducer, {
        value: value ?? '',
        isValid: isValid,
        touched: false
    });

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [inputState, id, onInputChange]);

    const inputChangeHandler = value => {
        let isValid = true;
        if (required && value.trim().length === 0) {
            isValid = false;
        }
        if (email && !emailRegex.test(value.toLowerCase())) {
            isValid = false;
        }
        if (min != null && +value < min) {
            isValid = false;
        }
        if (max != null && +value > max) {
            isValid = false;
        }
        if (minLength != null && value.length < minLength) {
            isValid = false;
        }
        dispatchInput({ type: INPUT_CHANGE, value: value, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatchInput({ type: INPUT_BLUR });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={inputState.value}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                returnKeyType={returnKeyType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                secureTextEntry={secureTextEntry}
                onChangeText={inputChangeHandler}
                onSelectionChange={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
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
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default Input;