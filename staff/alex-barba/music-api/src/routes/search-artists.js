const logic = require('../logic')

module.exports = (req, res) => {
    debugger
    const { params: { query } } = req

    try {
        logic.searchArtists(query)
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