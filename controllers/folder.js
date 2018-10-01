'use strict';

const logger = require('../utils/logger');
const folderStore = require('../models/folder-store');
const dash = require('../models/picture-store');

const folder = {
    addfile(request, response) {
    const folderId = request.params.id;
    const folder = folderStore.getFolder(folderId);
    const uuid = require('uuid');
  const newfile = {
    id: uuid(),
    title: request.body.title,
    site: request.body.site,
    link: request.body.link,
  };
    folderStore.addfile(folderId, newfile);
    response.redirect('/folder/' + folderId);
  },
  index(request, response) {
    const folderId = request.params.id;
    const d = dash;
    logger.debug('Folder id = ', folderId);
    const viewData = {
      title: 'Folder',
      folderId: folderId,
      folder: folderStore.getFolder(folderId),
        pictures: d.getAlbum(folderId)
    };
    logger.info("pictures = ",viewData.pictures);
    response.render('folder', viewData);
  },

  deletefile(request, response) {
    const folderId = request.params.id;
    const fileId = request.params.fileid;
    logger.debug(`Deleting file ${fileId} from Folder ${folderId}`);
    folderStore.removefile(folderId, fileId);
    response.redirect('/folder/' + folderId);
  },

};

module.exports = folder;
