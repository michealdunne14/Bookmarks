'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const folder = require('./controllers/folder.js');
const about = require('./controllers/about.js');
const accounts = require ('./controllers/accounts.js');
const statistics = require ('./controllers/stats.js');

router.get('/main', start.index);
router.get('/dashboard', dashboard.index);
router.get('/stats', statistics.index);
router.get('/folder/:id', folder.index);
router.get('/folder/:id/deletefile/:fileid', folder.deletefile);
router.get('/deletefile/:id', dashboard.deleteFolder);
router.get('/about', about.index);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.post('/dashboard/uploadpicture/:folderId', dashboard.uploadPicture);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/folder/:id/addfile', folder.addfile);
router.post('/dashboard/addfolder', dashboard.addFolder);


module.exports = router;
