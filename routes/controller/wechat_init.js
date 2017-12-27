var wechat = require('wechat');
const MG = require('../db/address');
let dbTable;
MG.OnConnected(function () {
    dbTable = MG.db.wechat_user;
});
var config = {
    token: 'weixin',//token是你申请测试公众号时候填写的token
    appid: 'wx8ddedaeb1b6a9546',//appid是申请时，自动生成的，就在最顶部
    encodingAESKey: '',
    checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

module.exports = function (app) {
    app.use('/wechat', wechat(config, function (req, res, next) {
        // 微信输入信息都在req.weixin上
        var message = req.weixin;
        var option = {}
        console.log('reqqqqq',req)

        console.log(message);
        if(message.MsgType === 'text')
        {
            res.reply('这是一个自动回复');
        }
        else if(message.MsgType === 'voice')
        {
        } else if(message.MsgType === 'event')
        {
            res.reply(JSON.stringify(message))
            console.log('message',message)
            option.openid=message.FromUserName
            option.createTime=new Date()
            option.latitude=+message.Latitude
            option.longitude=+message.Longitude
            dbTable.insertOne(option).exec().then(function () {

            })
           /* dbTable.update({aaa:1234},{bbb:12345},{upsert: true}).exec().then(function () {

            })*/
        }
        else if(message.MsgType === 'image')
        {
            res.reply([
                {
                    title: '文章提示',
                    description: '返回的是文章',
                    picurl: 'http://pic002.cnblogs.com/images/2011/159097/2011102917303125.jpg',
                    url: 'http://doxmate.cool/node-webot/wechat/api.html'
                }
            ]);
        }
    }));
}