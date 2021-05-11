import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql `
query LaunchQuery($flight_number: String!) {
    launch(flight_number: $flight_number) {
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
    const { flight_number } = props.match.params;
    const { loading, error, data } = useQuery(
                                        LAUNCH_QUERY, 
                                        { variables: {flight_number} }
                                    );

    const displayLaunch = () => {
        if (loading) return <h4>Loading...</h4>;
        if (error) console.log(error);

    const { flight_number, mission_name, launch_success, launch_year, launch_date_local, rocket } = data.launch;

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