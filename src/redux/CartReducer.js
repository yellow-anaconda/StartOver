import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalAmount: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity++;
            state.totalAmount += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const itemToRemove = state.cart.find(item => item.id === itemId);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.quantity;
                state.totalAmount -= (itemToRemove.price * itemToRemove.quantity);
                state.cart = state.cart.filter(item => item.id !== itemId);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                item.quantity++;
                state.totalQuantity++;
                state.totalAmount += item.price;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    state.cart = state.cart.filter((item) => item.id !== action.payload);
                } else {
                    item.quantity--;
                }
                state.totalQuantity--;
                state.totalAmount -= item.price;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer; 