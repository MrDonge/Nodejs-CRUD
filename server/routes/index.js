module.exports = app => {

    // 设置允许跨域访问该服务.
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        next();
    });

    app.use("/record", require("./create"));
    app.use("/record", require("./records"));
    app.use("/record", require("./remove"));
    app.use("/record", require("./update"));
    app.use("/record", require("./search"));
}
