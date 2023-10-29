import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Thay thế bằng URL của API bạn đang sử dụng
    withCredentials: true, // Gửi cookie trong cross-origin requests (nếu cần thiết)
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        // Gửi các header yêu cầu khác (nếu cần thiết)
    }
});

// export const get = (url, params) => {
//     return api.get(url, { params }, {
//         withCredentials: true
//     })
//         .then(response => response.data)
//         .catch(error => {
//             throw new Error(error);
//         });
// };
export const get = (url, params) => {
    return api
        .get(url, { params })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export const post = (url, data) => {
    return api.post(url, data)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};