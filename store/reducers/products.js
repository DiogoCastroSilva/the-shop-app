import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product =>
                    product.id !== action.id
                ),
                availableProducts: state.availableProducts.filter(availableProduct =>
                    availableProduct.id !== action.id
                )
            };
        case CREATE_PRODUCT:
            const product = new Product(
                action.product.id,
                action.product.ownerId,
                action.product.title,
                action.product.imageUrl,
                action.product.description,
                action.product.price
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(product),
                userProducts: state.userProducts.concat(product)
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id = action.id);
            const updatedProduct = new Product(
                action.id,
                state.userProducts[productIndex].ownerId,
                action.product.title,
                action.product.imageUrl,
                action.product.description,
                state.userProducts[productIndex].price,
            );
            const userProducts = [...state.userProducts];
            userProducts[productIndex] = updatedProduct;

            const availableProductIndex = state.userProducts.findIndex(prod => prod.id == action.id);
            const availableProducts = [state.availableProducts];
            availableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProduct: availableProducts,
                userProducts: userProducts
            };
        default:
            return state;
    };
};