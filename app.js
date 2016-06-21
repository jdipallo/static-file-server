// Requires \\
var fs 			= require('fs');
var express 	= require('express');
var bodyParser 	= require('body-parser');
var logger 		= require('morgan');
var fileContents;

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// read file into fileContents so we can send it back to the client
// fileContents = fs.readFileSync('data.txt');

// Routes \\
app.get('/', function(req, res){
	// fs.readFile('data.txt', function(err, data) {
	// 	if (err) throw err;
	// 	res.header('Content-Type', 'text/html');
	//   	res.send(data);
	// });
	res.send("Dude! Home Page!");
});

app.get('/:filename', function(req, res) {
	fileContents = req.params.filename;	

	fs.readFile("./public/" + fileContents, function(err, data) {
		if (err) {
			// res.send("File Does Not Exist");
			console.log("File Does not Exist: ./public", fileContents);
			res.redirect('no-file-error.html');
			// throw err;
		} 
		else {
			res.header('Content-Type', 'text/html');
		  	res.send(data);
	  	}
	});
});

// Creating Server and Listening for Connections \\
var port = process.env.PORT || 3030

app.listen(port, function(){
  console.log('Server running on port ' + port);
})