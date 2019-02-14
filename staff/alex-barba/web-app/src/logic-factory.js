const Logic = require('./logic')

module.exports = {
    create({ session }) {
        try {
            const logic = new Logic(session)

            logic.logOut = () => {
                Logic.prototype.logOut.call(logic)

                session.destroy()
            }
            return logic

        } catch ({ message }) {
            throw Error(message)
        }
    }

}