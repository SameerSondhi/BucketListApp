const Place = require("../models/place.model")

module.exports.testApi = (req, res) => {
    res.json({Status: 'I made it capt.'})
}

module.exports.createPlace = (req, res) => {
    Place.create(req.body)
    .then(place => res.json(place))
    .catch(err => res.status(400).json(err))
    }

module.exports.displayAllPlaces = (req, res) =>{
    Place.find()
    .then(places => res.json(places))
    .catch(err => res.json(err))
}

module.exports.displayOnePlace = (req,res) =>{
    const idFromParams = req.params.id
    Place.findOne({_id:idFromParams})
    .then((one) => res.json(one))
    .catch(err => res.json(err))
}

module.exports.updateOnePlace=(req, res)=>{
    const idFromParams = req.params.id
    const updateValue = req.body
    Place.findOneAndUpdate({_id: idFromParams}, updateValue, {new:true})
    .then(updatedPlace => res.json(updatedPlace))
    .catch(err => res.status(400).json(err))
}

module.exports.deletePlace = (req, res)=>{
    Place.deleteOne({_id: req.params.id})
    .then(message => res.json(message))
    .catch(err=> res.json(err))
}