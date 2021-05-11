import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment'; //we used this pkg to format the date
import { Link } from 'react-router-dom'; //in router, we use sth. called Link instead of an a-tag


export default function LaunchItem(props) {
    console.log(props.launch)
        
    //For step-by-step live changes view, add code while watching on the browser
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>Mission:
                        <span className={classNames({ 
                            'text-success': props.launch.launch_success, //text-success and text-danger are CSS/bootstrap classes
                            'text-danger': !props.launch.launch_success 
                            })}>
                            {props.launch.mission_name}
                        </span> 
                    </h4>
                    <p> Date: <Moment format="YYYY-MM-DD HH:mm ">{props.launch.launch_date_local}</Moment>
                    </p>
                </div>
                <div className="col-md-3">
                    {/* Using Link tag of router, instead of previously used button tag to link */}
                    <Link to={`/launch/${props.launch.flight_number}`} className="btn btn-secondary">Launch Details</Link>
                    {/* <button className="btn btn-secondary">Launch Details</button> */}
                    {/* to make this button link to another page - we need react Router} */}
                </div>
            </div>
        </div>
    );
}