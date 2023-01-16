import { configureStore } from '@reduxjs/toolkit';
import eCommerce from "../features/features"

export const store = configureStore({
    reducer: {
        commerce : eCommerce
    },
})
