import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
    orders: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                orders: action.orders
            };
        case ADD_ORDER:
            const newOrder = new Order(
                action.order.id,
                action.order.items,
                action.order.amount,
                action.order.date
            );
            return {
                orders: state.orders.concat(newOrder)
            };
        default:
            return state;
    };
};