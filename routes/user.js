/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.create = function(req, res){
	console.log(req.body);
	connection.query('SELECT 1', function(err, rows) {
  // connected! (unless `err` is set)
	});
	res.send(req.body);
};
