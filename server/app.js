const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
var cache = {};

// http://localhost:3000/?t=baby%20driver
// http://localhost:3000/?i=tt3896198

app.get( '/', ( req, res ) => {
	console.log( req );
	var type = "";
	var movieId = "";
	var url = "http://www.omdbapi.com/?";
	var apikey = "8730e0e";
	if( req.query.i ){
		movieId = req.query.i;
		url += `i=${req.query.i}&apikey=${apikey}`;
	}
	else if( req.query.t ){
		movieId = req.query.t;
		url += `t=${req.query.t}&apikey=${apikey}`;
	}
	
	console.log( url );
	
	if( cache[movieId] ){
		console.log( 'Movie in cache' );
		return res.send( cache[ movieId ] ); // status(200)
	}
	
	axios
		.get( encodeURI( url  ) )
		.then( response => {
			cache[ movieId ] = response.data;
			return res.send( cache[ movieId ] ); // 'status' is not a function
	})
	.catch( (err) => {
		console.log( err );
		res.send( err );
	});
});

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;

// WebServer
	// Characteristics
		// Respond to GET requests
		// Returns data from OMDb API
			// OMDb API: 
			// Store data in object
				// Later: hash table
		// If repeated request, returns data from storage
	// Procedure
		// Check URL parameters using req.query for 'i' or 't'
		// Craft HTTP request to OMDb using axios
		// Cache movie data using object
			// Later: Hash Table
		// Log all incoming requests using the 'morgan' library

// Questions
	// Use JSON?
	// API key
	// Name new object properties based on data property keys?
	// 
