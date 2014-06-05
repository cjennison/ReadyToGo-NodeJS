var express = require('express'), http = require('http');

var app = express();

var enableCORS = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://felek.cns.umass.edu:8080');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

app.configure(function() {
	app.set('views', __dirname + '/views');
	console.log(__dirname);
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session({
		secret : 'streams'
	}));
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
	app.use(enableCORS);
});

app.get('/', function(req, res) {
	res.render('index.ejs');
});

var server = app.listen(1992, function() {
	console.log('[Chris] Listening on port %d', server.address().port);
})
