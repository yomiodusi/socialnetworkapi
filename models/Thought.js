// import Model and Schema
const { Schema, model, trusted } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },

    reactionBody:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
 // let mongoose model that getters is used!
    toJSON: {
        getters: true,
        },
});

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
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
            required: true,
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