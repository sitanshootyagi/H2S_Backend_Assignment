const mongoose = require('mongoose');
const Schema = mongoose.Schema


const Userschema = new Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },

},
    { timestamps: true, toJSON: true });

const User = mongoose.model("User", Userschema, "User")
module.exports = User; 