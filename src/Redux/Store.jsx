import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './authSlices'

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };



// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import authReducer from './authSlices'

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   version: 1,
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
  
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
 
// });

// const persistor = persistStore(store);

// export { store, persistor };
