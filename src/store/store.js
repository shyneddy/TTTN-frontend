// store.js
import { createStore } from 'redux';
import userReducer from './reducers/userReducer.js';

// Khôi phục trạng thái từ localStorage
const persistedUsername = localStorage.getItem('name');
const persistedAvatar = localStorage.getItem('avatar');
const persistedState = {
    name: persistedUsername ? persistedUsername : '',
    avatar: persistedAvatar ? persistedAvatar : ''
};

// Tạo Redux store với trạng thái đã khôi phục
const store = createStore(userReducer, persistedState);

export default store;