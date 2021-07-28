# 目录说明
## 目录结构
```
├─mzinterface  盟主模版的所有图片、组件、句柄文件
│  ├─mzcomponents  盟主模版内所有的组件
│  ├─mzimage  盟主模版内所有的图片
│  ├─utils  盟主SDK的句柄
├─pages  页面文件夹
│  ├─index  拉流/推流入口 配置SDK信息，SDK初始化
│  ├─player  播放相关
│  │  ├─playinput  输入活动和用户信息/选择二分屏或竖屏播放入口
│  │  ├─livecheckpermission  进入活动之前的观看权限检测界面(F码和白名单)
│  │  ├─liveroom  活动页面，可以观看回放和直播
│  ├─live  推流相关
│  │  ├─createactivity  创建直播活动页面
│  │  ├─livepusher  竖屏 - 直播活动推流界面
│  │  ├─landpush  横屏 - 直播活动推流界面
```

## 支持的功能
```
* 直播
默认推流UI、普通视频直播、纯语音直播、横屏直播、竖屏直播、直播时静音、
美颜动态调节、分辨率动态调节、镜像、闪光灯、前后置摄像头动态切换、
实时展示帧率、直播时长、设置直播所属分类、设置直播间禁言、设置直播的观看方式

* 播放
默认播放UI、竖屏播放、二分屏播放、横屏播放、投屏、防录屏、
小窗口播放、弹幕、视屏封面、F码观看、白名单观看、活动配置实时更改

* 聊天
文字聊天、用户信息获取、聊天历史记录是否显示、在线观众列表、
禁言用户、踢出用户、聊天公告设置、只看主播

* 商品
商品列表、循环播放推荐商品、

* 营销功能
文档、问答、投票、滚动广告、开屏暖场图、签到、自定义礼物、片头视频

```

# 快速接入详细步骤
```
  1. 将mzinterface、live、player文件夹拷贝到工程内，mzinterface跟pages同级，live和player在pages的根目录。
  2. 参照demo里的app.json，app.js文件，设置下这2个文件。
  3. index.js是引入SDK，设置SDK信息，初始化SDK。可将相关代码拷贝到项目入口文件里。
  4. 语音动画插件
    - 如果不需要语音直播功能，直接搜索关键词lottie，将相关代码注释即可，至此就可以运行项目了。
    - 添加语音动画插件的步骤：
      1. 执行 npm init 命令。
      2. 执行 npm install lottie-miniprogram --save 命令。
      3. 右上角 详情 - 本地设置， 选中 使用npm。
      4. 菜单栏 - 工具 - 构建npm。
```

# 接口说明

## 一、引用

### 插件引用sdk文件
> 1. 在app.json里加入以下代码
```javascript
  "plugins": {
    "mz-plugin": {
      "version": "2.2.0",
      "provider": "wx2d4303f54f4d98ab"
    }
  }
```
> 2. 引用并使用sdk
```javascript
//引入SDK
var mzplugin = requirePlugin('mz-plugin')

//初始化盟主SDK
//index.js文件里配置 appId 和 secret，然后初始化SDK，一切操作请在SDK初始化之后
mzplugin.mzSDK.initSDK(data).then(function (res) {
      console.log("实例化盟主SDK的结果：",res);
})
```

