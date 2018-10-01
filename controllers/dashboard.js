'use strict';

const logger = require('../utils/logger');
const folderStore = require('../models/folder-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('Log in = '+ loggedInUser);
    const viewData = {
      title: 'Bookmarks',
      Bookmarks: folderStore.getUserFolder(loggedInUser.id),
        totalfolder: folderStore.getAllFolders(loggedInUser.id),
        Picturetitle: 'PictureStore Dashboard',
        userWithMostFolders: folderStore.postUserWithMostFolder(),
        user: loggedInUser,
        album: pictureStore.getAlbum(loggedInUser.id),
    };
    logger.info('about to render', folderStore.getUserFolder());
      logger.info('about to render', folderStore.getAllFolders());
      response.render('dashboard', viewData);
  },
    deleteFolder(request, response) {
    const folderId = request.params.id;
    logger.debug(`Deleting Folder ${folderId}`);
    folderStore.removeFolder(folderId);
    response.redirect('/dashboard');
  },
    addFolder(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newFolder = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      files: [],
        folder: [],
        pictures: [],
    };
    logger.debug('Creating a new folder',newFolder);
    folderStore.addFolder(newFolder);
    response.redirect('/dashboard');
  },
    uploadPicture(request, response) {
        const folderId = request.params.folderId;
        pictureStore.addPicture(folderId, request.body.Picturetitle, request.files.picture, function () {
            logger.debug('folderid', folderId);
            logger.debug('Folder id = ', folderId);
            response.redirect('/folder/' + folderId);
        });
    },
    deleteAllPictures(request, response) {
        const folderId = request.params.folderId;
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deleteAllPictures(loggedInUser.id);
        response.redirect('/folder/' + folderId);
    },

    deletePicture(request, response) {
        const folderId = request.params.folderId;
        const loggedInUser = accounts.getCurrentUser(request);
        pictureStore.deletePicture(loggedInUser.id, request.query.img);
        response.redirect('/folder/' + folderId);
    },
};

module.exports = dashboard;