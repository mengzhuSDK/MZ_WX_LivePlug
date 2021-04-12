# 接口说明

## 一、引用

> 直接使用require方式引用sdk文件。

```javascript
var mzSDK = require("../../utils/mzlive.js");
```

## 二、接口说明
名称|参数|参数说明|描述
--|--|--|--
init|[Object]|```{ticketId:活动编号, uniqueId:"微信用户id", name:"微信名称", avatar:"用户微信头像", permission:{ id: 授权编号, key: 授权密钥 }}```|初始化直播sdk
push|String|聊天内容|发送消息
connect|-|-|sdk初始化完成后，调用此方法，连接到当前直播会话中，与其它用户互动。
disconnect|-|-|断开连接，当用户退出时，调用此方法，结束直播会话。最好在页面的onload事件中调用。
getPraise|[Object]|```{ticketId:活动编号, channelId:"频道id", praises:点赞数, chatUid:会话id }```|点赞接口channelId|
getGoods|[Object]|```{ticketId:活动编号, type:"商品类型", offset:页码, limit:每页数量,  permission:{ id: 授权编号, key: 授权密钥 }}```|获取商品列表接口
getHistory|[Object]|```{ticketId:活动编号,  permission:{ id: 授权编号, key: 授权密钥 }}```|获取历史信息接口
getAchorPost|[Object]|```{ticketId:活动编号}```|获取主播信息接口
getOnlines|[Object]|`{ticketId:活动编号}`|获取右上角头像信息
mzee|-|-|事件处理对象(见表2.1)

### 2.1 事件处理对象列表
事件名称|接收参数|描述
--|--|--
msg|[Object]|接收其它用户发送的消息和发送消息的用户信息
online|[Object]|其他用户上线时通知
offline|[Object]|其他用户下线时通知
complete|[Object]|监听推送消息(见表2.1.1)
cmd|[Object]|监听控制台消息(见表2.1.2)
channel|[Object]|监听频道消息(见表2.1.3)

#### 2.1.1 complete监听推送消息

> 监听返回信息res的date.type类型[res.data.type]

类型|描述
--|--
goods_spread|推送的商品

#### 2.1.2 cmd监听控制台消息

> 监听返回信息res的date.type类型[res.data.type]

类型|描述
--|--
*over|直播推流暂停
*liveEnd|直播结束
*disablechat|禁言接口
*permitchat|解禁接口

#### 2.1.3 channel监听频道消息

> 监听返回信息res的date.type类型[res.data.type]

类型|描述
--|--
uv|直播观看人数

## 三、相关配置
### 3.1 appid和secret
> 在<mark>liveroom.js</mark>中的<code>pageInfo</code>中配置。
 ```javascript
pageInfo: {
	ticketId: "",
	appId: " ",
	secret: " ",
}
```
### 3.2 用户信息存放
> 用户信息存放于<mark>app.js</mark>中的<code>globalData</code>中，进入观看页面前，需要预先配置好相关配置信息
```javascript
globalData: {
	userInfo: {
		avatarUrl: '',  //存放全局登录用户头像地址
		nickName: '',  //存放全局登录用户昵称
		uniqueId: ''  //存放全局登录用户唯一标识
	},  
}
```
## 四、使用示例

> 在index.js中编写如下代码：

```javascript
var mzSDK = require("../../utils/mzlive.js");

Page({
    data: {
        ...
    },
    getMsg: function (data) {
        //TODO:处理接收到的消息
    },
    onLoad: function (option) {
        ...
        //绑定事件
        mzSDK.mzee.on("msg", this.getMsg);
        ...
    },
    onUnload: function () {
        ...
        //卸载事件
        mzSDK.mzee.removeListener("msg", this.getMsg);
        ...
    },
})
```

