'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var UserSchema = new Schema ({
    name: {
        type: String,
        default: ""
    },

    role: {
        type: String
    },

    id: {
        type: String
    },

    password: {
        type: String
    },

    phone: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    city: {
        type: String,
    },

   
    address: {
        type: String,
        default: ""
    },

    created: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false
    },

    

})


mongoose.model('User', UserSchema);