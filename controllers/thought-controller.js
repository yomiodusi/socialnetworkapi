const { Thought, User} = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
        Thought.find({})
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
  },
  
    //   GET Thought by ID
  getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // if no User is found, send 404
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "There's no Thought with this ID! Try again.." });
          return;
        }
      res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(
          err,
          "There was an error in getting Thought by ID, Try Again!"
        );
        res.status(400).json(err);
      });
  },

  //   POST create thought and add to User
  createThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { username: body.username },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err));
  },

  //   PUT update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "There's no Thought with this ID! Try again" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err, "There's an error in updating Thought by ID, Try again");
        res.status(400).json(err);
      });
  },



  //   POST Add reaction to Thought 
  createReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err));
  },

  //   DEL delete Thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndDelete(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
    },

    // DEL Remove Reaction from Thought
  deleteReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionsId: params.id } } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No reaction found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;