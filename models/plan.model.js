'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var PlanSchema = new Schema ({
    name: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },
    
    price: {
        type: Number,
        default: 0
    },

    description: {
        type: String, //eg silver
        default: ""
    },

    gigabyte: {
        type: Number,
        default: 1
    },

    description: {
        type: String, //eg silver
        default: ""
    },

    rate: {
        type: String, //eg silver
        default: ""
    },

    speed: {
        type: String,
        default: ""
    },

    intallation_fee: {
        type: Number,
        default: 0
    },

    service_charge: {
        type: Number,
        default: 0
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


mongoose.model('Plan', PlanSchema);