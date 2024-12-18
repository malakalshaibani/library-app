import mongoose, { Types } from "mongoose";

const UserSchema = mongoose.Schema({
    name :{type:String, required:true},
    email :{type:String, required:true,unique:true},
    password  :{type:String, required:true},
    confirmPassword : {type:String, required:true},
})

const UserModel = mongoose.model("Book", UserSchema);
export default UserModel;