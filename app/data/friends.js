const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "friendFinder_db"
});

let dbServer = {
  selectFrom: (val,res) => {
    pool.getConnection((err, con) => {
      if (err) throw err;
      con.query(`SELECT ${val} FROM people`, (err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  },
  createTable: (name, url, scores) => {
    pool.getConnection((err, con) => {
        con.query(
            `INSERT INTO people SET ?`,
            {
              person_name: name,
              photo: url,
              scores: scores
            },
            (err, resp) => {
              if (err) throw err;
              console.log("column set!");
            }
          );
    });
  },
  endConnnect: () => {
    con.end();
  }
};

module.exports = dbServer;
