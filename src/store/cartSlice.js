import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            if (item) {
                item.quantity++;
                item.attributes.price =
                    item.oneQuantityPrice * item.quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        updateCart: (state, action) => {
            const { id } = action.payload;
            state.cartItems = state.cartItems.map((p) => {
                if (p.id === id) {
                    if (action.payload.key === "quantity") {
                        p.attributes.price =
                            p.oneQuantityPrice * action.payload.val;
                    }
                    return { ...p, [action.payload.key]: action.payload.val };
                }
                return p;
            });
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id)
        }
    },
});

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
