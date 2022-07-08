const router = require('express').Router();
const thoughtRoutes = require('./thought-routes.js');
const userRoutes = require('./user-routes');

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

module.exports = router;