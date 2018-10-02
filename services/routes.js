
const ExampleController = require('./controllers/examples');

var appRouter = function (app) {
  app.get("/api/get/example", ExampleController);
}

module.exports = appRouter;
