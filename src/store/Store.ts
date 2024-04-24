
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Root';
import * as CryptoJS from 'crypto-js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas/rootSaga';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";

const encryptTransform:any = {
  in: (state: any) => {
    try {
      const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), `${process.env.PERSIST_GATE_KEY}`).toString();
     
      return encryptedState;
    } catch (error) {
      console.error('Encryption error:', error);
     
      return state;
    }
  },
  out: (encryptedState: any) => {
    try {
      const decryptedState = CryptoJS.AES.decrypt(encryptedState, `${process.env.PERSIST_GATE_KEY}`).toString(CryptoJS.enc.Utf8);
      
      return JSON.parse(decryptedState);
    } catch (error) {
      console.error('Decryption error:', error);
     
      return {};
    }
  },
};

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptTransform],
  blacklist: ['athlete'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store:any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export const persistor = persistStore(store);

export default store;
