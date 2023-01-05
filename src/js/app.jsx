/* eslint-disable no-shadow */

// import modules
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import Hello from "./components/hello.jsx";
import Stats from "./components/stats.jsx";

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
            {/* condition props value so as to avoid the flashing effect on load */}
            <Hello data={ profile ? profile.format(`hello`) : {firstName: ``}} />
            <div>
                {/* // condition component rendering on data being available */}
                {activity ? <BarShart data={ activity.format() } height={`50%`} width={`100%`} /> : null}
                <div className="horizontal-wrapper">
                    {sessions ? <LineShart data={ sessions.format() } height={`100%`} width={`33%`} /> : null}
                    {performance ? <RadarShart data={ performance.format() } height={`100%`} width={`33%`} /> : null}
                    {profile ? <RadialBarShart data={ profile.format(`radial`)} height={`100%`} width={`33%`} /> : null}
                </div>
            </div>
            <Stats data={ profile ? profile.format(`stats`) : {keyData: {}}} />
        </>;
    };

// define prop types ...
SportSee.propTypes = {
    // user id : number required
    user: PropTypes.number.isRequired
};

export default SportSee;