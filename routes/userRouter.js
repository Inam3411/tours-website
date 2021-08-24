const express = require('express');
const { showUsers, createUser, showUser, updateUser, deleteUser } = require(`${__dirname}/../controllers/userController`)



const router = express.Router();


router.route('/').get(showUsers).post(createUser);
router.route('/:id').get(showUser).patch(updateUser).delete(deleteUser);

module.exports = router;