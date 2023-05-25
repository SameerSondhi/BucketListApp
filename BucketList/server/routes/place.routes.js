const PlaceController = require("../controllers/place.controller")

module.exports = (app) => {
    app.get("/api/test", PlaceController.testApi);
    app.get("/api/place", PlaceController.displayAllPlaces)
    app.post("/api/place", PlaceController.createPlace)
    app.get("/api/place/:id", PlaceController.displayOnePlace)
    app.put("/api/place/:id", PlaceController.updateOnePlace)
    app.delete("/api/place/:id", PlaceController.deletePlace)
}