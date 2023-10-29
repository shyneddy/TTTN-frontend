


import React from 'react';
// import '../../styles/User/Login.css';
import validator from 'validator';
import { get, post } from '../../util/api.js'
import { connect } from 'react-redux';
import store from '../../store/store';
import { updateUserName, updateUserAvatar } from '../../store/actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/Login_Register/Login.scss'

class LoginComponent extends React.Component {

    state = {}

    componentDidMount() {
        get('/user/islogin')
            .then(response => {
                console.log(response);
                if (response.isLogin) {
                    window.location = "/";
                }
            })
            .catch(error => {
                console.error(error);

                // Xử lý lỗi nếu có
            });

    }

    handleLoginInput(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }

    Validate() {
        let isValidate = true;
        const { username, password } = this.state;
        if (!username || validator.isEmpty(username)) {
            isValidate = false;
        }

        // Kiểm tra tên đăng nhập
        if (!password || !validator.isLength(password, { min: 6 })) {
            isValidate = false;
        }
        return isValidate;
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        if (this.Validate()) {
            post('/user/login', this.state)
                .then(response => {
                    console.log(response);
                    window.location = "/";
                })
                .catch(error => {
                    console.error(error);
                    toast.dismiss();
                    toast.error("Tên đăng nhập hoặc mật khẩu không đúng !", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    // Xử lý lỗi nếu có
                });

        }
    }



    render() {
        return (
            <>
                {/* <form className="formdk" onSubmit={(e) => this.handleLoginSubmit(e)} >
                    <h2>ĐĂNG NHẬP</h2>

                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input type="username" id="username" name="username" required onChange={(e) => this.handleLoginInput('username', e)} />
                        <span id="usernameError" className="error"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required onChange={(e) => this.handleLoginInput('password', e)} />
                        <span id="passwordError" className="error"></span>
                    </div>


                    <div className="form-group">
                        <button type="submit" name="submit" >Đăng Nhập</button>
                    </div>
                </form> */}

                <div className='login-container'>

                    <div className='Login'>
                        <form onSubmit={(e) => this.handleLoginSubmit(e)}>
                            <div className="container">
                                <h1 className='H1'>Đăng nhập</h1>
                                <label htmlFor="uname">Tài khoản</label>
                                <input type="text" placeholder="Nhập tài khoản" name="uname" required onChange={(e) => this.handleLoginInput('username', e)} />

                                <label htmlFor="psw">Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu" name="psw" required onChange={(e) => this.handleLoginInput('password', e)} />

                                <label>
                                    <input type="checkbox" checked="checked" name="remember" /> Nhớ mật khẩu
                                </label>

                                <button type="submit">Đăng nhập</button>

                                <span className="psw">Quên mật khẩu?<a href="/register">Đăng ký</a></span>
                            </div>
                        </form>
                    </div>
                </div>

            </>
        )
    }
}


// export default LoginComponent
export default LoginComponent;