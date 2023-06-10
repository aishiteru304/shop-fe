import { createSlice } from "@reduxjs/toolkit";

export interface productInfo {
    _id: string,
    name: string,
    category: string,
    image: string,
    price: string,
    description: string
}

interface arrayProductInfor {
    productList: productInfo[]
}

const initialState: arrayProductInfor = {
    productList: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        }
    }
});

export const {
    setDataProduct
} = productSlice.actions;

export default productSlice.reducer;