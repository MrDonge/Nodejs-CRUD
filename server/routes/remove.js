const express = require('express')
const router = express.Router()

const RecordsModel = require('../models/operation')

router.get('/delete', function (req, res, next) {
    const recordId = req.query.recordId

    try {
        if (!recordId) {
            throw new Error('参数错误，没有id')
        }
    } catch (e) {
        res.json({
            code: -1,
            data: "",
            message: e.message
        })
    }

    RecordsModel.delReordById(recordId).then(result => {
        res.json({
            code: 0,
            message: "success",
            data: result
        })
    }).catch(next)
})

module.exports = router
