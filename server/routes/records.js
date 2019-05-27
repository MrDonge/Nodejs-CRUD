const express = require('express')
const router = express.Router()
const pages = require('../config/default').pages

const RecordsModel = require('../models/operation')

router.post('/find', (req, res, next) => {

    const { name = '', page = 1, limit = 10 } = req.body

    // 校验前台参数
    try {
        if (!page || !limit) {
            throw new Error('无分页参数')
        }
    } catch (e) {
        res.json({
            code: -1,
            data: '',
            message: e.message
        })
    }

    const currentPage = parseInt(page - 1) * parseInt(limit)

    RecordsModel.findAll(name, currentPage, parseInt(limit)).then(result => {
        const count = result.length
        res.json({
            code: 0,
            count,
            result
        })

    }).catch(next)

})

module.exports = router
