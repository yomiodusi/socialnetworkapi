const { Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
          Thought.find({})
            .populate({
              path: 'thoughts',
              select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
      },
        //   GET Thought by ID
    getThoughtById({ params }, res) {
       Thought.findOne({ _id: params.thoughtId })
        .populate({ path: "thoughts", select: "-__v" })
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
  
    //   POST create User
    createUser({ body }, res) {
      User.create(body)
        .then((dbUserData) => {
          res.json(dbUserData);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },
  
    //   PUT update User by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbUserData) => {
          if (!dbUserData) {
            res
              .status(404)
              .json({ message: "There's no User  with this ID! Try again" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err, "There's an error in updating User by ID, Try again");
          res.status(400).json(err);
        });
    },
    //   DEL delete update User by id
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            res
              .status(404)
              .json({ message: "There's no User found with this ID." });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err, "There's an error in Deleting User, Try Again");
          res.status(400).json(err);
        });
    },
  };

  module.exports = thoughtController;