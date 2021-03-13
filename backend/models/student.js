const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    firstName: String,
    lastName: String,
    grade: Number,
    username: String,
    userPass: String
});

module.exports = { Student };