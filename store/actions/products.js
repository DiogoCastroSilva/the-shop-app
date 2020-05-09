import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://the-shop-app-554bd.firebaseio.com/products.json');
            
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const respData = await response.json();

            const loadedProducts = [];
            for (const key in respData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    respData[key].title,
                    respData[key].imageUrl,
                    respData[key].description,
                    respData[key].price
                ));
            }
            
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            });
        } catch(e) {
            throw e;
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
        try {
            const response = await fetch(`https://the-shop-app-554bd.firebaseio.com/products/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            dispatch ({
                type: DELETE_PRODUCT,
                id: id
            });
        } catch(e) {
            throw e;
        }
    };
    
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        try{
            const response = await fetch('https://the-shop-app-554bd.firebaseio.com/products.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            });
    
            const respData = await response.json();
    
            dispatch({
                type: CREATE_PRODUCT,
                product: {
                    id: respData.name,
                    title,
                    description,
                    imageUrl,
                    price
                }
            });
        } catch(e) {
            throw e;
        }
        
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://the-shop-app-554bd.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            dispatch({
                type: UPDATE_PRODUCT,
                id: id,
                product: {
                    title,
                    description,
                    imageUrl
                }
            });
        } catch(e) {
            throw e;
        }
        
    };
};