import React from 'react';
import '../../styles/User/InfoUser.scss'
import axios from 'axios'
import { get, post } from '../../util/api'
import validator from 'validator';
import { withRouter } from "react-router";

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import InfoUser from './SubComponentUser/InfoUser';
import OrderUser from './SubComponentUser/OrderUser';
import FavoriteUser from './SubComponentUser/FavoriteUser';
import RatingUser from './SubComponentUser/RatingUser';


class InfoUserComponent extends React.Component {

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

    handleNavClick = (e, path) => {
        const { history } = this.props;
        history.push(path);
    };


    render() {

        const { location } = this.props;


        return (
            <>
                <BrowserRouter>


                    {this.state && this.state.userinfo &&
                        <>
                            <div className='userinfo-container'>
                                <div className='usercard'>
                                    <div className='userintro-container'>
                                        {/* <input id="file-input" type="file" style={{ "display: none;"}} /> */}
                                        <div className='intro'>
                                            <div className='name-user'>{this.state.userinfo_copy.full_name}</div>
                                        </div>
                                    </div>

                                    <div className='control' id='nav-control'>
                                        <ul>
                                            <li className={location.pathname === '/user/info' ? 'active' : ''} onClick={(e) => this.handleNavClick(e, '/user/info')}>
                                                <a href="/user/info">Thông tin cá nhân</a>
                                            </li>
                                            <li className={location.pathname === '/user/order' ? 'active' : ''} onClick={(e) => this.handleNavClick(e, '/user/order')}>
                                                <a href="/user/order">Đơn hàng của tôi</a>
                                            </li>
                                            <li className={location.pathname === '/user/rating' ? 'active' : ''} onClick={(e) => this.handleNavClick(e, '/user/rating')}>
                                                <a href="/user/rating">Sản phẩm đã đánh giá</a>
                                            </li>
                                            <li className={location.pathname === '/user/favorite' ? 'active' : ''} onClick={(e) => this.handleNavClick(e, '/user/favorite')}>
                                                <a href="/user/favorite">Sản phẩm yêu thích</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                <Switch>

                                    <Route exact path='/user/info'>
                                        <InfoUser />
                                    </Route>
                                    <Route exact path='/user/order'>
                                        <OrderUser />
                                    </Route>
                                    <Route exact path='/user/favorite'>
                                        <FavoriteUser />
                                    </Route>

                                    <Route exact path='/user/rating'>
                                        <RatingUser />
                                    </Route>
                                </Switch>


                            </div>
                        </>

                    }

                </BrowserRouter>


            </>
        )
    }
}

export default withRouter(InfoUserComponent)
