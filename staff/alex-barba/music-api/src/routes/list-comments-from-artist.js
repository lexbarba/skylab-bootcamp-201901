const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req
    debugger
    try {
        logic.listCommentsFromArtist(id )
            .then(comments => res.json(comments))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}