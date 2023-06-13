const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateUser } = require('../middlewares/userMiddleware');

router.get('/user', authenticateToken, userController.getUser);
router.get('/users', authenticateToken, userController.getUsers);
router.get('/user/readcount', authenticateToken, userController.getUserReadCount);
router.post('/users', validateUser, userController.createUser);
router.patch('/users', authenticateToken, userController.updateUser);
router.delete('/users', authenticateToken, userController.deleteUser);

module.exports = router;
