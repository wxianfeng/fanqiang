var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.changeColumn('users','id',{
		type: 'int', primarykey: true, autoIncrement: true
	},callback)
};

exports.down = function(db, callback) {

};
