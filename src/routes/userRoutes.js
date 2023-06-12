const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.delete('/users', userController.deleteUser);

module.exports = router;
