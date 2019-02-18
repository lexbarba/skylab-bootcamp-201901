const logic = require('../../logic')

module.exports = (req, res) => {

    const {params:{userId:id, }, headers:{ authorization}} = req

    const token = authorization.split(' ')[1]

    try {
        logic.retrieveUser(id, token)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}