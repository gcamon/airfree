'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var SuperSchema = new Schema ({
    name: {
        type: String,
        default: ""
    },

    admin: [{
        type: String,
        ref: 'Admin'
    }],

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


mongoose.model('Super', SuperSchema);