module.exports = function (app) {
    app.use('/aaa',function (req, res) {
        res.send('respond with a resource aaa');
    })
}