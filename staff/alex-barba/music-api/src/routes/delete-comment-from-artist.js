const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { commentId }, body: { userId }, headers: { authorization } } = req

    const token = authorization.substring(7)
    debugger
    try {
        logic.deleteCommentFromArtist(commentId, token, userId)
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