import React from 'react';
import '../styles/layout/Main.scss';
import HomeComponent from '../components/Home/HomeComponent';
import DetailProductComponent from '../components/Product/DetailProductComponent';
import RegisterComponent from '../components/Login_Register/RegisterComponent';
import LoginComponent from '../components/Login_Register/LoginComponent';
import OrderComponent from '../components/Order/OrderComponent';
import InfoUserComponent from '../components/User/InfoUserComponent';
import ConfirmOrderComponent from '../components/Order/ConfirmOrderComponent';
import ShowSearchComponent from '../components/Show_Products/ShowSearchComponent';
import ShowCategoryComponent from '../components/Show_Products/ShowCategoryComponent';
import Login_register_Component from '../components/Login_Register/Login_Register_Component';

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class Main extends React.Component {

    state = {}


    render() {

        return (
            <>
                <BrowserRouter>

                    <Switch>

                        <Route exact path="/">
                            <HomeComponent />
                        </Route>

                        <Route path="/detail/:id">
                            <DetailProductComponent />
                        </Route>

                        <Route exact path="/register">
                            <RegisterComponent />
                        </Route>

                        <Route exact path="/login">
                            <LoginComponent />
                        </Route>

                        <Route exact path="/order">
                            <OrderComponent />
                        </Route>

                        <Route exact path="/order/confirm">
                            <ConfirmOrderComponent />
                        </Route>

                        <Route path="/user">
                            <InfoUserComponent />
                        </Route>

                        <Route path="/search">
                            <ShowSearchComponent />
                        </Route>

                        <Route path="/category">
                            <ShowCategoryComponent />
                        </Route>

                        <Route path="/test-login">
                            <Login_register_Component />
                        </Route>
                    </Switch>
                </BrowserRouter>


            </>
        )
    }
}

export default Main