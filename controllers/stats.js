'use strict';

const logger = require('../utils/logger');
const store = require('../models/folder-store');
const uuid = require('uuid');
const accounts = require('./accounts');

const statistics = {
  index(request, response) {
    logger.info('about rendering');
      const bookmarkCollections = store.getAllFolders();
      let totalBookmarks = 0;
      for (let i = 0; i < bookmarkCollections.length; i++) {
          totalBookmarks = totalBookmarks + bookmarkCollections[i].files.length;
      }
    const viewData = {
      title: 'Statictics',
        liststat: store.postTotalNumberOfFiles(),
        totalCollections: bookmarkCollections.length,
        userFolders: store.getUserFolder(accounts.getCurrentUser(request).id).length,
        largestFolders: store.postUserWithMostFolder(accounts.getCurrentUser(request).title),
        average: store.averageBookmarks(accounts.getCurrentUser(request).id)

    };
    response.render('stats', viewData);
  },

};

module.exports = statistics;