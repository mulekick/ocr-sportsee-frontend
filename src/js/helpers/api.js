/* eslint-disable node/prefer-global/process, node/no-process-env */

/**
 * module that exports the data access API
 * @module helpers/api
 */

const
    /**
     * @constant
     * @name mocks
     * @description mock data files
     */
    mocks = {
        profile: `/ocr-sportsee-frontend/data/mock.users.list.json`,
        activity: `/ocr-sportsee-frontend/data/mock.users.activity.json`,
        sessions: `/ocr-sportsee-frontend/data/mock.users.sessions.json`,
        performance: `/ocr-sportsee-frontend/data/mock.users.performance.json`
    },
    /**
     * @constant
     * @name endpoints
     * @description data api endpuints
     */
    endpoints = {
        profile: `http://192.168.1.12:3000/user/€{userId}`,
        activity: `http://192.168.1.12:3000/user/€{userId}/activity`,
        sessions: `http://192.168.1.12:3000/user/€{userId}/average-sessions`,
        performance: `http://192.168.1.12:3000/user/€{userId}/performance`
    },
    /**
     * dynamically retrieves user data using fetch
     * @async
     * @function getUserData
     * @param {number} user - the user id
     * @param {string} request - the requested data API
     * @param {function} hydrate - the caller component state setting function
     * @param {Object} UserDataModel - the data model class to instantiate
     */
    getUserData = async(user, request, hydrate, UserDataModel) => {
        try {
            // throw if request is invalid ...
            if (Object.hasOwn(mocks, request) === false)
                throw new Error(`invalid data request`);

            let
                // declare variables
                [ readable, data ] = [ null, null ];

            // using custom environment variable instead of NODE_ENV for
            // it cannot be manually overriden - the production build is
            // the sole configuration in which the endpoints have to be used
            if (process.env.REACT_APP_BUILD === `production`) {
                // retrieve user data from endpoints
                readable = await fetch(endpoints[request].replace(/€\{userId\}/u, user), {method: `GET`});
                // eslint-disable-next-line prefer-destructuring
                data = (await readable.json()).data;
            // REACT_APP_BUILD is ghpages or we're in dev mode ...
            } else {
                // retrieve user data from mocks
                readable = await fetch(mocks[request], {method: `GET`});
                // account for the data inconsistencies there ...
                data = Array.from(await readable.json()).find(x => x.userId === user || x.id === user);
            }

            // throw if user is not found ...
            if (typeof data === `undefined`)
                throw new Error(`nonexistent user`);
            // hydrate caller component with user data model class instance and return
            return hydrate(new UserDataModel(data));
        } catch (err) {
            throw new Error(`error: ${ err.message }`);
        }
    };

export {getUserData};