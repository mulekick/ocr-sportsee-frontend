/* eslint-disable max-classes-per-file */
/**
 * module that exports the data modelization classes
 * @module helpers/models
 */

/** class for modelization of the user activity API data */
class UserActivity {
    /**
     * data modelization class for activity component
     * @param {Object} d - data returned from the user activity API
     */
    constructor(d) {
        const
            // destructure data and account for inconsistencies
            {userId, sessions} = d;
        // throw if activity data contains error
        if (sessions.every(x => [ `day`, `kilogram`, `calories` ].every(y => Object.hasOwn(x, y))) === false)
            throw new Error(`invalid user activity data for user ${ userId }`);
        // flatten data for consumption by components
        this.sessions = sessions;
    }

    /**
     * data formatting method
     * @return {Object} - an object ready for consumption by the component
     */
    format() {
        return this.sessions.map((x, i) => ({
            day: i + 1,
            kilogram: x.kilogram,
            calories: x.calories
        }));
    }
}

/** class for modelization of the user sessions API data */
class UserSessions {
    /**
     * data modelization class for sessions component
     * @param {Object} d - data returned from the user sessions API
     */
    constructor(d) {
        const
            // destructure data and account for inconsistencies
            {userId, sessions} = d;
        // throw if performance data contains error
        if (sessions.every(x => [ `day`, `sessionLength` ].every(y => Object.hasOwn(x, y))) === false)
            throw new Error(`invalid user sessions data for user ${ userId }`);
        // flatten data for consumption by components
        this.sessions = sessions;
    }

    /**
     * data formatting method
     * @return {Object} - an object ready for consumption by the component
     */
    format() {
        return this.sessions.map(x => ({
            day: [ `L`, `M`, `M`, `J`, `V`, `S`, `D` ].at(x.day - 1),
            sessionLength: x.sessionLength
        }));
    }
}

/** class for modelization of the user performance API data */
class UserPerformance {
    /**
     * data modelization class for performance component
     * @param {Object} d - data returned from the user performance API
     */
    constructor(d) {
        const
            // destructure data and account for inconsistencies
            {userId, kind, data} = d;
        // throw if performance data contains error
        if (data.every(x => [ `value`, `kind` ].every(y => Object.hasOwn(x, y))) === false)
            throw new Error(`invalid user performance data for user ${ userId }`);
        // flatten data for consumption by components
        this.kind = kind;
        this.data = data;
    }

    /**
     * data formatting method
     * @return {Object} - an object ready for consumption by the component
     */
    format() {
        return this.data.map(x => ({
            kind: this.kind[x.kind],
            value: x.value
        }));
    }
}

/** class for modelization of the user profile API data */
class UserProfile {
    /**
     * data modelization class for profile component
     * @param {Object} d - data returned from the user profile API
     */
    constructor(d) {
        const
            // destructure data and account for inconsistencies
            {userInfos: {firstName}, todayScore, score, keyData} = d;
        // flatten data for consumption by components
        this.firstName = firstName;
        this.score = todayScore || score;
        this.keyData = keyData;
    }

    /**
     * data formatting method (recharts expects the SVG fill as part of the data ...)
     * @param {string} f - the required format depending on the targeted component
     * @return {Object} - an object ready for consumption by the component
     */
    format(f) {
        switch (f) {
        case `hello` :
            return {
                firstName: this.firstName
            };
        case `stats` :
            return {
                keyData: this.keyData
            };
        case `radial` :
            return [ {
                name: `remainder`,
                percentage: 1e2 - (this.score * 1e2),
                // resorting to lame tricks such as this ...
                fill: `#fbfbfb`
            }, {
                name: `percentage of objective completed`,
                percentage: this.score * 1e2,
                fill: `#ff0000`
            } ];
        default :
            throw new Error(`invalid format`);
        }
    }
}

export {UserActivity, UserSessions, UserPerformance, UserProfile};