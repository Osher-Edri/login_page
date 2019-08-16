var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_pass",
    database: "your_db_name"
  });

  con.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected...");
  });

// se
function searchName(name){
    con.query("SELECT * FROM login WHERE user_name='"+name+"'", function (err, result, fields) {
        if (err) throw err;
    });
}

//the function insert the username, passwort into table login 
function insertData(username, password){
    var q = "INSERT INTO login (user_name, password) VALUES ('"+username+"', '"+password+"')";
    con.query(q, function (err, result, fields) {
        if (err) throw err;
        console.log('succes');
    });
}

