'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * MyBus Schema
 */
var MyBusSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    bus_id: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
// MyBusSchema.path('id').validate(function(id) {
//     return id.length;
// }, 'Title cannot be blank');

/**
 * Statics
 */
MyBusSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('MyBus', MyBusSchema);
