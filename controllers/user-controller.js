const { User} = require('../models');

const userController = {
  getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
        //   .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
      //   GET User by ID
  getUserById({ params }, res) {
     User.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .then((dbUserData) => {
        // if no User is found, send 404
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "There's no user with this ID! Try again.." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(
          err,
          "There was an error in getting User by ID, Try Again!"
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



module.exports = userController;