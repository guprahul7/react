
//Set up requests, routes etc... //like imports
const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
/* ^ uses destructuring equivalent to: const graphqlHTTP = require('express-graphql').graphqlHTTP;
Note: require('express-graphql') returns an object with a property called graphqlHTTP that is the function you want to call.
You're trying to call the object itself as if it was a function.
*/
const schema = require('./schema'); //we have to create this file <schema.js> and this is where graphql stuff is gonna be
const path = require('path'); //path is a nodejs module to work with file paths

// Allow cross-origin - to fix error of CORS when we fact that in the browser/inspect
const cors = require('cors');


//Below is the ES6 version for the above set up
// import express from 'express';
// import graphqlHTTP from 'express-graphql';
// import schema from './schema';

const app = express();
/*
If you've worked with Express - you usually create different routes 
to (for eg.) - show blog posts, or a post route to update blog posts
*/


// Allow cross-origin
app.use(cors());

/*
With GQL and Express we only have one endpoint (/graphql) that's gonna run graphqlHTTP,
from there we create a schema (a schema file) to do querying, mutations, add, update...etc
graphiql - tool that we can use as our client to make queries to our server

fyi: schema is a keyword that requires a schema name, but if you leave it as "schema", it treats that as the default name
*/ 
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //when we do /graphql in browser, it lets us access this grapql functions
  })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

//Listen on a certain port
const PORT = process.env.PORT || 5000; //if we deploy (eg. on heroku)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));