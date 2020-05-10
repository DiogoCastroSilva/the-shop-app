import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    email: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                email: action.email
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};