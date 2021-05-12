import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment'; //we used this pkg to format the date
import { Link } from 'react-router-dom'; //in router, we use sth. called Link instead of an a-tag

/*  LaunchItem is the skeleton/component of each "launch item" on the homepage
    It is used in conjunction with the launches list built in launches.js
*/
export default function LaunchItem(props) {
    console.log(props.prop_launch)
        
    //For step-by-step live changes view, add code while watching on the browser
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>Mission:
                        <span className={classNames({ 
                            'text-success': props.prop_launch.launch_success, //text-success and text-danger are CSS/bootstrap classes
                            'text-danger': !props.prop_launch.launch_success 
                            })}>
                            {props.prop_launch.mission_name}
                        </span> 
                    </h4>
                    <p> Date: <Moment format="YYYY-MM-DD HH:mm ">{props.prop_launch.launch_date_local}</Moment> </p>
                </div>
                <div className="col-md-3">
                    {/* Using Link tag of router, instead of previously used button tag to link */}
                    <Link to={`/launch/${props.prop_launch.flight_number}`} className="btn btn-secondary">Launch Details</Link>
                    {/* previously used: <button className="btn btn-secondary">Launch Details</button> */}
                    {/* to make this button link to another page - we needed react Router} */}
                </div>
            </div>
        </div>
    );
}