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

    transactions: [{
        type: String,
        ref: 'Transaction'
    }],

    email: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: "Nigeria"
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


mongoose.model('Admin', AdminSchema);