// imports
const User = require('../model/user-model-9');

// get all of the users
function getUsers(req, res) {
	const query = User.find({});
	query.exec((err, users) => {
		if(err) res.send(err);
		res.json(users);
	});
}

// add a new user
function postUser(req, res) {
	const newUser = new User(req.body);
	newUser.save((err,user) => {
		if(err) {
			res.send(err);
		}
		else { 
			res.json({message: "User successfully added!", user });
		}
	});
}

// retrieve the user
function getUser(req, res) {
	User.findById(req.params.id, (err, user) => {
		if(err) res.send(err);
		res.json(user);
	});		
}

// update the user
function updateUser(req, res) {
	User.findById({_id: req.params.id}, (err, user) => {
		if(err) res.send(err);
		Object.assign(user, req.body).save((err, user) => {
			if(err) res.send(err);
			res.json({ message: 'User updated!', user });
		});	
	});
}

// delete the user
function deleteUser(req, res) {
	User.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "User successfully deleted!", result });
	});
}

//export all the functions
module.exports = { getUsers, getUser, updateUser, postUser,  deleteUser };
