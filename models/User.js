// import model
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
 // let mongoose model that virtuals is used!
    toJSON: {
        virtuals: true,
        },
        id: false,
});

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// create Model
const User = model("User", userSchema);
// export
module.exports = User;