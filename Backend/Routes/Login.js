const express = require('express');
const router = express.Router();

const { userLogin, getAll, addUser, updateUser, deleteUser } = require('../Controllers/LoginController');

router.post('/userLogin', userLogin);

router.get('/users',getAll);
router.post('/newUser',addUser);
router.patch('/update/:email', updateUser);
router.delete('/delete/:email', deleteUser);

module.exports = router;
