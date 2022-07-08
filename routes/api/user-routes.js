const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser);

module.exports = router;
