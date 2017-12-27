
const db = require(process.cwd() + '/auth').db;
exports.OnConnected = require(process.cwd() + '/auth').OnConnected;
const add_index = require(process.cwd() + '/auth').add_index;

const onConnect = function () {
    const mongolass = db.mongolass;

    //===============DEVICE RELATED==================

    // socket.io room. Connect it with `http://{server}/{roomId}`
    db.wechat_user = mongolass.model('wechat_user', {
        openid:{type:'string'},
        nickname:{type:'string'},
        headimgurl:{type:'string'},
        latitude: {type: 'number'}, // 纬度,范围为-90~90，负数表示南纬
        longitude: {type: 'number'},  //经度，浮点数，范围为-180~180，负数表示西经
        precision: {type: 'number'},  //地理位置精度
        createTime: { type: 'date'}              // 发生时间
    });
    add_index(db.wechat_user, {openid: 1});


};

exports.OnConnected(onConnect);
exports.db = db;
