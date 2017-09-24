var Task = require("../models/Task");
var Promise = require("bluebird");

module.exports = {
  get: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      const filters = {
        sort: {
          timestamp: -1
        }
      };

      Task.find(params, null, filters, (err, tasks) => {
        if (err) {
          reject(err);
          return;
        }

        if (isRaw) {
          resolve(tasks);
        } else {
          let list = [];
          tasks.forEach(task => {
            list.push(task.summary());
          });
          resolve(list);
        }
      });
    });
  },

  getById: (id, isRaw) => {
    return new Promise((resolve, reject) => {
      Task.findById(id, (err, task) => {
        if (err) {
          reject(err);
          return;
        }

        if (isRaw) {
          resolve(task);
        } else {
          resolve(task.summary());
        }
      });
    });
  },

  post: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      Task.create(params, (err, task) => {
        if (err) {
          reject(err);
          return;
        }
        if (isRaw) {
          resolve(task);
        } else {
          resolve(task.summary());
        }
      });
    });
  }
};
