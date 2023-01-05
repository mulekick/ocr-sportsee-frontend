/* eslint-disable no-shadow */

// import modules
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import Hello from "./hello.jsx";
import Stats from "./stats.jsx";

import UserActivityChart from "./activity.jsx";
import UserSessionsChart from "./sessions.jsx";
import UserPerformanceChart from "./performance.jsx";
import {UserScoreOverlay, UserScoreChart} from "./score.jsx";

import {getUserData} from "../helpers/api.js";
import {UserActivity, UserSessions, UserPerformance, UserProfile} from "../helpers/models.js";

const
    // react hook-based component rendering with async data
    // the above implies managing states for each asynchronously
    // retrieved piece of data ...
    Content = props => {
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
                {activity ? <UserActivityChart data={ activity.format() } height={`48.75%`} width={`100%`} /> : null}
                <div className="horizontal-wrapper">
                    {sessions ? <UserSessionsChart data={ sessions.format() } height={`100%`} width={`32.25%`} /> : null}
                    {performance ? <UserPerformanceChart data={ performance.format() } height={`100%`} width={`32.25%`} /> : null}
                    {/* overlayed div styling */}
                    {profile ? <UserScoreOverlay percentage={ profile.format(`radial`).at(1).percentage } height={`100%`} width={`32.25%`} /> : null}
                    {profile ? <UserScoreChart data={ profile.format(`radial`)} height={`100%`} width={`32.25%`} /> : null}
                </div>
            </div>
            <Stats data={ profile ? profile.format(`stats`) : {keyData: {}}} />
        </>;
    };

// define prop types ...
Content.propTypes = {
    // user id : number required
    user: PropTypes.number.isRequired
};

export default Content;