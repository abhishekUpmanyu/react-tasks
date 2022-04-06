import { configureStore } from "@reduxjs/toolkit";
import searchReducer from 'features/search';
import dataReducer from 'features/data';

const store = configureStore({
    reducer: {
        search: searchReducer,
        data: dataReducer,
    }
});

export default store;