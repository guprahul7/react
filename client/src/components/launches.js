//Launches is where we want to make the query to GraphQL
//We want to use class based components

import React, { Component } from 'react';
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './launchitem';
import MissionKey from './mission_key';

/*The query part is in the render. Creating it here.
query LaunchesQuery is just to label that query
*/
const LAUNCHES_QUERY = gql `
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`; /* 
    using/referencing the launches query (that we defined in schema.js) to make 
    a request to the spaceX api for the data we need. By default, the launches 
    query requests data for all fields we specified in its definition, however 
    here we are only requesting for specific fields that we need 
    */

const Launches = () => {
    const {loading, error, data} = useQuery(LAUNCHES_QUERY);
    if (loading) {return <h4>Loading...</h4>;}
    if (error) {console.log("error=", error);}
    //console.log("data=", data);
    
    let filteredLaunches = data.launches; //launches query of gql - a list of launchType objects
    const displayLaunches = () => {
        return filteredLaunches.map( lambda_launch => (
            <LaunchItem key={lambda_launch.flight_number} prop_launch={lambda_launch}></LaunchItem>
        )) //key is used to identify/label the items in a list. Keys help React identify which items
           //have changed, are added, or are removed
    };

    return (
        <React.Fragment>
            <h1 className="display-4 my-3"></h1>
            <MissionKey />
        {displayLaunches()}
        </React.Fragment>
    ); // ( Note: Run or refer-to react code within {} )
};
    





// function Launches() {
//     const {loading, error, data} = useQuery(LAUNCHES_QUERY);
//     if (loading) {return <h4>Loading...</h4>;}
//     if (error) {console.log("error=", error);}
//     console.log("data=", data);
//     return <h1>test</h1>;
// };

// export class Launches extends Component {
//     render() {
//         return (
//             <div>
//                 <h1 className="display-4 my-3">Launches</h1>
//             </div>
//         )
//     }
// }


export default Launches;