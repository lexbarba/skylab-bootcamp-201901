const logic = require("../logic");

module.exports = (req, res) => {
  try {
    logic
      .retrieveTrack(req.params.trackId)
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