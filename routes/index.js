var express = require('express');
var router = express.Router();

// Require our controllers.
var memberController = require('../controllers/memberController');

// GET home page.
router.get('/', (req, res) => {
    res.redirect('/member/all');
    //res.render('members', {filename: null, message: null, error: null})
});

router.get('/home', (req, res) => {
    res.render('index', {filename: null, message: null, error: null})
});

router.get('/about', (req, res) => {
    res.render('about', {filename: null, message: null, error: null})
});

/*
router.get('/member/all', (req, res) => {
    res.render('members', {filename: null, message: null, error: null})
});
*/

router.get('/member/add', (req, res) => {
    res.render('member-create', {filename: null, message: null, error: null})
});

router.post('/member/add/new', memberController.createMember);

router.get('/member/all', memberController.getAllMembers);

router.get('/member/:id', memberController.findOneMember);

router.post('/covid19/form/submit', memberController.formSubmit);

//router.put('/member/:id', memberController.updateMember);

//router.delete('/member/:id', memberController.deleteMember);

//router.delete('/member/all', memberController.deleteAllMembers);









module.exports = router;
