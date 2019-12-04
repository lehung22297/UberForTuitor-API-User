var mysql = require("mysql");

var createConnection = () => {
  return mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "QBKjDHhoFF",
    password: "C5f6HMl1wA",
    database: "QBKjDHhoFF"
  });
};

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connections = createConnection();
      connections.connect();
      connections.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connections.end();
      });
    });
  },
  
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {
      var id = entity[idField];
      delete entity[idField];

      var sql = `update ${tableName} set ? where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, [entity, id], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var sql = `delete from ${tableName} where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, id, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },
};
