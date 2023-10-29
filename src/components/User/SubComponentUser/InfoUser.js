import React from 'react';
import '../../../styles/User/InfoUser.scss'
import { get, post } from '../../../util/api'
import validator from 'validator';


class InfoUser extends React.Component {

    state = {
        clickChangePassword: false
    }

    myRef = React.createRef();

    async componentDidMount() {
        var userinfo, userinfo_copy;
        await get('/user/getinfo')
            .then(response => {
                console.log(response);
                userinfo = response.userinfo;
                userinfo_copy = response.userinfo;
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

        this.setState({
            userinfo: userinfo,
            userinfo_copy: userinfo_copy
        })
    }


    handleChangeInfo(e, key) {

        let userinfo = { ...this.state.userinfo };
        userinfo[key] = e.target.value;


        this.setState({
            userinfo
        })

    }

    handleChangeGender(e, gender) {

        let userinfo = { ...this.state.userinfo };
        userinfo.gender = gender;

        this.setState({
            userinfo
        })

    }


    async handleUpdateInfo() {

        if (this.state.userinfo != this.state.userinfo_copy) {
            console.log('update.....');
            const userInfoNew = this.state.userinfo;

            if (!userInfoNew.full_name || validator.isEmpty(userInfoNew.full_name)) {
                alert('Tên không được để trống')
                return;
            }

            // Kiểm tra số điện thoại
            if (!userInfoNew.phone_number || !validator.isMobilePhone(userInfoNew.phone_number, 'vi-VN')) {
                alert('Số điện thoại không được để trống')
                return;
            }

            if (!userInfoNew.address || validator.isEmpty(userInfoNew.address)) {
                alert('Địa chỉ không được để trống')
                return;
            }

            await post('/user/updateinfo', { ...userInfoNew })
                .then(response => {
                    console.log(response);
                    if (response.isUpdate) {
                        window.location.reload();

                    }
                })
                .catch(error => {
                    console.error(error);
                    // Xử lý lỗi nếu có
                });

            // window.location = "http://localhost:3000/info";
        }

    }

    handleChangePassword() {
        if (this.state.clickChangePassword) {
            this.myRef.current.setAttribute('style', 'display: none')

            this.setState({
                clickChangePassword: false,
            })
        } else {
            this.myRef.current.setAttribute('style', 'display: block')

            this.setState({
                clickChangePassword: true,
            })
        }
    }


    async handleSubmitPassword(e) {
        e.preventDefault();
        const password_old = document.getElementById("pass-old").value;
        const password_new = document.getElementById("pass-new").value;
        const password_re = document.getElementById("pass-re").value;

        if (password_new != password_re) {
            alert('Nhập lại mật khẩu sai');
            return;
        }

        await post('/user/updatepassword', {
            password_old,
            password_new
        })
            .then(response => {
                console.log(response);
                if (response.checkPassword) {
                    // window.location = "http://localhost:3000/info";
                    alert('Password sai')

                }
                if (response.isUpdate) {
                    window.location.reload();

                }
            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
                if (error.response.data.falsePassword) {
                    alert('sai mật khẩu')
                }
            });

    }

    render() {
        console.log('xin chào info');
        return (
            <>
                {this.state && this.state.userinfo &&
                    <div className='showinfo'>
                        <div className='title-showinfo'>
                            Thông tin cá nhân
                        </div>

                        <div className='showandupdate'>
                            <div className='info-container'>
                                <div className='info'>

                                    <div className='infosubtag fullname'>

                                        <div className='info-title'>Họ và tên:</div>
                                        <div className='ifullname'><input value={this.state.userinfo.full_name} onChange={(e) => { this.handleChangeInfo(e, 'full_name') }} /></div>

                                    </div>

                                    <div className='infosubtag phonenumber'>
                                        <div className='info-title'>Số điện thoại:</div>
                                        <div className='iphonenumber'><input value={this.state.userinfo.phone_number} onChange={(e) => { this.handleChangeInfo(e, 'phone_number') }} /></div>
                                    </div>

                                    <div className='infosubtag gender'>
                                        <div className='info-title'>Giới tính:</div>
                                        <div className='igender'>
                                            {this.state.userinfo.gender == 1 ? <>
                                                <input type="radio" checked="checked" name="gender" value="male" onClick={(e) => { this.handleChangeGender(e, 1) }} /> Nam&ensp;
                                                <input type="radio" name="gender" value="female" onClick={(e) => { this.handleChangeGender(e, 0) }} /> Nữ

                                            </> :
                                                <>
                                                    <input type="radio" name="gender" value="male" onClick={(e) => { this.handleChangeGender(e, 1) }} /> Nam&ensp;
                                                    <input type="radio" checked="checked" name="gender" value="female" onClick={(e) => { this.handleChangeGender(e, 0) }} /> Nữ
                                                </>
                                            }
                                        </div>
                                    </div>

                                    <div className='infosubtag address'>
                                        <div className='info-title'>Địa chỉ:</div>
                                        <div className='iaddress'><input value={this.state.userinfo.address} onChange={(e) => { this.handleChangeInfo(e, 'address') }} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className='updatepassword'>
                                <div className='title-password subeditpassword'>Mật khẩu</div>
                                <div className='upassword subeditpassword'>
                                    <div className='passwordencode'>
                                        <div>
                                            <img src='https://fptshop.com.vn/Content/v5d/account/images/ic-lock.png?v=123' style={{ width: '25px' }} />
                                        </div>
                                        <div>********</div>
                                    </div>
                                    <div className='btn-updatepassword'><button onClick={() => { this.handleChangePassword() }}>Đổi mật khẩu</button></div>
                                </div>


                                <div ref={this.myRef} className='changepassword'>
                                    <form className='form-update-password'>
                                        <div>
                                            <label htmlFor="fname">Mật khẩu cũ:</label>
                                            <div>
                                                <input type="text" id="pass-old" name="pass-old" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="fname">Mật khẩu mới:</label>
                                            <div>
                                                <input type="text" id="pass-new" name="pass-new" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="fname">Nhập lại mật khẩu mới:</label>
                                            <div>
                                                <input type="text" id="pass-re" name="pass-re" />
                                            </div>
                                        </div>

                                        <input type="submit" value="Xác Nhận" onClick={(e) => { this.handleSubmitPassword(e) }} />
                                    </form>
                                </div>


                            </div>

                        </div>

                        <div className='btn-update'>
                            <button onClick={() => { this.handleUpdateInfo() }}>Cập nhật</button>
                        </div>


                    </div>
                }


            </>
        )
    }
}

export default InfoUser
