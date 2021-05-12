import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql `
query LaunchQuery($f_number_variable: Int!) {
    launch(f_number: $f_number_variable) {
        flight_number
        mission_name
        launch_year
        launch_success
        launch_date_local
        rocket {
            rocket_id,
            rocket_name,
            rocket_type
        }
    }
}
`;

const Launch = (props) => {
    let { f_number_url } = props.match.params; //a matching parameter (:f_number_url) is referenced in app.js
    f_number_url = parseInt(f_number_url); //defaults to a string in the url, so need to convert to int
    //console.log("f_number_url=", f_number_url);
    const { loading, error, data } = useQuery(
                                        LAUNCH_QUERY, 
                                        { variables: { f_number_variable: f_number_url } }
                                    ); 
    /*  gql helps us avoid the following redundancy -> variables: { f_number_variable: f_number_variable }
        by letting us simply do this -> variables: { f_number_variable } provided f_number_variable 
        is already assigned a value. Kind of like implicit assignation.
    */

    const displayLaunch = () => {
        if (loading) return <h4>Loading...</h4>;
        if (error) console.log(error);

        const { flight_number, 
                mission_name, 
                launch_success, 
                launch_year, 
                launch_date_local, 
                rocket } = data.launch; //launch endpt/query of gql

        return (
            <div>
                <h1 className="display-4 my-3">
                    <span className="text-light">Mission:</span> {mission_name}
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                    <li className="list-group-item">Flight Number: {flight_number}</li>
                    <li className="list-group-item">
                        LaunchYear: <Moment format="YYYY">{launch_date_local}</Moment>
                    </li>
                    <li className="list-group-item">
                        Launch Successful: 
                        <span className={classNames({
                            'text-success': launch_success,
                            'text-danger': !launch_success
                            })}> 
                        {launch_success ? 'Yes' : 'No'}
                        </span>
                    </li>
                </ul>
                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                    <li className="group-list-item">Rocket ID: {rocket.id}</li>
                    <li className="group-list-item">Rocket Name: {rocket.name}</li>
                    <li className="group-list-item">Rocket Type: {rocket.type}</li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">Back</Link>
            </div>
        );
    };

    return <React.Fragment>{displayLaunch()}</React.Fragment>;
};


export default Launch;