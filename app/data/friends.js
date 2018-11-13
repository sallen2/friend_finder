const mysql = require("mysql");

// connecting to Amazon Web Services RDS
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "friendFinder_db"
});

let dbServer = {
  selectFrom: val => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) throw err;
        con.query(`SELECT ${val} FROM people`, (err, resp) => {
          if (err) reject(err);
          resolve(resp);
        });
      });
    });
  },
  selectWhere: user => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) throw err;
        con.query(
          "SELECT * FROM people WHERE ?",
          { person_name: user },
          (err, resp) => {
            if (err) reject(err);
            resolve(resp);
          }
        );
      });
    });
  },
  createColumn: (name, url, scores) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        con.query(
          `INSERT INTO people SET ?`,
          {
            person_name: name,
            photoUrl: url,
            scores: scores
          },
          (err, resp) => {
            if (err) reject(err);
            resolve("column set!");
          }
        );
      });
    });
  },
  sendCompatibleFriends: user => {
    return new Promise((resolve, reject) => {
      dbServer.selectWhere(user).then(res => {
        dbServer
          .findFriends(res)
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            if (err) throw err;
          });
      });
    });
  },
  findFriends: user => {
    return new Promise((resolve, reject) => {
      let client = user[0]
      dbServer.selectFrom('*')
      .then(res=>{
        let arr = []
        res.forEach(person=>{
          if(client.person_name === person.person_name){
            // 
          }else{
            let num = 0;
            let cUser = client.scores.replace(/'+/g,"").split(",")
            let pFriend = person.scores.replace(/'+/g,"").split(",")
            for(let i = 0; i < pFriend.length; i++){
              if(cUser[i] === pFriend[i]){
                num++
                if(num >= 3){
                  arr.push(person)
                  break;
                }
              }
            }
          }
          resolve(arr)
        })
      })
    });
  }
};

module.exports = dbServer;
