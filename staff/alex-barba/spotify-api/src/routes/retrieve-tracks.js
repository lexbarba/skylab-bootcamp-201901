const logic = require("../logic");
​
module.exports = (req, res) => {
 debugger
 try {
  logic
   .retrieveTracks(req.params.albumId)
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