## 二、接口说明
名称|参数|参数说明|描述
--|--|--|--
initSDK|[Object]|```{permission:{ id: 授权编号, key: 授权密钥 }, isShowLog:"是否显示打印"}```|初始化盟主sdk
initUser|[Object]|```{uniqueId:"用户唯一ID", name:"用户名字"，avatar:"用户头像"}```|初始化用户信息
toUpdateUserInfo|[Object]|```{unique_id:"用户唯一ID", name:"用户名字"，avatar:"用户头像"}```|更新用户信息
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
getDocumentList(channel_id , ticketId)|[Object]|channel_id 频道编号<br>ticketId 活动编号 |获取直播关联的文档列表
getDocumentInfo(channel_id , ticketId , document_id)|{Object}|channel_id 频道编号<br>ticketId 活动编号<br>document_id 文档id|获取文档详情
getChannelVote(ticketId)|{Object}|ticketId 活动编号|获取投票详情数据
getVoteOptions(id)|[Object]|id 投票id|获取投票数据列表
postVote(id , option_id , ticket_id)|-|id 投票ID<br>option_id 投票活动选项ID<br>ticket_id 活动id|提交投票选项
getAQList(ticket_id , is_new_reply , offset , limit)|[Object]|ticket_id 活动id<br>is_new_reply 是否查询最新未读回复 0:否 1:是<br>offset 分页<br>limit 条数|获取问答列表
postQuestion(ticket_id , content , is_anonymous)|-|ticket_id 活动id<br>content 提问内容<br>is_anonymous 	是否匿名提问 0:否 1:是|提交问答
getAdvertScreen({ticketId})|{Object}|```{ticketId:活动编号}```|获取暖场图
getAdvertRolling({ticketId})|[Object]|```{ticketId:活动编号}```|获取活动的滚动广告
getADInfo(ticket_id)|{Object}|```{ticketId:活动编号}```|获取配置的片头视频信息
getGiftList(ticket_id , offset, limit)|[Object]|ticket_id 活动id<br/>offset 分页<br/>limit 条数|获取自定义礼物列表
pushGift(ticket_id , gift_id, quantity)|-|ticket_id 活动id<br/>gift_id 礼物id<br/>quantity 个数|发送礼物

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
## 四、模板组件
### 1、分类、白名单、F码、列表弹出框
#### *引入组件
``` javascript
"usingComponents": {
    "mz-category-component":"plugin://mz-plugin/mz-category-component",
    "mz-fcode-component":"plugin://mz-plugin/mz-fcode-component",
    "mz-whitelist-component":"plugin://mz-plugin/mz-whitelist-component"
  }
```

#### *示例代码
``` javascript
<!-- wxml代码 -->
<!-- 分类弹窗 -->
<mz-category-component
 mzViewHeignt='996rpx'
 mzViewShow="{{showCategory}}"
 mzMaskClickHide="{{true}}"
 bindclose="bindCategoryClose"
></mz-category-component>

<!-- 白名单弹窗 -->
<mz-fcode-component
 mzViewHeignt='996rpx'
 mzViewShow="{{showFCode}}"
 mzMaskClickHide="{{true}}"
 bindclose="bindFCodeClose"
></mz-fcode-component>

<!-- F码弹窗 -->
<mz-whitelist-component
 mzViewHeignt='996rpx'
 mzViewShow="{{showWhiteList}}"
 mzMaskClickHide="{{true}}"
 bindclose="bindWhitelistClose"
></mz-whitelist-component>
```
#### *组件属性列表

| 属性            | 类型         | 默认值      | 必填 | 说明                                                         |
| :-------------- | ------------ | ----------- | ---- | ------------------------------------------------------------ |
| mzViewHeignt    | String       | 996rpx      | 否   | 列表高度                                                     |
| maskBackground  | String       | "#00000000" | 否   | 蒙层背景颜色                                                 |
| mzViewShow      | Boolean      |             | 否   | 窗口是否显示                                                 |
| mzMaskClickHide | Boolean      |             | 否   | 点击蒙层是否隐藏                                             |
| bindclose       | eventhandler |             | 否   | 关闭事件，detail为 {{isSure: true, data: {…}}}，data为data: {name: "艺术", id: "103"}，isSure是否是点击确定关闭，只有为true，data才有数据 |

### 2、问答组件
#### *引入组件
``` javascript
"usingComponents": {
    "mz-qa-component":"plugin://mz-plugin/mz-qa-component"
  }
```
#### *示例代码
``` javascript
<!-- wxml代码 -->
<mz-qa-component ticketId="{{pageInfo.ticketId}}" viewHeight="100%"></mz-qa-component>
```
#### *组件属性列表

