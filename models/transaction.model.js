'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var TransactionSchema = new Schema ({
    user: {
        type: String,
        ref: "Client"
    },

    referenceId: {
        type: String
    },

    amount: {
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
        ref: "Plan"
    },

    date: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false
    },
    
    user_id: {
        type: String,
        default: ""
    }

})


mongoose.model('Transaction', TransactionSchema);