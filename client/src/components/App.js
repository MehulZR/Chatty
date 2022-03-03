import React, { useEffect } from "react";
import Header from "./header";
import Welcome from "./welcome";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { USER_LOGIN } from "../actions";
const App = (props) => {
  const userLoginHelper = () => {
    if (document.cookie) props.USER_LOGIN(jwt_decode(document.cookie));
  };
  useEffect(() => {
    userLoginHelper();
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      {props.user ? <Header /> : null}
      <Routes>
        {!props.user ? <Route exact path="/" element={<Login />} /> : null}
        {props.user ? <Route exact path="/" element={<Welcome />} /> : null}
      </Routes>
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { USER_LOGIN })(App);