| 属性        | 类型    | 默认值 | 必填 | 说明                                   |
| :---------- | ------- | ------ | ---- | -------------------------------------- |
| viewHeight  | String  | 840rpx | 否   | 组件高度                               |
| ticketId    | String  |        | 是   | 活动编号                               |
| unreadNum   | Number  |        | 否   | 外部设置未读消息数量                   |
| refreshData | Boolean | false  | 否   | 数据监听，每次设置为true，主动刷新数据 |

### 3、投票组件
#### *引入组件
``` javascript
"usingComponents": {
    "mz-vote-component":"plugin://mz-plugin/mz-vote-component",
  }
```
#### *示例代码
``` javascript
<!-- wxml代码 -->
<mz-vote-component
 bindclose="voteComponentClose"
 isVoteShow="{{isVoteShow}}"
 mzVoteViewHeignt='996rpx'
 ticketId="{{pageInfo.ticketId}}"
></mz-vote-component>
```
#### *组件属性列表

| 属性             | 类型         | 默认值 | 必填 | 说明             |
| :--------------- | ------------ | ------ | ---- | ---------------- |
| mzVoteViewHeignt | String       | 840rpx | 否   | 组件高度         |
| ticketId         | String       |        | 是   | 活动编号         |
| isVoteShow       | Boolean      |        | 否   | 控制组件是否显示 |
| bindclose        | eventhandler | false  | 否   | 关闭事件         |

### 4、滚动广告组件
#### *引入组件
``` javascript
"usingComponents": {
    "mz-advertRolling-component":"plugin://mz-plugin/mz-advertRolling-component",
  }
```
#### *示例代码
``` javascript
<!-- wxml代码 -->
	<!-- 滚动广告组件 -->
	<mz-advertRolling-component
	 wx:if="{{pageInfo.ticketId && live_style==0}}"
	 ticketId="{{pageInfo.ticketId}}"
	 bind:hiddenChange="advertRollingComponentIsHidden"
	 bind:advertClick="advertRollingComponentClick"
	 style="margin-top:-5.5vh"
	>
	</mz-advertRolling-component>
```
#### *组件属性列表

| 属性       | 类型    | 默认值 | 必填 | 说明                                                         |
| :--------- | ------- | ------ | ---- | ------------------------------------------------------------ |
| interval   | Number  | 6500   | 否   | 自动切换的毫秒数                                             |
| ticketId   | String  |        | 是   | 活动编号                                                     |
| isOnlySlot | Boolean | false  | 否   | 是否启用自定义slot，如果启用，就会放弃本组件的所有内容，完全自定义显示的内容 |

### 5、暖场图组件
#### *引入组件
``` javascript
"usingComponents": {
    "mz-advertFullScreen-component":"plugin://mz-plugin/mz-advertFullScreen-component",
  }
```
#### *示例代码
``` javascript
<!-- wxml代码 -->
<!-- 暖场图广告组件 -->
<mz-advertFullScreen-component
 wx:if="{{isShowFullScreenComponent}}"
 hidden="{{!isShowFullScreenComponent}}"
 ticketId="{{pageInfo.ticketId}}"
 bind:advertFullScreenFinish="advertFullScreenEnd"
 bind:advertFullScreenClick="advertFullScreenTap"
>
</mz-advertFullScreen-component>
```
#### *组件属性列表

| 属性       | 类型    | 默认值 | 必填 | 说明                                                         |
| :--------- | ------- | ------ | ---- | ------------------------------------------------------------ |
| ticketId   | String  |        | 是   | 活动编号                                                     |
| isOnlySlot | Boolean | false  | 否   | 是否启用自定义slot，如果启用，就会放弃本组件的所有内容，完全自定义显示的内容 |
### 6、片头视频组件
#### *引入组件
``` javascript
"usingComponents": {
    "mz-ad-component":"plugin://mz-plugin/mz-advideo-component"
  }
```
#### *示例代码
``` wxml
<!-- wxml代码 -->
<!-- 片头视频组件 -->
<mz-ad-component
 id="mz-ad-view"
 isADShow="{{isADShow}}"
 liveStyle="{{live_style}}"
 adWidth="100vw"
 top="{{playerViewTop}}"
 countDownTime='5'
 zIndex='90'
 adHeight="{{live_style==0?'56.00vw':'97vh'}}"
 ticket_id="{{pageInfo.ticketId}}"
 bindADPlayEnd="bindADPlayEnd"
 bindskipClick="bindskipClick"
 bindADClick="bindADClick"
></mz-ad-component>
```
#### *组件属性列表

