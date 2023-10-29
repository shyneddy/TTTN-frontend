import React from 'react';
import '../styles/layout/Header.scss'
import { connect } from 'react-redux';
import { get, post } from '../util/api';

import store from '../store/store';
import { updateUserName, updateUserAvatar, clearUser } from '../store/actions/userActions';
class Header extends React.Component {

    state = {}

    async componentDidMount() {
        var category;
        var login = {};

        await get('/user/islogin')
            .then(response => {
                if (response.isLogin) {
                    login.isLogin = true;
                    login.user = response.userinfo;
                } else {
                    login.isLogin = false;
                }

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({
            login
        })

        await get('/category/get-category')

            .then(response => {
                category = response.category;

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        this.setState({
            category
        })

    }


    async handleSigout() {
        await get('/user/sigout')
            .then(response => {
                // if (!response.isLogin) {
                //     console.log('islogin false');
                //     localStorage.removeItem('name');
                //     this.props.clearUser();
                //     // sessionStorage.removeItem('avatar');
                // }

            })
            .catch(error => {
                console.error(error);
                // Xử lý lỗi nếu có
            });
        window.location = "/";
    }

    handleSearch(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit form

        const input = document.querySelector('input[name="search"]');
        const searchValue = input.value;
        const params = new URLSearchParams();
        params.append('key', searchValue);

        const queryString = params.toString();

        // Chuyển hướng đến URL với tham số
        // window.location.href = `http://localhost.com/search?${queryString}`;

        window.location = `/search?${queryString}`;

    }

    render() {

        function renderCategory(category) {
            if (category && category.length > 0) {
                return category.map((item, index) => {
                    if (item.child_category) {
                        return (
                            <>
                                <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`}>{item.name}</a>
                                    <ul>
                                        {renderCategory(item.child_category)}
                                    </ul>

                                </li>

                            </>

                        );
                    } else {

                        return (
                            <li key={index}><a href={`/category?key=${encodeURIComponent(item.name)}`}>{item.name}</a></li>
                        );

                    }
                });
            }
            return null;
        }


        return (
            <>
                <header>
                    {/* <!--Header Top--> */}
                    {/* <div className="header-top">
                        <div className="container">
                            <div className="row">
                                <div className="register">
                                    <a href="#">Đăng ký</a>
                                </div>
                                <div className="login">
                                    <a href="#">Đăng nhập</a>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <!--Header Main--> */}
                    <div className="header-main">
                        <div className="container">
                            <div className="row">
                                <div className="logo">
                                    {/* <!--Logo--> */}
                                    <a href="/"><img src="/sachlogotrang.png" alt="Logo" /></a>
                                </div>

                                {/* CataLog  */}
                                <li className='category'>

                                    <ul className="dropdown">
                                        <div className="dropbtn">
                                            <span className='icon-menu'>
                                                <img src='/sort.png' />
                                            </span>
                                            <span className='icon-seemore'></span>
                                        </div>
                                        <div className="dropdown-content">
                                            {/* <ul> */}

                                            {this.state && this.state.category && renderCategory(this.state.category)}
                                            {/* <li><a href="#">HTML</a></li>
                                            <li><a href="#">CSS</a>
                                                <ul>
                                                    <li><a href="#">Resets</a></li>
                                                    <li><a href="#">Grids</a></li>
                                                    <li><a href="#">Frameworks</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">JavaScript</a>
                                                <ul>
                                                    <li><a href="#">Ajax</a></li>
                                                    <li><a href="#">jQuery</a></li>
                                                </ul>
                                            </li> */}
                                            {/* </ul> */}



                                        </div>
                                    </ul>
                                </li>

                                <div className="search-bar">
                                    {/* <!--Thanh tìm kiếm--> */}
                                    <form action="#" method="get" className='form-search' onSubmit={(e) => { this.handleSearch(e) }}>
                                        <input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." required />
                                        <button type="submit">Tìm kiếm</button>
                                    </form>
                                </div>
                                {this.state && this.state.login && this.state.login.isLogin ?

                                    <div className="icon-control-container">
                                        <div className='icon-control'>
                                            <div className="order-icon">
                                                {/* <!--Giỏ hàng--> */}
                                                <a href="/order">
                                                    <div className='icon'>
                                                        {/* <img src="https://cdn-icons-png.flaticon.com/512/3496/3496156.png" /> */}
                                                        {/* <div className=''></div> */}
                                                    </div>
                                                    <div className='title'>
                                                        Giỏ hàng
                                                    </div>
                                                </a>

                                            </div>
                                            <div className="user-icon">
                                                {/* <!--Icon User--> */}
                                                <a>
                                                    <div className='icon'>
                                                        {/* <img src="https://cdn-icons-png.flaticon.com/512/3496/3496156.png" /> */}
                                                        {/* <div className=''></div> */}
                                                    </div>
                                                    <div className='title'>
                                                        {this.state.login.user.full_name}
                                                    </div>
                                                </a>
                                                <div className="dropdown-content">
                                                    <a href="/user/info">Thông tin cá nhân</a>
                                                    <a href="/user/order">Đơn hàng của tôi</a>
                                                    <a href="#" onClick={() => this.handleSigout()}>Đăng xuất</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    :

                                    <div className="icon-control-container">
                                        <div className='icon-control'>
                                            <div className="order-icon">
                                                {/* <!--Giỏ hàng--> */}
                                                <a href="/order">
                                                    <div className='icon'>
                                                        {/* <img src="https://cdn-icons-png.flaticon.com/512/3496/3496156.png" /> */}
                                                        {/* <div className=''></div> */}
                                                    </div>
                                                    <div className='title'>
                                                        Giỏ hàng
                                                    </div>
                                                </a>

                                            </div>
                                            <div className="user-icon">
                                                {/* <!--Icon User--> */}
                                                <a href="/login">
                                                    <div className='icon'>
                                                        {/* <img src="https://cdn-icons-png.flaticon.com/512/3496/3496156.png" /> */}
                                                        {/* <div className=''></div> */}
                                                    </div>
                                                    <div className='title'>
                                                        Tài khoản
                                                    </div>

                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>





                </header>
            </>
        )
    }
}


// export default Header
export default Header;