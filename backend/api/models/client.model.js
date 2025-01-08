import mongoose from 'mongoose';


const clientSchema = new mongoose.Schema({
    name : {
        type:String ,
        required: true,
    },
    email : {
        type:String ,
        required: true,
        unique: true,
    },
    address : {
        type:String ,
        required: true,
    },
    phoneNumber : {
        type:String ,
        required: true,
    },
    inscriptionDate : {
        type:String ,
        required: true,
    },
    category : {
        type:String ,
        default:"uncategorized",
        required: true,
    },

   

// to know when the user is created or updated
}, {timestamps:true})

const Client = mongoose.model('Client', clientSchema);
export default Client;
