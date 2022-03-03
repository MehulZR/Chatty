import React from "react";
const Login = () => {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="card" style={{ width: "400px", margin: "auto" }}>
          <div
            className="card-header"
            style={{ boxShadow: "none", borderBottom: "1px solid #ededed" }}
          >
            <div className="card-header-title is-centered">Chatty</div>
          </div>
          <div className="card-image">
            <img src="./chatImg.svg" alt="chat" style={{ padding: "1rem" }} />
          </div>
          <div className="card-content">
            Chatty is a real time chat app using websockets
          </div>
          <div className="card-footer">
            <div className="card-footer-item">
              <a
                href="http://localhost:8000/login"
                className="button is-primary"
              >
                <span className="icon">
                  <i
                    className="fa-brands fa-google i"
                    style={{ fontStyle: "normal" }}
                  ></i>
                </span>
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
