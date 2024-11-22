import { configureStore } from "@reduxjs/toolkit";

import  userReducer  from "../Redux/Slice";
import AdminReducer from "../Redux/AdminSlice";
import productReducer from "../Redux/ProductSlice";

const store = configureStore( {
    reducer: {
        user:userReducer,
        admin:AdminReducer,
        product:productReducer
    }
})

export default store;