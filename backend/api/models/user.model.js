import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username : {
        type:String ,
        required: true,
        unique: true,
    },
    email : {
        type:String ,
        required: true,
        unique: true,
    },
    password : {
        type:String ,
        required: true,
    },

   

// to know when the user is created or updated
}, {timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;
