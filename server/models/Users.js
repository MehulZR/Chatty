import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  pictureURL: String,
});
const Users = mongoose.model("Users", UserSchema);
export default Users;
