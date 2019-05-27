const Records = require('../lib/mongo').Records

module.exports = {
    // 创建一条信息
    create: function (record) {
        return Records.create(record)
    },
    // 所有数据
    findAll: function (name, page, limit) {
        return Records.find({ "name": { $regex: name } }).skip(page).limit(limit).exec()
    },
    // 根据 id 删除一条数据
    delReordById: function (recordId) {
        return Records.deleteOne({ _id: recordId }).exec()
    },
    // 根据 id 更新一条数据
    updateRecordById: function (id, record) {
        return Records.updateOne({ _id: id }, { $set: record }).exec()
    },
    findRecodById: function (id) {
        return Records.findOne({ _id: id }).exec()
    }
}
