import ProfileController from "../controllers/ProfileController.js";
export default (App) => {
  App.post("/profile", (req, res) => ProfileController.profileInfo(req, res));
};
