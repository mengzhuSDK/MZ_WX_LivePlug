
# 目录说明
## 目录结构
```
├─component  历史聊天组件文件夹
├─components  其他所有组件文件夹
├─images 图片
├─miniprogram_npm lottie插件
├─pages  页面文件夹
│  ├─image  语音动画的js
│  ├─index  活动观看选择，直播入口
│  ├─livecheckpermission  进入活动之前的观看权限检测界面(F码和白名单)
│  ├─liveroom  活动页面，可以观看回放和直播
│  ├─createactivity  创建直播活动页面
│  ├─livepusher  竖屏 - 直播活动推流界面
│  ├─landpush  横屏 - 直播活动推流界面
│  └─logs  异常打印页面
```

## 支持的功能
```
* 直播
默认推流UI、普通视频直播、纯语音直播、横屏直播、竖屏直播、直播时静音、美颜动态调节、分辨率动态调节、镜像、闪光灯、前后置摄像头动态切换、实时展示帧率、直播时长、设置直播所属分类、设置直播间禁言、设置直播的观看方式

* 播放
默认播放UI、竖屏播放、二分屏播放、横屏播放、投屏、防录屏、小窗口播放、弹幕、视屏封面、F码观看、白名单观看、活动配置实时更改

* 聊天
文字聊天、用户信息获取、聊天历史记录是否显示、在线观众列表、禁言用户、踢出用户、聊天公告设置

* 商品
商品列表、循环播放推荐商品、

```
# 接口说明

## 一、引用

### 插件引用sdk文件
> 1. 在app.json里加入以下代码
```javascript
  "plugins": {
    "mz-plugin": {
      "version": "2.0.0",
      "provider": "wx2d4303f54f4d98ab"
    }
  }
```
> 2. 引用并使用sdk
```javascript
//引入SDK
var mzplugin = requirePlugin('mz-plugin')

//初始化盟主SDK
mzplugin.mzSDK.initSDK(data).then(function (res) {

})
```

## 二、接口说明
名称|参数|参数说明|描述
--|--|--|--
initSDK|[Object]|```{permission:{ id: 授权编号, key: 授权密钥 }, isShowLog:"是否显示打印"}```|初始化盟主sdk
initUser|[Object]|```{uniqueId:"用户唯一ID", name:"用户名字"，avatar:"用户头像"}```|初始化用户信息
initUser|[Object]|```{unique_id:"用户唯一ID", name:"用户名字"，avatar:"用户头像"}```|更新用户信息
getTicketInfo|[Object]|```{ticketId:"直播活动ID",uniqueId:"用户唯一ID"}```|获取直播间完整信息
push|String|聊天内容|发送消息
connect|-|-|sdk初始化完成后，调用此方法，连接到当前直播会话中，与其它用户互动。
disconnect|-|-|断开连接，当用户退出时，调用此方法，结束直播会话。最好在页面的onload事件中调用
getPraise|[Object]|```{ticketId:活动编号, channelId:"频道编号", praises:点赞数, chatUid:会话id }```|点赞接口channelId
getGoods|[Object]|```{ticketId:活动编号, type:"商品类型", offset:页码, limit:每页数量}```|获取商品列表接口
getHistory|[Object]|```{ticketId:活动编号, offset:页码, limit:每页数量, last_id:上一次请求的最后一条消息的id}```|获取历史信息接口
getOnlines|[Object]|```{ticketId:活动编号}```|获取在线人员列表
getHostInfo|[Object]|```{ticketId:活动编号}```|获取主播信息接口
getWebinarToolsList|[Object]|```{ticketId:活动编号}```|获取活动的所有配置开关
checkPlayPermission|[Object]|```{ticketId:活动编号, phone:手机号}```|检测当前活动的观看权限，白名单观看权限必须传phone，F码观看权限非必须
useFCode|[Object]|```{ticketId:活动编号, fCode:F码}```|当前活动的观看权限未F码观看时，使用F码进行权限验证
getLiveInfoOfChannel|[Object]|```{channelId:频道编号}```|获取当前频道是否有正在直播的活动
createNewLive|[Object]|```{liveCover:"活动封面"，liveName:"活动名字"，liveIntroduction:"活动简介"，auto_record:"是否生成回放"，channelId:"频道编号"，live_style:"横屏还是竖屏，0-横屏，1-竖屏"，live_type:"语音还是视频直播，0-视频直播 1-语音直播"，view_mode:"观看方式 1-免费，5-白名单， 6-F码"，category_id:"分组ID"，pay_notice:"使用白名单观看权限的提示文案"，white_id:"使用白名单观看权限的白名单列表ID"，fcode_id:"使用F码观看权限的F码ID"}```|创建直播活动
getCategoryList|[]|```{}```|获取分组列表，创建活动时需要，非必须
getFCodeList|[]|```{}```|获取F码列表，创建活动时需要，非必须
getWhiteList|[]|```{}```|获取白名单列表，创建活动时需要，非必须
startLive|[Object]|```{ticketId:"活动编号"，live_tk:"活动凭证"，uniqueId:"用户唯一ID"，name:"用户名字"，avatar:"用户头像"}```|获取推流地址，开始直播
stopLive|[Object]|```{channelId:"频道编号"，ticketId:"活动编号"}```|结束直播，获取结束直播信息
blockTicket|[Object]|```{channelId:"频道编号"，ticketId:"活动编号",isChat:"是否禁言，0-禁言，1-解除禁言"}```|聊天室设置是否禁言
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

#### 2.1.3 channel监听频道消息

> 监听返回信息res的date.type类型[res.data.type]

类型|描述
--|--
uv|直播观看人数

## 三、使用示例

> 微信小程序插件使用

```javascript
var mzplugin = requirePlugin('mz-plugin')

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
        mzplugin.mzSDK.mzee.on("msg", this.getMsg);

        //实例化盟主SDK
        mzplugin.mzSDK.initSDK(data).then(function (res) {

        }, function (err) {

        })
    },
    onUnload: function () {
        ...
        //卸载事件
        mzplugin.mzSDK.mzee.removeListener("msg", this.getMsg);
        ...
    },
})
```

## 四、版本更新

> 盟主直播插件版本更新

```javascript
- v2.0.0版本更新内容
1. 添加推流功能（支持横屏推流/竖屏推流/语音推流）。
2. 添加创建直播活动的接口，设置活动观看权限功能。
3. 添加播放语音直播活动的功能和UI。
4. 添加二分屏观看直播活动。
5. 添加检测观看直播活动权限的功能和UI。
6. 添加后台动态更新直播活动额相关配置功能，持续添加功能中。
```
