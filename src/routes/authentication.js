const express = require('express')
const router = express.Router()

const {login, register} = require('../controllers/authentication');


router.post("/login", login);
router.post("/register", register);
// export const userDataRouter = router.post("/user", getUserDataController);

module.exports = router;