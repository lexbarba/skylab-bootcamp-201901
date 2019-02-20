const logic = require('../logic')

module.exports = (req, res) => {

    const { params: { userId: id }, headers: { authorization } } = req

    const token = authorization.slice(7).trim()

    try {
        logic.retrieveUser(id, token)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}