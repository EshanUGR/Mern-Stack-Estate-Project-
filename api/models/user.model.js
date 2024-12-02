import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/ogw/AF2bZyjtz4apRtz-037Df0rZJCDV5mx1sQMdU9X9-S-CWnlT3r4=s64-c-mo",
    },
  },
  { timestamps: true }
);
//timestamps=add another extra information

const User=mongoose.model('User',userSchema);
export default User;
