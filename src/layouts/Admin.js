/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef, Component, useState, useEffect, Suspense } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import EditBook from "views/EditBook.js";
import EditUser from "views/EditUser";
import loginArea from "components/Auth/login/login";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [token, setToken] = useState(null);
  const { userToken } = useSelector(state => state.userReducer)
  const location = useLocation();
  const mainPanel = useRef(null);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    setToken(userToken)
    console.log("token", token)

  }, [userToken])
  useEffect(() => {
    console.log("localStorage", localStorage)
    // const _token = userToken;
    //  console.log("_token", userToken)

    const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration"));
    const userIdLocal = JSON.parse(localStorage.getItem("user"));
    if (userToken && userIdLocal) {
      setToken(userToken);
      setUserId(userIdLocal);
      setTokenExpiration(tokenExp);
      setUser(userIdLocal.user);
      console.log("_token", userIdLocal.user.email)
    }
    const _cartItems = JSON.parse(localStorage.getItem("cart-items"));
    if (_cartItems && _cartItems.length > 0) {
      setCartItems(_cartItems);
    }
  }, [test]);

  const login = (token, userId, tokenExpiratopn) => {
    setToken(userToken);
    setUserId(userId);
    setTokenExpiration(tokenExpiratopn);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper" ref={mainPanel}>
        <Route path="/admin/login" component={loginArea} />
        {token && <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />}
       {token && <div className="main-panel" >
         <AdminNavbar user={user}/>
          <div className="content">
            <Switch>
              {getRoutes(routes)}
              <Route path="/admin/editBook/:bookId" component={EditBook}  />
              <Route path="/admin/editUser/:userId" component={EditUser}  />
              
              </Switch>
          </div>
          <Footer />
        </div>
        }
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default Admin;
