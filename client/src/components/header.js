import React from "react";
import { connect } from "react-redux";
import { USER_LOGOUT } from "../actions";
const Header = (props) => {
  return (
    <nav className="navbar" style={{ height: "10vh" }}>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-brand">
            <div className="navbar-item">Chatty</div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={() => props.USER_LOGOUT()}
              className="button is-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default connect(null, { USER_LOGOUT })(Header);
