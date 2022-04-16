import AuthController from "../controllers/AuthController.js";
export default (App) => {
  App.get("/login", (req, res) => AuthController.login(req, res));
  App.get("/oauth2callback", (req, res) =>
    AuthController.authCallback(req, res)
  );
};
