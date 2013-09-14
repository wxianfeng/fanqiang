var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable("users",{
		id: { type: 'int', primarykey: true },
		email: 'string',
		created_at: 'datetime',
		updated_at: 'datetime'
	},callback)
};

exports.down = function(db, callback) {

};
