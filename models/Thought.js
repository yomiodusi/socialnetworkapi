// import Model and Schema
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({

    reactionBody:{
        type: String,
        required: 'Reaction required',
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: 'Username required',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },

},
{ 
    // let mongoose model that getters is used!
    toJSON: {
     getters: true,
    },
    id: false}
);

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: 'Thought Text Required',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username required',
            trim: true
        },
        reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Create Model
const Thought = model('Thought', ThoughtSchema);

// Export Model
module.exports = Thought;