| 属性          | 类型         | 默认值 | 必填 | 说明                                        |
| :------------ | ------------ | ------ | ---- | ------------------------------------------- |
| isADShow      | Boolean      | false  | 是   | 片头视频是否展示                            |
| adWidth       | String       | 100%   | 否   | 组件宽度                                    |
| adHeight      | String       | 100%   | 否   | 组件高度                                    |
| top           | String       |        | 否   | 组件距上距离top值                           |
| zIndex        | Number       |        | 否   | 组件层级设置                                |
| liveStyle     | String       | 0      | 否   | 0位横屏直播间，1位竖屏直播间                |
| ticket_id     | String       |        | 是   | 活动编号                                    |
| countDownTime | Number       |        | 否   | 自定义倒计时时间，不设置则取视频时长，单位S |
| bindADPlayEnd | eventhandler |        |      | 倒计时结束事件                              |
| bindskipClick | eventhandler |        |      | 跳过按钮点击事件                            |
| bindADClick   | eventhandler |        |      | 片头视频点击事件                            |
| skipViewClass | class        |        |      | 跳过按钮的样式可以自定义                    |
#### *API示例代码
``` javaScript
<!-- js示例代码 -->
const mzADView = this.selectComponent("#mz-ad-view")
//暂停片头视频
mzADView.mzADPause()
//继续播放片头视频
mzADView.mzADResume()
```
#### *注意事项

<font color='red'> **playInfo数据中的video_advert == 1的时候，代表设置了片头视频**</font>

### 7、自定义礼物组件
#### *引入组件
``` javaScript
"usingComponents": {
       "custom-gift-pop": "../../components/customGift/customGiftPop"
     }
```
##### 源码提供，可查看demo中components/customGift/customGiftPop目录下的代码，自定义修改

### 8、签到
#### *示例代码
``` wxml
<!-- wxml代码 -->
<!-- 签到 -->
<page-container
 show="{{isPageShow}}"
 position="{{'center'}}"
 bind:beforeleave="pageBeforeLeave"
 bind:afterleave="pageAfterLeave"
>
	<web-view
	 src="{{signInfoBean.access_url}}"
	 wx:if="{{isPageShow}}"
	 bindmessage="bindWebMessage"
	/>
</page-container>
```
#### 说明以及注意事项
<font color='red'> **由于webview组件在插件中使用的限制，无法封装到插件内部，又由于webview与小程序交互限制采用page-container组件来装载签到H5页面，利用page-container接收页面返回事件来完成H5页面的数据交互，完成签到完成通知，注意page-container需使用基础库版本为2.1.6，也可以自行使用page页面来实现，具体代码实现逻辑请查看liveroom.js文件查看。**</font>

## 五、版本更新

> 盟主直播插件版本更新
```javascript
2.0.0 更新内容
- 添加推流功能（支持横屏推流/竖屏推流/语音推流）。
- 添加创建直播活动的接口，设置活动观看权限功能。
- 添加播放语音直播活动的功能和UI。
- 添加二分屏观看直播活动。
- 添加检测观看直播活动权限的功能和UI。
- 添加后台动态更新直播活动的相关配置功能，持续添加功能中。
```
```javascript
2.1.0 更新内容
- 分类，白名单，F码设置为组件。
- 添加文档查看功能。
- 添加普通投票功能组件。
- 添加问答功能组件。
- 添加滚动广告功能组件。
- 添加开屏暖场图功能组件
- 添加聊天列表只显示主播功能。
```
```javascript
2.2.0 更新内容
- 片头视频组件。
- 自定义礼物源码组件。
- 签到功能添加。
```