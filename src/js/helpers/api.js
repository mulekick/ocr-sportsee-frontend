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
        profile: `/data/mock.users.list.json`,
        activity: `/data/mock.users.activity.json`,
        sessions: `/data/mock.users.sessions.json`,
        performance: `/data/mock.users.performance.json`
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
            const
                // user sessions
                readable = await fetch(mocks[request], {method: `GET`}),
                // account for the data inconsistencies there ...
                data = Array.from(await readable.json()).find(x => x.userId === user || x.id === user);
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