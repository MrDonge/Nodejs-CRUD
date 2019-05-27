const express = require('express')
const router = express.Router()

const RecordModel = require('../models/operation')

router.get('/findOne', function (req, res, next) {
    const recordId = req.query.id

    if (!recordId) {
        res.json({
            code: -1,
            message: "",
            data: ""
        })
    }

    RecordModel.findRecodById(recordId).then(result => {
        if (result && result._id) {
            res.json({
                code: 0,
                data: result,
                message:"success"
            })
        }
    }).catch(next)

})

module.exports = router
