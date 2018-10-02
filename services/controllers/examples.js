var data = require('../data/examples/examples.json');
const exampleController = (req, res) => {
  res.status(200).send(data);
}

module.exports = exampleController;
