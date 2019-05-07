'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var ClientSchema = new Schema ({
    name: {
        type: String,
        default: ""
    },

    transactions: [{
        type: String,
        ref: 'Transaction'
    }],

    country: {
        type: String,
        default: "Nigeria"
    },

    phone: {
        type: String,
        default: ""
    },

    rc_number: {
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

    accountType: {
        type: String,
        default: "normal"
    },

    created: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false
    },

    balance: {
        type: Number,
        default: 0
    }

})


mongoose.model('Client', ClientSchema);