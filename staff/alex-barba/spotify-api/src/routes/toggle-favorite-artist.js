const logic = require('../logic')

module.exports = (res, req) => {
    const { params: { artistId }, body: { userId}, headers: { authorization } } = req

    const token = authorization.substring(7)

    try { 
        logic.logictoggleFavoriteArtist(userId, token, artistId)
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
