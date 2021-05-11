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
`;

const Launches = () => {
    const {loading, error, data} = useQuery(LAUNCHES_QUERY);
    if (loading) {return <h4>Loading...</h4>;}
    if (error) {console.log("error=", error);}
    //console.log("data=", data);
    
    let filteredLaunches = data.launches;
    const displayLaunches = () => {
        return filteredLaunches.map( lambda_launch => (
            <LaunchItem key={lambda_launch.flight_number} launch={lambda_launch}></LaunchItem> //find out what key is
        )) //key is used to identify/label the items in a list
    };

    return (
        <React.Fragment>
            <h1 className="display-4 my-3"></h1>
            <MissionKey />
        {displayLaunches()}
        </React.Fragment>
    ); // Run or reference react code within {} 
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