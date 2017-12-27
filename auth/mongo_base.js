// Usage: 
// mongo.User.find().exec().then()
// mongo.User.insertOne({name: 'abc', password: 'bbbddd', ...}).exec().then();

const Mongolass = require('mongolass');
const mongolass = new Mongolass();

const Q = require('q');

exports.db = { mongolass: mongolass };
const db = exports.db;

let connected = [];
exports.OnConnected = function (fn) {
    if (fn) {
        connected.push(fn);
    }
};

const index_operations = [];

exports.add_index = function (table, indexJson, isUnique) {
    if (isUnique) {
        index_operations.push(table.index(indexJson, {unique: true}).exec());
    } else {
        index_operations.push(table.index(indexJson).exec());
    }
};

//'mongodb://localhost:27017/db1'
//'mongodb://root:Bdclab123@dds-2ze29c61c95941c42.mongodb.rds.aliyuncs.com:3717,dds-2ze29c61c95941c41.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3297869'
exports.connectDB = function (conn) {
    return mongolass.connect(conn).then(function () {

        //================USER RELATED==================
  /*      db.wechat_user = mongolass.model('wechat_user', {
            openid:{type:'string'},
            nickname:{type:'string'},
            headimgurl:{type:'string'},
            latitude: {type: 'number'}, // 纬度,范围为-90~90，负数表示南纬
            longitude: {type: 'number'},  //经度，浮点数，范围为-180~180，负数表示西经
            precision: {type: 'number'},  //地理位置精度
            createTime: { type: 'date'}              // 发生时间
        });
        exports.add_index(db.wechat_user, {openid: 1});*/



        /*exports.add_index(db.User, {id: 1}, true);
        exports.add_index(db.User, {nickname: 1});
        exports.add_index(db.Token, {userId: 1}, true);
        exports.add_index(db.Token, {token: 1}, true);
        exports.add_index(db.LostAndFound, {phone: 1}, true);*/

        connected.forEach(function (oneFn) {
            if (oneFn) {
                oneFn();
            }
        });

        return Q.all(index_operations);
    });

};

