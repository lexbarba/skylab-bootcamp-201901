import skylabInnApi from '../skylab-inn-api'

/**
 * Abstraction of business logic.
 */
const logic = {

    __userApiToken__: null,

    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or password and password confirm do not match.
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw new TypeError(`${name} is not a string`)
        if (!name.trim().length) throw new Error('name is empty')

        if (typeof surname !== 'string') throw new TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw new Error('surname is empty')

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw new TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw new Error('password confirmation is empty')

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return skylabInnApi.registerUser(name, surname, email, password, passwordConfirm)
            .then(id => id)
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - id.  
     */
    logInUser(email, password) {

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        return skylabInnApi.authenticateUser(email, password)
            .then(token => this.__userApiToken__ = token)
    },

    /**
     * Checks if user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Signs out the user.
     */
    signOutUser() {
        this.__userApiToken__ = null
    },

    /**
     * Retrieves user information
     * 
     * @param {String} token 
     *
     * @returns {Object} - user.  
     */
    retrieveUser() {
        return skylabInnApi.retrieveUser(this.__userApiToken__)
            .then(({user}) => user)
    },

    /**
     * Updates a user.
     * 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if any data is empty.
     *
     * @returns {Object} - user.  
     */
    updateUser(data) {

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return skylabInnApi.updateUser(this.__userApiToken__, data)
            .then(({user}) => user)
    },

    /**
     * Searches for a skylaber.
     * 
     * @param {String} query 
     * 
     * @throws {TypeError} - if query is not a string.
     * @throws {Error} - if query is empty.
     *
     * @returns {Object} - skylabers matching the query.  
     */
    searchSkylaber(query) {

        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
        if (!query.trim().length) throw new Error('query is empty')

        return skylabInnApi.searchSkylaber(this.__userApiToken__, query)
            .then(({user}) => user)
    },

    /**
     * Advance search for a skylaber.
     * 
     * @param {Array} param
     * 
     * @throws {TypeError} - if param is not an array.
     * @throws {Error} - if param is empty.
     *
     * @returns {Object} - skylabers matching the query.  
     */
    adSearchSkylaber(param) {

        if (param instanceof Array === false) throw new TypeError(`${param} is not an array`)
        if (!param.length) throw new Error('param is empty')


        return skylabInnApi.adSearchSkylaber(this.__userApiToken__, param)
            .then(({user}) =>  user)
    },

    /**
     * Retrieves a skylaber.
     * 
     * @param {String} skylaberId 
     * 
     * @throws {TypeError} - if skylaberId is not a string.
     * @throws {Error} - if any skylaberId is empty.
     *
     * @returns {Object} - skylaber matching the skylaberId.  
     */
    retrieveSkylaber(skylaberId) {

        if (typeof skylaberId !== 'string') throw new TypeError(`${skylaberId} is not a string`)
        if (!skylaberId.trim().length) throw new Error('skylaberId is empty')

        return skylabInnApi.retrieveSkylaber(this.__userApiToken__, skylaberId)
        .then(({user}) => user)
    },

     /**
     * Add information to a user.
     * 
     * @param {String} type 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if type is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - added work id.  
     */
    addUserInformation(type, data) {
        
        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw new Error('data is empty')
        if (data.constructor !== Object) throw new TypeError(`${data} is not an object`)

        return skylabInnApi.addUserInformation(this.__userApiToken__, type, data)
            .then(({id}) => id)
    },

    /**
     * Update information from a user.
     * 
     * @param {String} infoId
     * @param {String} type  
     * @param {Object} data 
     * 
     * @throws {TypeError} - if infoId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - updated work id.  
     */
    updateUserInformation(infoId, type, data) {

        if (typeof infoId !== 'string') throw new TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw new Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return skylabInnApi.updateUserInformation(this.__userApiToken__, infoId, type, data)
            .then(({id}) => id)
    },

    /**
     * Remove information from a user.
     * 
     * @param {String} infoId 
     * @param {String} type 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects.   
     */
    removeUserInformation(infoId, type) {

        if (typeof infoId !== 'string') throw new TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw new Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        return skylabInnApi.removeUserInformation(this.__userApiToken__, infoId, type)
            .then(({id}) => id)
    },

    /**
     * Adds a skylaber to the whitelist.
     * 
     * @param {Object} data
     * 
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if data is empty.
     *
     * @returns {Promise} resolves or rejects.  
     */
    addSkylaber(data) {

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)


        return skylabInnApi.addSkylaber(this.__userApiToken__, data)
            .then(({id}) => id)
    },

    /**
     * Retrieve whitelist skylabers with pending status.
     * 
     * @param {String} token 
     *
     * @returns {Object} - users pending sign up.   
     */
    retrievePendingSkylabers() {
        return skylabInnApi.retrievePendingSkylabers(this.__userApiToken__)
            .then(({preUsers}) => preUsers)
    },

    /**
     * Updates a user.
     * 
     * @param {Blob} image 
     * 
     * @throws {TypeError} - if image is not an blob.
     * @throws {Error} - if any image is empty.
     *
     * @returns {Object} - user.  
     */
    updateUserPhoto(image) {

        if (!image) throw Error('image is empty')
        if (image instanceof Blob === false) throw TypeError(`${image} is not an object`)

        return skylabInnApi.updateUserPhoto(this.__userApiToken__, image)
            .then(({user}) => user)
    },

    /**
     * Retrieve skylabers with unverified emails.
     * 
     * @param {String} token 
     *
     * @returns {Object} - users with unverified emails.   
     */
    retrieveUnverifiedEmails() {
        return skylabInnApi.retrieveUnverifiedEmails(this.__userApiToken__)
            .then(({unverified}) => unverified)
    },

    /**
     * Create a hashed url with skylaberIds.
     * 
     * @param {Array} skylaberIds
     * 
     * @throws {TypeError} - if skylaberIds is not an array.
     * @throws {Error} - if skylaberIds is empty.
     *
     * @returns {String} - hashed url with skylabers ids.  
     */
    shareResults(skylaberIds) {

        if (skylaberIds instanceof Array === false) throw new TypeError(`${skylaberIds} is not an array`)
        if (!skylaberIds.length) throw new Error('skylaberIds is empty')


        return skylabInnApi.shareResults(this.__userApiToken__, skylaberIds)
            .then(({hashedUrl}) =>  hashedUrl)
    },

    /**
     * Retrieve encrypted skylabers.
     * 
     * @param {String} encryptedIds 
     * 
     * @throws {TypeError} - if any encryptedIds is not a string.
     * @throws {Error} - if any encryptedIds is empty.
     *
     * @returns {Array} - list of skylabers.  
     */
    retrieveEncryptedIds(encryptedIds) {

        if (typeof encryptedIds !== 'string') throw new TypeError(`${encryptedIds} is not a string`)
        if (!encryptedIds.trim().length) throw new Error('encryptedIds is empty')

        return skylabInnApi.retrieveEncryptedIds(encryptedIds)
            .then(({skylabers}) => skylabers)
    },
    
}

export default logic