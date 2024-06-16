const express = require('express')
const { create_user, login_user, get_users, get_user_by_id, delete_user_by_id } = require('../controllers/user')

const router = express.Router();


router.post('/create/v1', create_user);
router.post('/login/v1', login_user)
router.get('/get/:id/v1', get_user_by_id);
router.get('/get/v1', get_users);
router.delete('/delete/:id/v1', delete_user_by_id);

module.exports = router;