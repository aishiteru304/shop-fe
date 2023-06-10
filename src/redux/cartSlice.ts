import { createSlice } from "@reduxjs/toolkit";

export interface cartInfo {
    _id: string,
    email: string,
    name: string,
    category: string,
    image: string,
    price: string,
    idProduct: string
}

interface arrayCartInfor {
    cartItem: cartInfo[]
}

const initialState: arrayCartInfor = {
    cartItem: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setDataCart: (state, action) => {
            state.cartItem = [...action.payload];
        }
    }
});

export const {
    setDataCart
} = cartSlice.actions;

export default cartSlice.reducer;