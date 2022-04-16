import mongoose from "mongoose";
const { Schema } = mongoose;
const MessageSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    content: String,
  },
  { timestamps: true }
);
const Messages = mongoose.model("messages", MessageSchema);
export default Messages;
