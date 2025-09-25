const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    phone: {
        type: Number,
        
    },
    image: {
        type: String ,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;