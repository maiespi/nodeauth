var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/nodeauth', {useUnifiedTopology: true, useNewUrlParser: true}); // url of database
var db = mongoose.connection; // variable holds connection to the database
var bcrypt = require('bcryptjs');

// user schea
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

// callbacks are functions that can be passed into another function
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash; // hashes password before it gets saved
            newUser.save(callback);
        });
    });
}