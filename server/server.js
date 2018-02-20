const express = require('express');
const mongoose = require('mongoose');

const RestaurantModel = require('../server/models/restaurantModel');

const app = express();
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/test').then(
  () => { console.log('*** Mongoose has connected to Mongodb ***'); },
  err => { console.log('*** There was an error connecting Mongoose to Mongodb ***'); }
);

app.listen(8080, function() {
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('*** Express is listening for traffic on port 8080 (Mongodb) ***');
	});
});

app.get('/test', function (req, res) {
  console.log('*** Express responding to Axios request from front end. ***');
  RestaurantModel.find(function (err, restaurants) {
    if (err) return handleError(err);
    // 'restaurants' contains the list of athletes that match the criteria.
    res.send(restaurants);
  });
});
