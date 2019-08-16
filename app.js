var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var client = require('./client');

var app = express();

// Create connecion do DB
var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "osher6852",
   database: "parking_system"
 });

//trow err conecction
 con.connect((err) => {
   if(err){
       throw err;
   }
   console.log("MySql connected...");
 });

// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.listen(3000);

// templet engine ejs (not in used)
app.set('view engine' + 'ejs');

app.use(session({secret: 'secret', resave: true, saveUninitialized: true }));
//Loading static files like CSS ...
app.use('/public', express.static('public'));
// body-parser 
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser json 
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());

app.get('/', function(req, res){
   res.sendFile(__dirname + "/loginIndex.html"); 
});

app.get('/client', function(req, res){
	res.sendFile(__dirname + "/client.html"); 
});

// if we go to index2 will upload intex2.html (if the username or password wrong it sent as 'Please login to view this page!')
app.get('/client', function(req, res) {
	if (req.session.loggedin) {
      // response.send('Welcome back, ' + request.session.user_name + '!');
      res.sendFile(__dirname + "/client.html");
	} 
	else {
		res.send('Please login to view this page!');
	}
//	res.end();
});

//post from form
app.post('/',  function (req, res) {
  var username = req.body.userName;
	var password = req.body.password;

	if (username && password) {
		con.query('SELECT * FROM login WHERE user_name = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.user_name = username;
        res.redirect('/client');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
 });

app.post('/client', function(req, res){
	var name = req.body.insert_name;
	var pass = req.body.insert_password;
		if(name && pass){
			con.query("SELECT * FROM login WHERE user_name='"+name+"'", function (err, result, fields) {
				//if > 0 user name already exists
				if(result.length > 0){
					confirm('user name exists');
				}
		
			});
		}
});



