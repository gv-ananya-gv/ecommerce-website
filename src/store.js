// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
};


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);
