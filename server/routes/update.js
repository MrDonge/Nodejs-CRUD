const express = require('express')
const router = express.Router()

const RecordModel = require('../models/operation')

router.post('/update', function (req, res, next) {
    console.log(req.body);
    const { id, record } = req.body
    try {
        if (!id) {
            throw new Error('没有id')
        }
    } catch (e) {
        res.json({
            code: -1,
            data: "",
            message: e.message
        })
    }

    RecordModel.updateRecordById(id, record).then(result => {
        if (result.ok) {
            res.json({
                code: 0,
                data: result,
                message: "success"
            })
        }
    }).catch(next)
})

module.exports = router
