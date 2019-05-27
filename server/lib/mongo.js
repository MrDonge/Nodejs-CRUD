const mongoose = require('mongoose')

const Schema = mongoose.Schema

const config = require('../config/default')

mongoose.connect(config.mongodb, { useNewUrlParser: true });

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

const records = new Schema({
    name: String,
    age: Number,
    gender: String,
    remark: String
}, {
        versionKey: false
    })

exports.Records = mongoose.model('Records', records)
