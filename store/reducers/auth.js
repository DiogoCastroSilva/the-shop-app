import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    email: null,
    didTryAutoLogin: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                email: action.email,
                didTryAutoLogin: true
            };
        case SET_DID_TRY_AUTO_LOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};