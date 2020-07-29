const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        dropDups: true
    }
}, {
    timestamps:true
});

moongose.exports = moongose.model('user', UserSchema);