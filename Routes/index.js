"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});
router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.post('/login', function (req, res, next) {
    res.render('index', { title: 'Contact List', page: 'contact-list', displayName: req.body.username });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    res.render('index', { title: 'Contact List', page: 'contact-list', displayName: 'temp' });
});
router.get('/logout', function (req, res, next) {
    res.render('index', { title: 'Logout', page: 'logout', displayName: '' });
});
module.exports = router;
//# sourceMappingURL=index.js.map