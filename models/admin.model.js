'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var AdminSchema = new Schema ({
    name: {
        type: String,
        default: ""
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

    country: {
        type: String,
        default: "Nigeria"
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


mongoose.model('Admin', AdminSchema);