const express = require('express');
const {isAdmin} = require('../isAmin.middleware');
const {getAllUsers} = require('../user.controller');

const router= express.Router();

router.user(isAdmin);
router.get('/', getAllUsers);
// routrer.path('/',diableUser );


module.exports= router;