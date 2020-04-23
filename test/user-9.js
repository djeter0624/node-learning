// imports
const User = require('../model/user-model-9');
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server-9');

// use chai
chai.use(chaiHttp);

// parent block
describe('Users', () => {
	beforeEach((done) => { 
		User.remove({}, (err) => { 
		   done();		   
		});		
	});

    // test get
  describe('/GET user', () => {
	  it('it should GET all the users', (done) => {
			chai.request(server)
		    .get('/user')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
  
  // test get negative
 describe('/GET user', () => {
    it('it should GET all the users', (done) => {
          chai.request(server)
          .get('/user')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            done();
          });
    });
});

    // test post negative
    describe('/POST user', () => {
	  it('it should not POST a user without the age', (done) => {
        const user = {
	  		name: "Stella Kidd",
	  		address: "555 Firefighter Fields",
	  		year: 2020
	  	}
			chai.request(server)
		    .post('/user')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('age');
			  	res.body.errors.age.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a new user ', (done) => {
        const user = {
	  		name: "TinkerBelle",
	  		address: "123 Fairy Lane",
	  		year: 2019,
	  		age: 12
	  	}
			chai.request(server)
		    .post('/user')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('User successfully added!');
			  	res.body.user.should.have.property('name');
			  	res.body.user.should.have.property('address');
			  	res.body.user.should.have.property('age');
			  	res.body.user.should.have.property('year');
		      done();
		    });
	  });
  });

  // test get specific user
  describe('/GET/:id user', () => {
	  it('it should GET a user by the given id', (done) => {
        const user = new User({ name: "Vincent Keller", address: "222 Bee Blvd", year: 2018, age: 29 });
	  	user.save((err, user) => {
	  		chai.request(server)
		    .get('/user/' + user.id)
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('address');
			  	res.body.should.have.property('age');
			  	res.body.should.have.property('year');
			  	res.body.should.have.property('_id').eql(user.id);
		      done();
		    });
	  	});
			
	  });
  });
 
  // test put to update a specific user
  describe('/PUT/:id user', () => {
	  it('it should UPDATE a user given the id', (done) => {
        const user = new User({name: "Marry Lu", address: "546 Oldies Ave", year: 2017, age: 78})
	  	user.save((err, user) => {
				chai.request(server)
			    .put('/user/' + user.id)
			    .send({name: "Lisa Mosbey", address: "789 Hotel Place", year: 2020, age: 66})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('User updated!');
				  	res.body.user.should.have.property('year').eql(2019);
			      done();
			    });
		  });
	  });
  });
 
  // test delete a specific user
  describe('/DELETE/:id user', () => {
	  it('it should DELETE a user given the id', (done) => {
        const user = new User({name: "Daisy Chains", address: "645 Rose Way", year: 2017, age: 8})
	  	user.save((err, user) => {
				chai.request(server)
			    .delete('/user/' + user.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('User successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
  
