import React from 'react';
// import '../../styles/User/Register.css'
import { get, post } from '../../util/api.js'
import validator from 'validator';
import { connect } from 'react-redux';
import '../../styles/Login_Register/Register.scss'

import { updateUserName, updateUserAvatar } from '../../store/actions/userActions';



class RegisterComponent extends React.Component {

    state = {}

    handleRegisterInput(key, e) {
        // console.log(e.target.value);
        this.setState({
            [key]: e.target.value
        })
    }

    Validate() {

        var isValidate = true;

        let fullNameError = document.getElementById('fullNameError');
        let usernameError = document.getElementById('usernameError');
        let passwordError = document.getElementById('passwordError');
        let phoneNumberError = document.getElementById('phoneNumberError');
        let addressError = document.getElementById('addressError');
        let genderError = document.getElementById('genderError');

        fullNameError.textContent = ''
        usernameError.textContent = ''
        passwordError.textContent = ''
        phoneNumberError.textContent = ''
        addressError.textContent = ''
        genderError.textContent = ''

        const { full_name, username, password, phone_number, address, gender } = this.state;

        if (!full_name || validator.isEmpty(full_name)) {
            fullNameError.textContent = "Họ và Tên không hợp lệ";
            isValidate = false;
        }

        // Kiểm tra tên đăng nhập
        if (!username || !validator.isLength(username, { min: 6 })) {
            usernameError.textContent = 'Tên đăng nhập phải có ít nhất 6 ký tự.';
            isValidate = false;
        }

        // Kiểm tra mật khẩu
        if (!password || !validator.isLength(password, { min: 6 })) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            isValidate = false;
        }

        // Kiểm tra số điện thoại
        if (!phone_number || !validator.isMobilePhone(phone_number, 'vi-VN')) {
            phoneNumberError.textContent = 'Số điện thoại không hợp lệ.';
            isValidate = false;
        }

        if (!address || validator.isEmpty(address)) {
            addressError.textContent = 'Địa chỉ không được bỏ trống';
            isValidate = false;
        }

        if (!gender || validator.isEmpty(gender)) {
            genderError.textContent = 'Giới tính không được bỏ trống';
            isValidate = false;
        }

        return isValidate;

    }

    handleRegisterSubmit() {

        // console.log(this.Validate());

        if (this.Validate()) {
            post('/user/register', this.state)
                .then(response => {
                    console.log(response);
                    window.location = "/";

                    // Xử lý dữ liệu nhận được từ server
                })
                .catch(error => {
                    if (error.response) {
                        // console.error('Error:', error.response.data.error);
                        // console.error('Additional Data:', error.response.data.additionalData);
                        if (error.response.data.isExists) {
                            // console.log('trung username');
                            let usernameError = document.getElementById('usernameError');
                            usernameError.textContent = 'Username đã tồn tại.'
                        }
                    }

                });


        }
    }



    render() {

        return (
            <>
                {/* <div className="formdk">
                    <h2>ĐĂNG KÝ THÀNH VIÊN</h2>
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và Tên:</label>
                        <input type="text" id="fullName" name="fullName" required onChange={(e) => this.handleRegisterInput('full_name', e)} />
                        <span id="fullNameError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullName">Tên đăng nhập:</label>
                        <input type="address" id="address" name="address" required onChange={(e) => this.handleRegisterInput('username', e)} />
                        <span id="usernameError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Mật khẩu:</label>
                        <input type="password" id="address" name="address" required onChange={(e) => this.handleRegisterInput('password', e)} />
                        <span id="passwordError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input type="text" id="phoneNumber" name="phonenumber" required onChange={(e) => this.handleRegisterInput('phone_number', e)} />
                        <span id="phoneNumberError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ:</label>
                        <input type="address" id="address" name="address" required onChange={(e) => this.handleRegisterInput('address', e)} />
                        <span id="addressError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Giới tính:</label>
                        <input name="gender" type="radio" value="male" onChange={(e) => this.handleRegisterInput('gender', e)} />Nam
                        <input name="gender" type="radio" value="female" onChange={(e) => this.handleRegisterInput('gender', e)} />Nữ
                        <span id="genderError" className="error"></span>
                    </div>


                    <div className="form-group">
                        <button type="submit" name="submit" onClick={() => this.handleRegisterSubmit()}>Đăng ký</button>
                    </div>
                </div>
 */}


                <div className='register-container'>
                    <div className='register'>
                        <div className="formdk">
                            <h2>Đăng ký thành viên</h2>
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và Tên:</label>
                                <input type="text" id="fullName" name="fullName" required onChange={(e) => this.handleRegisterInput('full_name', e)} />
                                <span id="fullNameError" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullName">Tên đăng nhập:</label>
                                <input type="address" id="address" name="address" required onChange={(e) => this.handleRegisterInput('username', e)} />
                                <span id="usernameError" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Mật khẩu:</label>
                                <input type="password" id="address" name="address" required onChange={(e) => this.handleRegisterInput('password', e)} />
                                <span id="passwordError" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số điện thoại:</label>
                                <input type="text" id="phoneNumber" name="phonenumber" required onChange={(e) => this.handleRegisterInput('phone_number', e)} />
                                <span id="phoneNumberError" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ:</label>
                                <input type="address" id="address" name="address" required onChange={(e) => this.handleRegisterInput('address', e)} />
                                <span id="addressError" className="error"></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Giới tính:</label>
                                <input name="gender" type="radio" value="male" onChange={(e) => this.handleRegisterInput('gender', e)} />Nam
                                <input name="gender" type="radio" value="female" onChange={(e) => this.handleRegisterInput('gender', e)} />Nữ
                                <span id="genderError" className="error"></span>
                            </div>


                            <div className="form-group">
                                <button type="submit" name="submit" onClick={() => this.handleRegisterSubmit()}>Đăng ký</button>
                                <span className="psw">Đã có tài khoản?<a href="/login">Đăng nhập</a></span>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}

// export default RegisterComponent
export default RegisterComponent;
