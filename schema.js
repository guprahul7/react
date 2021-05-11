
/* 
This is where all of our graphQL stuff is gonna be
There's a lot of different types that we can use with GQL, for eg.
    - GraphQLObjectType (in this project - launches, rockets will be object types)
    - If creating a blog - then users, posts will be object types
*/

//const GraphQLObjectType = require('graphql'); //kind of like importing libraries
const {
        GraphQLObjectType, 
        GraphQLInt, 
        GraphQLString, 
        GraphQLBoolean,
        GraphQLList,
        GraphQLSchema
    } = require('graphql');

const axios = require('axios');

/*  
The spaceX API give us certain data when we make the request to that API, hence
    we are trying to match that data in a similar format that the API gives us
We are making a GET request to this endpoint: https://api.spacexdata.com/v3/launches
*/

// For this app/project, we're gonna make 2 object types
// 1)Launches 2)Rockets

// creating the Launch type object (we add k-v pairs to 'map' our object with related info, starting with name key)
// fields here is basically a (arrow) function that is used in the mapping of data from the RootQuery (from the spaceX API)
const LaunchType = new GraphQLObjectType({
    name: 'Launch',     // name of the object
    fields: () => ({    // fields will contain more k-v pairs; these k-v pairs are chosen to
                        // map data fields corresponding to the spaceX API where we're reading data from
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType} //RocketType is another object we will create
    })
})

// creating the Rocket Type Object
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString}, //rocketID is actually a string in the spaceX API
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});



//Root Query - kinda like endpoints, that have resolvers, that will resolve our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {   //fields here is just an object
        launches: { // launches is a list/array of all launch info (launchTypes)
            type: new GraphQLList(LaunchType), //a list of LaunchType elements
            //Resolver
            resolve(parent, args) {
                //inside here is where we get our data; ours is a 3rd party api, so we need to make a request to get that data
                // .get() gives us a promise back, so we do .then() to map this data in the corresponding fields we created in our objects
                return axios.get('https://api.spacexdata.com/v3/launches').then(res => res.data); 
                // can use fetch, or superagent instead of axios as well for making requests
            }
        },
        launch: {
            type: LaunchType,
            args: { //args is to provide an argument in the .get() request to look for data with that argument
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res => res.data);
                //here we want info of a particular flight number
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets').then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                r_id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.r_id}`).then(res => res.data);
            }
        }
    }
});

//Last step is to export our data (a GraphQLSchema)
module.exports = new GraphQLSchema({
    query: RootQuery
});