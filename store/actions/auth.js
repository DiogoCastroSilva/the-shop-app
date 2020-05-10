import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, email, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({
            type: AUTHENTICATE,
            token,
            userId,
            email
        });
    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAv8sqxUDQ-IkAez_qezO-ka2lGMfyIbSY', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            const respData = await response.json();

            if (!response.ok) {
                const errorId = respData.error;
                let message = 'Something went wrong';
                if (errorId === 'EMAIL_NOT_FOUND') {
                    message = 'This email could not be found';
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'This password is not valid';
                } else if (errorId === 'USER_DISABLED') {
                    message = 'This account is not active'
                }

                throw new Error(message);
            }

            dispatch(authenticate(respData.idToken, respData.localId, respData.email, parseInt(respData.expiresIn) * 1000));
            const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
            saveDataToStorage(respData.idToken, respData.localId, respData.email, expirationDate);
        } catch(e) {
            throw e;
        }
        
    };
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAv8sqxUDQ-IkAez_qezO-ka2lGMfyIbSY', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            const respData = await response.json();

            if (!response.ok) {
                const errorId = respData.error;
                let message = 'Something went wrong';
                if (errorId === 'EMAIL_NOT_FOUND') {
                    message = 'This email could not be found';
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'This password is not valid';
                } else if (errorId === 'USER_DISABLED') {
                    message = 'This account is not active'
                }

                throw new Error(message);
            }

            dispatch(authenticate(respData.idToken, respData.localId, respData.email, parseInt(respData.expiresIn) * 1000));
            const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
            saveDataToStorage(respData.idToken, respData.localId, respData.email, expirationDate);
        } catch(e) {
            throw e;
        }
        
    };
};

export const logout = () => {
    return dispatch => {
        clearLogoutTimer();
        AsyncStorage.removeItem('userData');
        dispatch({
            type: LOGOUT
        })
    };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, userId, email, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({token, userId, email, expirationDate: expirationDate.toISOString() }));
};