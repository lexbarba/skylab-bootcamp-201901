const logic = require('../logic')

module.exports = (req, res) => {

    const { body: { artistId}, userId } = req

    debugger

    try { 
        logic.toggleFavoriteArtist(userId, artistId)
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
