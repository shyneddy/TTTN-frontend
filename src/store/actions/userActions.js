// userActions.js
export const updateUserName = (name) => {
    return {
        type: 'UPDATE_USER_NAME',
        payload: name
    };
};

export const updateUserAvatar = (avatar) => {
    return {
        type: 'UPDATE_USER_AVATAR',
        payload: avatar
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    };
};