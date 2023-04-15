import { authorizationURL } from "../../../config/oauth.js";
export default (req, res) => res.redirect(authorizationURL);
