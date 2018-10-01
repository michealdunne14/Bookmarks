'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const folderStore = {

  store: new JsonStore('./models/folder-store.json', { folderCollection: [] }),
  collection: 'folderCollection',
  getAllFolders() {

    return this.store.findAll(this.collection);
  },

  getFolder(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
    getUserFolder(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addFolder(folder) {
    this.store.add(this.collection, folder);
  },
  removeFolder(id) {
    const folder = this.getFolder(id);
    this.store.remove(this.collection, folder);
  },

  removeAllFolders() {
    this.store.removeAll(this.collection);
  },

  addfile(id, file) {
    const folder = this.getFolder(id);
    folder.files.push(file);
  },

  removefile(id, fileId) {
    const folder = this.getFolder(id);
    const files = folder.files;
    _.remove(files, { id: fileId});
  },
    //Total links in folders
    postTotalNumberOfFiles() {
        const collection = this.getAllFolders();
        let total = 0;
        for (let i=0; i< collection.length; i++) {
            total = total + collection[i].files.length;
        }
        return total;
    },
    postUserWithMostFolder() {
       const collection = this.getAllFolders();
       let index;
       let max = collection.length;

       for(index = 0;index < collection;index++)
       {
            if (collection[index] > max)
            {
              max = collection.length
            }

       }
       return max
    },
    averageBookmarks(){
        const average = this.getUserFolder;
        let sum = 0;
        for (let i = 0;i<average.length;i++){
            sum += average[i];
        }
        let avg = sum/average.length;
        return avg;
    }
};

module.exports = folderStore;