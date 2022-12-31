/* eslint-disable no-shadow */

// import modules
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import BarShart from "./charts/bar.jsx";
import LineShart from "./charts/line.jsx";
import RadarShart from "./charts/radar.jsx";
import RadialBarShart from "./charts/radial.jsx";

import {getUserData} from "./helpers/api.js";
import {UserActivity, UserSessions, UserPerformance, UserProfile} from "./helpers/models.js";

const
    // react hook-based component rendering with async data
    // the above implies managing states for each asynchronously
    // retrieved piece of data ...
    SportSee = props => {
        const
            // component state is now managed variable by variable ...
            [ activity, setActivity ] = useState(null),
            [ sessions, setSessions ] = useState(null),
            [ performance, setPerformance ] = useState(null),
            [ profile, setProfile ] = useState(null);

        useEffect(() => {
            // trigger data retrieval, pass state update handler and data model class
            getUserData(props.user, `activity`, setActivity, UserActivity);
            getUserData(props.user, `sessions`, setSessions, UserSessions);
            getUserData(props.user, `performance`, setPerformance, UserPerformance);
            getUserData(props.user, `profile`, setProfile, UserProfile);
        // only apply effect after initial render - failing to do so
        // triggers an infinite loop of fetch, state update and render ...
        }, [ props.user ]);

        // container div styling
        return <>
            <div>bonjour</div>
            <div>
                {/* // condition component rendering on data being available */}
                {activity ? <BarShart data={ activity.format() } height={250} width={668} /> : null}
                <div className="horizontal-wrapper">
                    {sessions ? <LineShart data={ sessions.format() } height={200} width={200} /> : null}
                    {performance ? <RadarShart data={ performance.format() } height={200} width={200} /> : null}
                    {profile ? <RadialBarShart data={ profile.format()} height={200} width={200} /> : null}
                </div>
            </div>
            <div>vignettes</div>
        </>;
    };

// define prop types ...
SportSee.propTypes = {
    // user id : number required
    user: PropTypes.number.isRequired
};

export default SportSee;