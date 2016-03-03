var express =require('express');
var userController =require('../controllers/userController');
var accountController = require('../controllers/accountController');
var router =express.Router();
var auth =require('../security/auth');

router.post('/users',auth.authorize,userController.create);
router.get('/users',auth.authorize,userController.get);
router.get('/users/:id',auth.authorize,userController.getById);
router.put('/users/:id',auth.isAdmin,userController.update);
router.delete('/users/:id', auth.isAdmin,userController.remove);

//Account
router.post('/login', accountController.authenticate);

module.exports= router;