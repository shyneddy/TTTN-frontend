import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main_Admin from './admin_components/layout/Main_Admin';
import LoginComponent from './admin_components/Login/LoginComponent';
import reportWebVitals from './reportWebVitals';
import { ToastContainer, toast } from 'react-toastify';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>

        <Route path="/admin">
          <Main_Admin />
        </Route>

        <Route path="/admin-login">
          <LoginComponent />

        </Route>

        <Route path="/">
          <App />
        </Route>
      </Switch>
      <ToastContainer />

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
