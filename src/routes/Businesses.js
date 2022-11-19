const express = require('express')
const router = express.Router()
const axios = require('axios');
const Review = require('../models/Reviews')

router.get('/', async (req,res) => {
    let results = await axios.get('https://api.yelp.com/v3/businesses/search?location=Barrie', { headers: { Authorization: 'Bearer RN_tS2HNoX7O83cEx9dEEz6FPpEBfRASo5lfARWbCdoeoxfgeoijpqyjvgcPVWzTrg7lHxhN0iqoIP58StBS-aJuNFmSVmT9PMDBDC2LWqcKXDtuCkMvY2q1dN9vY3Yx' } });
    results = await results.data
    results.businesses.map(result => {
        let coordinates = [{
            latitude: result.coordinates.latitude, longitude: result.coordinates.longitude
        }]
        result.coordinates = coordinates
    })
    return res.status(200).json(results)
})

router.get('/map', async (req,res) => {
    let results = await axios.get('https://api.yelp.com/v3/businesses/search?location=Barrie', { headers: { Authorization: 'Bearer RN_tS2HNoX7O83cEx9dEEz6FPpEBfRASo5lfARWbCdoeoxfgeoijpqyjvgcPVWzTrg7lHxhN0iqoIP58StBS-aJuNFmSVmT9PMDBDC2LWqcKXDtuCkMvY2q1dN9vY3Yx' } });
    results = await results.data
    let data = []
    results.businesses.map(result => {
        data.push({
            name: result.name,
            image: result.image_url,
            address: result.location.address1 + ", " + result.location.city + ", " + result.location.zip_code,
            geometry: {"coordinates": [result.coordinates.latitude, result.coordinates.longitude]}
        })
    })
    return res.status(200).json({data})
})

router.get('/reviews/:id', async (req, res) => {
    console.log("Post hoga edr se data appna")
    let reviews = await Review.find({'businessId': req.params.id})

    res.status(200).json({reviews})
})
router.post('/reviews', async (req, res) => {
    try {
        let businessId = req.body.businessId
        let content = req.body.content
        let username = req.body.username
        const newReview = new Review({
            businessId,
            content,
            username
        })
        newReview.save()
        return res.status(201).json({review: newReview})
    } catch (error) {
        console.log(error)
        res.json({msg: 'Server Error!! Something went wrong!'})
    }
})

module.exports = router