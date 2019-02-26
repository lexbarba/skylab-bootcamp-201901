const logic = require('../logic')

module.exports = (req, res) => {

    const { body: { userId, artistId}, headers: { authorization } } = req
    
    const token = authorization.substring(7)

    try { 
        logic.toggleFavoriteArtist(userId, token, artistId)
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
