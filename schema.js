
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

const axios = require('axios'); // can also use fetch, or superagent instead of axios for making requests


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
                        // map data fields corresponding to the spaceX API response where we're reading data from
                        // the fields below have the same names as the spaceX API data response
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        // launch_date_unix: {type: GraphQLInt}, // another data field in spaceX API response, but we aren't using it
        rocket: {type: RocketType} //RocketType is another object we have created below
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
    fields: {
        /*
        fields here is an object that contains the different "queries/sub-queries" that we will be calling in our application.
        we can think of it as declaring several endpoints (queries) for each use case within the application
        */
        
        // launches query is used/referenced in launches.js to get the list of launches
        launches: { // the response is a list/array of all launchType objects (we want all launch info)
            type: new GraphQLList(LaunchType), //creates a list of LaunchType objects
            //Resolver
            resolve(parent, args) {
                // inside here is where we get our data; since we're using a 3rd party api, we need to make a request to get that data
                // .get() returns some obj/data -> this obj/data should map compatibly with the objects/data-fields that we have defined/created
                // .get() gives us a promise back, so we do .then() to map this data to the corresponding objects/fields we created
                return axios.get('https://api.spacexdata.com/v3/launches').then(res => res.data);
                
            }
        },

        // launch query is used in launch.js when we are fetching data of a specific launch
        launch: {
            type: LaunchType,
            args: { //args is to provide an argument for the .get() request to look for data with that specific argument
                    // we can verify/run this in the graphql server to see the results when we query launch
                f_number: {type: GraphQLInt} // declaring this argument to run gql query for specific flight id
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.f_number}`).then(res => res.data);
                //here we want info of a particular flight number
            }
        },

        // rockets query
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets').then(res => res.data);
            }
        },

        // rocket query
        rocket: {
            type: RocketType,
            args: {
                r_id: {type: GraphQLString} //declare an argument to run gql query for a specific rocket id
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