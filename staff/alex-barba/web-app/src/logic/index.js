'use strict'

/**
 * 
 * Business logic for Marvel App
 * 
 */


const userApi = require('../user-api')

class Logic {
    
    constructor(storage = {}) {
        if (typeof storage !== 'object') throw TypeError(`${storage} is not an object`)

        this.__storage__ = storage
    }

    /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirm
   *
   * @throws {TypeError} - If any param is not a string.
   * @throws {Error} - If any param is empty.
   * @throws {Error} - If password and password confirmation do not match.
   *
   * @returns {String} - User Id.
   */

    register(name, surname, email, password, passwordConfirm) {
        if (typeof name !== "string") throw TypeError(name + " is not a string");

        if (!name.trim().length) throw Error("name is empty");

        if (typeof surname !== "string")
            throw TypeError(surname + " is not a string");

        if (!surname.trim().length) throw Error("surname is empty");

        if (typeof email !== "string") throw TypeError(email + " is not a string");

        if (!email.trim().length) throw Error("email is empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password is empty");

        if (typeof passwordConfirm !== "string")
            throw TypeError(passwordConfirm + " is not a string");

        if (!passwordConfirm.trim().length)
            throw Error("password confirmation is empty");

        if (password !== passwordConfirm) throw Error("passwords do not match");

        return userApi.register(name, surname, email, password).then(() => { });
    }

    /**
     * Login by credentials.
     *
     * @param {string} email
     * @param {string} password
     *
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     *
     * @returns {Object} - Contains user Id and Token.
     */
    login(email, password) {
        if (typeof email !== "string") throw TypeError(email + " is not a string");

        if (!email.trim().length) throw Error("email is empty");

        if (typeof password !== "string")
            throw TypeError(password + " is not a string");

        if (!password.trim().length) throw Error("password is empty");

        return userApi.authenticate(email, password).then(({ data: { id, token } }) => {
            this.__storage__.userId = id
            this.__storage__.userApiToken = token
        })
    }

    get isUserLoggedIn() {
        return !!this.__storage__.userId
    }

    logOut() {
        this.__storage__.userId = null
        this.__storage__.userApiToken = null
    }

    /**
     * Retrieve user data.
     *
     * @param {string} id
     * @param {string} token
     *
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     *
     * @returns {Object} - With all user info.
     */

    retrieveUser() {

        return userApi.retrieve(this.__storage__.userId, this.__storage__.userApiToken).then(response => {
            const { name } = response

            if (name) return response
            throw Error(response.error);
        });
    }

    /**
     * 
     * Updates user data.
     *
     * @param {Object} - New data to be added
     *
     * @throws {TypeError} - If the param is not an Object.
     *
     * @returns {Object} - If the update was successfull or not.
     */

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return userApi.update(this.__storage__.userId, this.__storage__.userApiToken, data)
            .then(response => {
                const { status } = response

                if (status === "OK") return response
                throw Error(response.error)
            });
    }
};

module.exports = Logic