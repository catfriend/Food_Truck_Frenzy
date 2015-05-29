var express = require('express');
var mongoose = require('mongoose');
//var bodyParser = require('body-parser');
var Truck = require('../models/truckModel');

var router = express.Router();

router.route('/')

	.get(function (request, response) {
		Truck.find(function (error, trucks) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.send(trucks);
			}
		});
	})

	.post(function (request, response) {
		var newTruck = new Truck(request.body);

		newTruck.save(function (error, truck) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.status(201).send(newTruck);
			}
		});
	});

router.route('/:id')
.all(function (request, response, next) {

	Truck.findById(request.params.id, function (error, truck) {
		if (error) {
			response.status(500).send(error);
		} else {
			request.foundTruck = truck;
			next();
		}
	});
})
.get(function (request, response) {
	var retTruck = {};
	if (request.foundTruck) {
		retTruck = request.foundTruck;
		response.send(retTruck);
	} else {
		response.send({});
	}
})

	.delete(function (request, response) {
	if (request.foundTruck) {
		request.foundTruck.remove(function (error) {
			if (error) {
				response.status(500).send(error);
			} else {
				response.sendStatus(200);
			}
		});
	}
});


module.exports = router;