const logic = require("../logic");

module.exports = (req, res) => {
  try {
    logic
      .retrieveAlbums(req.params.artistId)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(401).json({
      error: message
    });
  }
};