
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var user = require('./routes/user');
 var http = require('http');
 var path = require('path');
 var mysql = require('mysql');
 var dns = require('dns');
 var nodemailer = require("nodemailer");
 var _ = require("underscore");
 var config = require('./config/config')

 var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database: "fanqiang_development"
});

connection.connect();

// smtp options: https://github.com/andris9/Nodemailer#setting-up-smtp
var smtpTransport = nodemailer.createTransport("SMTP",{
	host: config.mail.host,
	auth: {
		user: config.mail.user,
		pass: config.mail.password
	}
});

var mailOptions = {
	from: config.mail.from,
	to: config.mail.to,
	subject: "Hey,少年,有人要买VPN啦"
};

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users', function(req, res){
	var email = req.param('email');
	var domain = email.split('@')[1];
	dns.resolve(domain,'MX',function(err, address){
		if (err)
			res.send({ retCode:0, error: '啊哦,小伙伴,该邮件地址没有找到邮件服务器.' })
		else {
			connection.query("select * from users where email = ?", [email] ,function(err, result){
				if (result && result.length > 0){
					res.send({ retCode: 0, error: '啊哦,小伙伴,请不要重复申请.' });
				}else{
					var sql = "insert into users set ?"
					var data = { email: email, created_at: new Date() };
					connection.query(sql,data,function(err, result){
						if (!err){
							smtpTransport.sendMail(_.extend(mailOptions,{ text: "申请人的email:" + email }));
							res.send({ retCode: 1 });
						}
					});
				}
			});
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
