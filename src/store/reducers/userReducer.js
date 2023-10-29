// userReducer.js
const initialState = {
    name: '',
    avatar: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_NAME':
            localStorage.setItem('name', action.payload);
            return { ...state, name: action.payload };
        case 'UPDATE_USER_AVATAR':
            localStorage.setItem('avatar', action.payload);

            return { ...state, avatar: action.payload };
        default:
            return state;
    }
};

export default userReducer;