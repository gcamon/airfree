'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var TransactionSchema = new Schema ({
    name: {
        type: String,
        default: ""
    },

    referenceId: {
        type: String
    },

    Amount: {
        type: Number,
        default: 0
    },

    email: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    plan: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false
    },


})


mongoose.model('Transaction', TransactionSchema);