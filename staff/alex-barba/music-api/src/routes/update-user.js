const logic = require('../logic')
const { verifyToken } = require('../token-helper')

module.exports = (req, res) => {
    const { body: { data }, userId } = req

    try {
        logic.updateUser(userId, data)
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
