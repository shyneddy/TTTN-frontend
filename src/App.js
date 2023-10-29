import React from 'react';
import './App.css';
import Main from './layout/Main';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import Main_Admin from './admin_components/layout/Main_Admin';


class App extends React.Component {
  render() {

    return (
      // <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <div className='app' >

            <Route path="/">
              <Header />
              <Main />
              <Footer />
            </Route>


            {/* <ToastContainer /> */}
          </div>
        </Switch>
      </BrowserRouter>
      // </Provider>
    );

  }
}

export default App;
