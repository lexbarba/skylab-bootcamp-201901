const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { data }, params: { id }, headers: { authorization }  } = req

    const token = authorization.substring(7)

    try {
        logic.updateUser(id, token, data)
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
