const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, body: { userId, text }, headers: { authorization } } = req

    const token = authorization.substring(7)
    debugger
    try {
        logic.addCommentToArtist(userId, token, id, text)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}