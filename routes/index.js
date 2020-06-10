var express = require('express');
var router = express.Router();

// Require our controllers.
var memberController = require('../controllers/memberController');

// GET home page.
router.get('/', (req, res) => {
    res.render('members', {filename: null, message: null, error: null})
});

router.get('/home', (req, res) => {
    res.render('index', {filename: null, message: null, error: null})
});

router.get('/about', (req, res) => {
    res.render('about', {filename: null, message: null, error: null})
});

router.get('/members', (req, res) => {
    res.render('members', {filename: null, message: null, error: null})
});

router.get('/member/add', (req, res) => {
    res.render('member-create', {filename: null, message: null, error: null})
});

router.post('/member/add/new', memberController.createMember);

router.get('/member/all', memberController.getAllMembers);

//router.post('/covid19/submit', fileController.saveInfoToDb);

//router.get('/member/:id', memberController.getMemberById);



//router.delete('/member/:id', memberController.deleteMemberById);

//router.put('/member/:id', memberController.updateMember);

module.exports = router;
