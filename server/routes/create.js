const express = require('express')
const router = express.Router()

const RecordsModel = require('../models/operation')

router.post('/create', (req, res, next) => {

    const { name, age, gender, remark } = req.body

    // 校验参数
    // try {
    //     if (!name || !age || !gender || !remark) {
    //         throw new Error('参数错误')
    //     }
    // } catch (e) {
    //     res.json({
    //         code: '-1',
    //         data: "",
    //         message: e.message
    //     })
    // }

    const createRecord = { name, age, gender, remark }

    RecordsModel.create(createRecord).then(result => {
        if (result && result._id) {
            res.json({
                code: 0,
                data: "",
                message: 'success'
            })
        }
    }).catch(next)
})

module.exports = router
