//index.js
// const app = getApp();

import lottie from 'lottie-miniprogram'// 不需要语音直播请注释

var mzplugin = require('../../../mzinterface/utils/mzSDK');

const app = getApp();


Page({
	// 语音动画
	auani: null,

	data: {
		//横屏还是竖屏 0 = 横屏， 1 = 竖屏
		live_style: 0,
		//0是视频，1是音频
		live_type: 0,
		//观看方式 1免费 2vip 3付费 4密码 5白名单 6F码
		view_mode: 1,
		//播放地址
		videoUrl: "",
		//封面图地址
		cover: "",
		//封面图是否隐藏，只针对live-players
		coverIsHidden: false,
		//点赞个数
		like_num: "",
		//0无片头广告，1有片头广告
		video_advert: 0,
		//进入直播间的时候观众人数
		webinar_onlines: 0,
		//视频起始top
		playerViewTop: '138rpx',
		//活动状态 0=未开播，1=直播，2=回放， 3=断流 
		//根据活动状态来选择video标签还是live-player标签
		liveState: "0",
		//isFull  是否是全屏展示
		isFull: false,
		//播放控制栏是否显示
		controlIsHidden: '',

		//二分屏菜单显示哪个 
		menuTitles: ['互动','文档','问答'],
		menuShowIndex: 0,

		//回放播放器句柄
		videoContext: null,
		//直播播放器句柄
		playContext: null,
		//是否展示暖场图的组件
		isShowFullScreenComponent: false,

		//该活动的所有配置
		ticketConfig: {
			//是否展示弹幕
			isOpenDanMu: true,
			//公告内容
			notice: "",
			//点赞开关
			isOpenLike: true,
			//礼物开关
			isOpenGift: true,
			//倍速开关
			isOpenSpeed: true,
			// 是否禁止聊天
			isOpenDisable_chat: false,
			// 是否开启防录屏
			isOpenRecord_screen: true,
			// 是否隐藏 聊天记录
			isOpenHide_chat_history: false,
			// 是否显示投票
			isOpenVote: 0,
			// 是否显示文档
			isOpenDocuments: true,
			// 是否显示签到
			isOpenSign: true,
			// 是否显示抽奖
			isOpenPrize: true,
			// 暖场图开关
			isOpenFull_screen: true,
		},

		//页面文本信息（便于修改）
		defaultText: {
			leaveInfoOne: "主播暂时离开，",
			leaveInfoTwo: "稍等一下马上回来",
			anchorFollow: "关注",
			allGoods: "全部商品·",
			toBuy: "去购买",
			placeholderText: "跟主播聊天",
			quitLiveRoomAndFllow: "是否需要关注主播？",
			quitLiveRoom: "退出",
		},
		defaultInfo: {
			anchorName: "",
			anchorPic: "",
			anchorUid: "",
			anchorTicketState: "",
			anchorPopularityNum: "",
			popular: "",
			goodsItemPic: "",
			goodsItemName: "",
			goodsItemCurrency: "￥",
			goodsItemPrice: "",
			allGoodsNum: 0,
			buy_url: "",
			channelId: ""
		},
		pageInfo: {
			ticketId: "",
		},
		// 当前登录用户
		currentUser: {
			uniqueId: '',
			nickName: '',
			avatarUrl: 'https://s1.zmengzhu.com/user/images/user-default-image.png'
		},
		visitorType: false,
		// 互动区域高度
		commentAreaHeight: 0,
		menuButton: wx.getMenuButtonBoundingClientRect(),
		livePlayerUrl: true,
		liveShow: false,
		goodsListState: false,
		settingPopupState: false,
		chooseSize: false,
		loopAnimationStart: "",
		loopAnimationEnd: "",
		loopAnimation: "",
		count: 0,
		goodsListData: [],
		goodsListDataReverse: [],
		goodsItemPush: [],
		// 当前显示的消息列表
		commentList: [],
		// 所有的消息列表
		allCommentList: [],
		// 筛选出来的消息列表
		filterCommentList: [],
		// 筛选的规则（需要筛选出来的用户ID列表,默认里面有主播和自己的用户ID）
		filterConditions: [],
		scrollY: true,
		scrollTop: 0,
		inputHeight: "3.2vw",
		classNameKeyboardUp: "user-addcomment",
		showQuitModelState: false,
		test: "",
		iconList: [],
		overLiveState: false,
		uv: 0,
		duration: "00:00:00",
		chatUid: "", //自己在聊天室里的uid
		AnimationState: "",
		inputShow: false,
		quitPageState: '',
		quitModelState: '',
		disablechat: false,
		userOnlineName: "",
		userOnlineAnimation: "",
		userOnlineDefaule: {
			left: "-29.33vw",
			opacity: "0"
		},
		timerPush: null,
		timeoutTimer: null,
		timerUserOnline: null,
		cmdOverTimer: null, //断流定时器
		cmdLiveEndTimr: null, //直播结束定时器
		vioBottom: 26.4,

		screenHeight: 0,
		screenWidth: 0,
		// 语音动画是否展示
		auaniIsHidden: false,

		//聊天历史记录的数据
		comments: {
			limit: 100,
			offset: 0,
			isLoadOver: false,
			oldHeight: 0, //上一次历史聊天记录的高度
		},
		//是否只看主播的开关
		onlyHostIsEnable: false,
		// 显示键盘的时候，展示出来的点击收回键盘的view
		showTapHideKeyboard: false,
		//防录屏
		recordScreen: {
			recordScreenInterval: null, //定时器
			textWidth: 150, //文字宽度
			textHeight: 35, //文字高度
			marginLeft: 90, //左侧边距
			marginTop: 88, //顶部边距
			isHidden: true, //是否隐藏
			text: "自定义的防录屏文字", //自定义的防录屏文字
			textColor: '#FF1F60', //字体颜色
		},
		//是否隐藏滚动广告组件，默认隐藏
		isHiddenAdvertRolling: true,
		//文档图片集合
		documentImgUrls: [],
		documentTitleName: '',
		documentCurrentPage: '',
		documentPageCount: '',
		// 投票相关
		isVoteShow: false,
		//问答相关
		refreshQAData: false,
		unreadNum: 0,
		//签到相关
		signInfoBean: null,
		isPageShow: false,
		is_sign: false, //是否签到
		is_signbtn_show: true, // 签到按钮是否显示
		delayobj: -1, //倒计时对象


		//片头广告控制
		video_advert: 0,
		isADShow: false,

		//盟主片头视频组件对象
		mzADView: null,

		//自定义礼物组件对象
		mzGiftPop: null,
		isGiftPopShow: false,
	},

	//事件处理函数
	onLoad: function (option) {
		var _this = this;
		_this.setParam(option);

		//判断用户是否为访客
		if (app.globalData.userInfo.uniqueId == "" && app.globalData.userInfo.nickName == "" && app.globalData.userInfo.avatarUrl == "") {
			_this.setData({
				visitorType: true
			})
		}

		// 从全局复制出来用户信息
		if (app.globalData.userInfo) {
			_this.setData({
				'currentUser.uniqueId': app.globalData.userInfo.uniqueId,
				'currentUser.nickName': app.globalData.userInfo.nickName,
				'currentUser.avatarUrl': app.globalData.userInfo.avatarUrl || "https://s1.zmengzhu.com/user/images/user-default-image.png",
			})
			wx.getSystemInfo({
				success: function (res) {
					// success
					_this.setData({
						screenHeight: res.windowHeight,
						screenWidth: res.windowWidth,
					})
				}
			})

			//挂载事件
			mzplugin.mzSDK.mzee.on("msg", _this.getMsg);
			mzplugin.mzSDK.mzee.on("online", _this.getOnline);
			mzplugin.mzSDK.mzee.on("offline", _this.getOffline);
			mzplugin.mzSDK.mzee.on("complete", _this.getComplete);
			mzplugin.mzSDK.mzee.on("cmd", _this.getCmd);
			mzplugin.mzSDK.mzee.on("channel", _this.getChannel);

			wx.onKeyboardHeightChange(res => {
				if (res.height <= 0) {
					_this.tapHideKeyboardAction();
				}
			})
		}
	},
	onReady: function () {
		this.setCommentAreaHeight();

		this.getLiveRoomInfo();
		this.getGoodsListData();
		this.getAchorInfo();
		this.getWebinarToolsList();

		// 获取  video的播放句柄 和 直播的播放句柄
		this.videoContext = wx.createVideoContext('myVideo')
		this.playContext = wx.createLivePlayerContext('livePlayer')

		this.mzGiftPop = this.selectComponent("#giftPop")

		this.mzGiftPop.loadGiftData()
	},

	onUnload: function () {
		//卸载事件
		mzplugin.mzSDK.disconnect();
		mzplugin.mzSDK.mzee.removeListener("msg", this.getMsg);
		mzplugin.mzSDK.mzee.removeListener("online", this.getOnline);
		mzplugin.mzSDK.mzee.removeListener("offline", this.getOffline);
		mzplugin.mzSDK.mzee.removeListener("complete", this.changeGoodsItemPush);
		mzplugin.mzSDK.mzee.removeListener("cmd", this.getCmd); //挂载推送商品
		mzplugin.mzSDK.mzee.removeListener("channel", this.getChannel);
		this.endRecordScreen();
	},

	//启动语音播放动画
	showAudioAnimation: function () {
		// 不需要语音直播请注释下面代码
		wx.createSelectorQuery().select('#canvas').node(res => {
			const canvas = res.node
			const context = canvas.getContext('2d')
			lottie.setup(canvas)

			this.auani = lottie.loadAnimation({
				loop: true,
				autoplay: true,
				animationData: require('../../../mzinterface/mzimage/voice_live_am'),
				rendererSettings: {
					context,
				},
			})
		}).exec()
	},

	//启动防录屏
	startRecordScreen: function (text) {
		var _this = this;

		if (text == null || text == undefined || text.length <= 0) {
			text = _this.data.currentUser.nickName;
		}
		if (text == null || text == undefined || text.length <= 0) {
			text = "自定义的防录屏文字";
		}

		//申请定时器
		var interval = setInterval(() => {
			//计算出随机位置

			//获取播放控件的宽高
			setTimeout(() => {
				wx.createSelectorQuery().select('.live-player.live-show').boundingClientRect(function (rect) {
					if (rect === null) {
						console.log("live-player live-show rect is null");
						return;
					}

					// marginTop: 
					var showMarginTop = Math.random() * (rect.height - _this.data.recordScreen.textHeight);

					// marginLeft:
					var showMarginLeft = Math.random() * (rect.width - _this.data.recordScreen.textWidth);

					_this.setData({
						'recordScreen.marginLeft': showMarginLeft,
						'recordScreen.marginTop': showMarginTop,
					})
				}).exec();
			}, 300);
		}, 10000);

		_this.setData({
			'recordScreen.text': text,
			'recordScreen.isHidden': false,
			'recordScreen.recordScreenInterval': interval,
		}, () => {
			//计算出text的宽
			setTimeout(() => {
				wx.createSelectorQuery().select('.recordScreenClass').boundingClientRect(function (rect) {
					if (rect === null) {
						console.log("recordScreenClass rect is null");
						return;
					}
					_this.setData({
						'recordScreen.textWidth': rect.width + 10,
					})
				}).exec();
			}, 300);
		})
	},

	//关闭防录屏
	endRecordScreen: function () {
		var _this = this;
		clearInterval(_this.data.recordScreen.recordScreenInterval);
		_this.setData({
			'recordScreen.isHidden': true,
			'recordScreen.recordScreenInterval': null,
		})
	},

	getRoomIcons: function () {
		var _this = this;
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
		}
		mzplugin.mzSDK.getOnlines(data).then(function (res) {
			_this.newHeader(res)
		})
	},

	getMsg: function (res) {
		var _this = this;
		console.log(res)
		console.log(res.user_id)
		if (_this.data.chatUid == res.user_id) {
			return;
		} else {
			_this.sendDanmu(res.data.text);

			var aMessage = {
				text: {
					avatar: res.avatar,
					user_name: res.user_name,
					data: {
						text: res.data.text
					}
				}
			}
			_this.data.allCommentList.push(aMessage);

			// 判断筛选条件里是否有这条消息的user_id
			var isHasMe = _this.data.filterConditions.indexOf(res.user_id);
			if (isHasMe >= 0) {
				_this.data.filterCommentList.push(aMessage);
			}
			_this.setData({
				commentList: _this.data.onlyHostIsEnable ? _this.data.filterCommentList : _this.data.allCommentList
			}, () => {
				_this.setData({
					scrollTop: _this.data.commentList.length * 1000,
				})

			})
		}
	},

	getChannel: function (res) {
		var _this = this;
		if (res.data.type == "uv") {
			_this.uv(res)
		}
	},
	//用户上线
	getOnline: function (res) {
		console.log('用户上线', res, arr);
		var _this = this;
		var arr = _this.data.iconList;

		//用户上线提示
		_this.setData({
			userOnlineName: res.user_name
		}, () => {
			_this.createUserOnlineAnimation()
		})


		if (!res.avatar) {
			return;
		}

		if (res.user_id > 5000000000) {
			return;
		}

		arr.push(res.avatar);
		_this.unique(arr);
		if (arr.length > 3) {
			arr.shift();
		}
		_this.setData({
			iconList: [].concat(arr)
		})

		// 增加人气
		_this.data.defaultInfo.popular = _this.data.defaultInfo.popular + 1;
		var temp_popular = _this.fixPopular(_this.data.defaultInfo.popular)
		_this.setData({
			'defaultInfo.anchorPopularityNum': temp_popular
		})
	},

	//用户下线
	getOffline: function (res) {
		console.log("用户下线")
	},

	//目前是别人给播主打赏或者送礼物消息//商城订单付款消息(v1.2版本新增)
	getComplete: function (res) {
		var _this = this;
		if (res.data.type == "goods_spread") {
			console.log("推送商品")
			_this.addGoodsItemPush(res)
		} else if (res.data.type == "reward") {
			console.log("观众给主播打赏");
		} else if (res.data.type == "gift") {
			console.log("观众给主播送礼物:", res);
			var aMessage = {
				text: res
			}
			_this.data.allCommentList.push(aMessage);
			// 判断筛选条件里是否有这条消息的user_id
			var isHasMe = _this.data.filterConditions.indexOf(res.user_id);
			if (isHasMe >= 0) {
				_this.data.filterCommentList.push(aMessage);
			}
			_this.setData({
				commentList: _this.data.onlyHostIsEnable ? _this.data.filterCommentList : _this.data.allCommentList
			}, () => {
				_this.setData({
					scrollTop: _this.data.commentList.length * 1000,
				})
			})
		} else if (res.data.type == "prizeSign") {
			console.log("抽奖活动用户签到完成通知");
		} else if (res.data.type == "prizeWinner") {
			console.log("抽奖活动用户中奖通知");
		} else {
			console.log("complete时间，未处理的类型：", res.data.type);
		}
	},

	getCmd: function (res) {
		console.log("getCmd:", res);
		var _this = this;
		switch (res.data.type) {
			case "*over":
				console.log("*确认：主播暂时离开");
				_this.channelPause();
				break;
			case "*channelStart":
				console.log("*确认：频道有新的直播开始了");
				_this.channelStart(res.data.ticket_id);
				break;
			case "*publishStart":
				console.log("*确认：断流恢复了");
				_this.ticketStart();
				break;
			case "*liveEnd":
				console.log("*确认：直播结束")
				_this.overLive(res);
				break;
			case "*disablechat":
				console.log("*确认：禁言")
				_this.disablechat(res);
				break;
			case "*permitchat":
				console.log("*确认：解禁")
				_this.permitchat(res);
				break;
			case "*webinarViewConfigUpdate": //活动配置更改
				for (const aObject in res.data.webinar_content) {
					if (res.data.webinar_content.hasOwnProperty(aObject)) {
						const element = res.data.webinar_content[aObject];
						switch (element.type) {
							case "hide_chat_history": //历史记录隐藏的开关
								_this.data.ticketConfig.isOpenHide_chat_history = element.is_open;
								break;
							case "disable_chat": //全体禁言开关
								_this.data.ticketConfig.isOpenDisable_chat = element.is_open;
								break;
							case "barrage": //弹幕开关
								_this.data.ticketConfig.isOpenDanMu = element.is_open;
								break;
							case "record_screen": //防录屏开关
								_this.data.ticketConfig.isOpenRecord_screen = element.is_open;
								if (_this.data.ticketConfig.isOpenRecord_screen == true) {
									_this.startRecordScreen("");
								} else {
									_this.endRecordScreen();
								}
								break;
							case "vote": //投票开关
								_this.setData({
									"ticketConfig.isOpenVote": element.is_open
								})
								break;
							case "sign": //签到开关
								_this.data.ticketConfig.isOpenSign = element.is_open;
								if (!element.is_open) {
									_this.setData({
										is_signbtn_show: false
									})
								}
								break;
							case "documents": //文档开关，非实时的，所以这里没有处理，如果需要可以自行处理
								_this.data.ticketConfig.isOpenDocuments = element.is_open;
								break;
							case "prize": //抽奖开关
								_this.data.ticketConfig.isOpenPrize = element.is_open;
								break;
							case "full_screen": //暖场图开关，这里没有处理，如果需要可以自行处理
								_this.data.ticketConfig.isOpenFull_screen = element.is_open;
								break;
							case "open_like": //点赞视图开关
								_this.data.ticketConfig.isOpenLike = element.is_open;
								break;
							case "pay_gift": //礼物视图开关
								_this.data.ticketConfig.isOpenGift = element.is_open;
								break;
							case "times_speed": //倍速视图开关
								_this.data.ticketConfig.isOpenSpeed = element.is_open;
								break;
							default:
								console.log("未处理的活动配置开关：", element.type);
								break;
						}
					}
				}
				break;
			case "*kickout": //收到一条踢出用户的消息
				console.log("用户 ", res.data.user_id, " 被踢出");
				_this.kickoutUser(res.data.user_id);
				break;
			case "*answerNewReplyMsg":
				_this.setData({
					unreadNum: res.data.count
				})
				console.log("问答：我的提问有一条新的回复，目前未读个数为 ", res.data.count);
				break;
			case "*docSwitchPage":
				console.log("直播过程中，主播切换文档：", res.data.file_name, res.data.url);
				var urls = []
				urls.push(res.data.url)
				_this.setData({
					documentTitleName: res.data.file_name,
					documentImgUrls: urls,
					documentCurrentPage: 1
				}, () => {
					console.log('documentImgUrls', _this.data.documentImgUrls)
				})
				break;
			default:
				console.log("未处理的cmd命令： ", res.data.type);
				break;
		}
	},

	disablechat: function (res) {
		var _this = this;
		if (res.data.user_id == _this.data.chatUid) {
			console.log('已被禁言');
			_this.setData({
				disablechat: true
			})
		}
	},
	permitchat: function (res) {
		var _this = this;
		if (res.data.user_id == _this.data.chatUid) {
			console.log('已被解禁')
			_this.setData({
				disablechat: false
			})
		}
	},
	uv: function () {
		var _this = this;
		var uv_temp = "";
		if (res.data.uv > 10000) {
			uv_temp = Math.floor(res.data.uv / 1000) / 10 + "万"
		} else {
			uv_temp = res.data.uv;
		}
		_this.setData({
			uv: uv_temp
		})
	},

	formateSeconds: function (endTime) {
		let secondTime = parseInt(endTime)
		let min = 0
		let h = 0
		let result = ''
		if (secondTime > 60) {
			min = parseInt(secondTime / 60)
			secondTime = parseInt(secondTime % 60)
			if (min > 60) {
				h = parseInt(min / 60)
				min = parseInt(min % 60)
			}
		}
		result =
			`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
		return result
	},

	//收到一条踢出用户消息
	kickoutUser: function (user_id) {
		if (this.data.chatUid == user_id) {
			console.log("自己被管理员踢出房间了");
			this.setData({
				disablechat: true
			})
		}
	},

	overLive: function (res) {
		var _this = this;
		var time_temp = _this.formateSeconds(res.data.duration)
		_this.setData({
			cmdLiveEndTimr: setTimeout(function () {
				_this.setData({
					overLiveState: true,
					uv: res.data.uv,
					duration: time_temp
				})
			}, 15000)

		})
	},

	channelPause: function () {
		var _this = this;
		console.log("直播推流暂停，等待15秒后提示暂离")
		_this.setData({
			cmdOverTimer: setTimeout(function () {
				console.log("提示暂离")
				_this.setData({
					liveState: "3"
				})
			}, 15000)
		})
	},

	//直播活动断流恢复
	ticketStart: function () {
		console.log("直播断流恢复，初始化页面，并修改断流状态")
		clearTimeout(this.data.cmdOverTimer)
		mzplugin.mzSDK.disconnect();
		this.getLiveRoomInfo();
		// this.setData({
		// 	liveShow: false,
		// })
	},
	//频道有新活动开始直播了
	channelStart: function (ticket_id) {
		if (ticketId == this.data.pageInfo.ticketId) {
			this.ticketStart();
		}
	},

	//加载更多的旧的历史消息
	commentsLoadOld: function () {
		var _this = this;

		if (this.data.comments.isLoadOver == true) {
			console.log("所有数据都加载完了，不需要再加载了");
			return;
		}
		wx.showLoading({
			title: "加载中",
		})
		console.log("加载更多的旧的历史消息");
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
			offset: _this.data.comments.offset,
			limit: _this.data.comments.limit,
		}
		mzplugin.mzSDK.getHistory(data).then(function (res) {
			// 这里过滤只看主播的数据(_this.data.filterConditions，这里是需要过滤的用户id列表)
			var filterMessage = res.filter(item => {
				var isFilter = _this.data.filterConditions.indexOf(item.text.user_id);
				if (isFilter >= 0) {
					return true;
				} else {
					return false;
				}
			}, )

			_this.setData({
				'comments.offset': _this.data.comments.offset + res.length,
				'comments.isLoadOver': res.length < 20 ? true : false,
				allCommentList: res.concat(_this.data.allCommentList),
				filterCommentList: filterMessage.concat(_this.data.filterCommentList),
			}, () => {
				_this.setData({
					commentList: _this.data.onlyHostIsEnable ? _this.data.filterCommentList : _this.data.allCommentList
				}, () => {
					console.log(_this.data.commentList);
					_this.scrollToOldData();
					wx.hideLoading();
				})
			})
		});
	},

	//初次获取历史信息
	getHistoryInfo: function () {
		var _this = this;

		if (this.data.ticketConfig.isOpenHide_chat_history == true) { //隐藏历史记录
			this.setData({
				commentList: _this.data.commentList.concat({
					type: "vioTips",
					info: _this.data.ticketConfig.notice
				}),
			})
			return;
		}
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
			offset: _this.data.comments.offset,
			limit: _this.data.comments.limit,
		}
		mzplugin.mzSDK.getHistory(data).then(function (res) {
			console.log('历史消息', res)
			console.log("过滤条件：", _this.data.filterConditions);
			// 这里过滤只看主播的数据(_this.data.filterConditions，这里是需要过滤的用户id列表)
			var filterMessage = res.filter(item => {
				var isFilter = _this.data.filterConditions.indexOf(item.text.user_id);
				if (isFilter >= 0) {
					return true;
				} else {
					return false;
				}
			}, )
			_this.setData({
				'comments.offset': res.length,
				'comments.isLoadOver': res.length < _this.data.comments.limit ? true : false,
				allCommentList: [].concat(res).concat({
					type: "vioTips",
					info: _this.data.ticketConfig.notice
				}),
				filterCommentList: [].concat(filterMessage).concat({
					type: "vioTips",
					info: _this.data.ticketConfig.notice
				})
			}, () => {
				_this.setData({
					commentList: _this.data.onlyHostIsEnable ? _this.data.filterCommentList : _this.data.allCommentList
				}, () => {
					_this.scrollToBottom();
				})
			})
		});
	},

	//获取活动的所有开关配置
	getWebinarToolsList: function () {
		var _this = this;
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
		}
		mzplugin.mzSDK.getWebinarToolsList(data).then(function (res) {
			console.log("返回活动所有开关配置：", res);

			var isOpenLike = true;
			var isOpenGift = true;
			var isOpenSpeed = true;
			for (const aObject in res.tools) {
				if (Object.hasOwnProperty.call(res.tools, aObject)) {
					const element = res.tools[aObject];
					if (element.tools == "open_like") { //点赞按钮展示开关
						isOpenLike = Boolean(element.is_open);
					} else if (element.tools == "pay_gift") { //礼物展示开关
						isOpenGift = Boolean(element.is_open);
					} else if (element.tools == "times_speed") { //倍速展示开关
						isOpenSpeed = Boolean(element.is_open);
					}
				}
			}
			console.log("点赞：", isOpenLike, " 礼物：", isOpenGift, " 倍速：", isOpenSpeed);
			_this.setData({
				'ticketConfig.isOpenLike': isOpenLike,
				'ticketConfig.isOpenGift': isOpenGift,
				'ticketConfig.isOpenSpeed': isOpenSpeed
			})
		}, function (err) {
			console.log("获取活动所有配置接口请求错误: ", err);
		})
	},

	//获取直播间信息
	getLiveRoomInfo: function () {
		var _this = this;
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
			uniqueId: encodeURIComponent(_this.data.currentUser.uniqueId),
			name: encodeURIComponent(_this.data.currentUser.nickName),
			avatar: encodeURIComponent(_this.data.currentUser.avatarUrl),
			extendObject: {
				accountNo: _this.data.currentUser.uniqueId,
			},
		}

		mzplugin.mzSDK.getTicketInfo(data).then(function (res) {
			mzplugin.mzSDK.connect();
			var temp_popular = _this.fixPopular(res.popular)
			console.log("playinfo = ", res);
			_this.data.currentUser.uniqueId = res.unique_id;
			console.log("活动状态 = " + res.status);
			var isLive = (res.status == "2" || res.status == "0") ? false : true;
			var videoURLString = isLive ? res.video.url : res.video.http_url;
			var stateString = "直播";
			if (isLive == false) {
				if (res.status == "0") {
					stateString = "未播";
				} else {
					stateString = "回放";
				}
			}
			if (res.status == "3") { //断流不显示封面
				_this.setData({
					coverIsHidden: true,
				})
			}

			console.log(isLive == true ? "直播或者断流" : "回放或者未开播");
			console.log("播放的地址是" + videoURLString);

			// 处理活动配置开关
			var right = res.right;
			for (const object in right) {
				if (right.hasOwnProperty(object)) {
					const element = right[object];
					switch (element.type) {
						case "barrage":
							console.log("配置弹幕");
							_this.data.ticketConfig.isOpenDanMu = element.is_open;
							break;
						case "disable_chat":
							console.log("配置是否禁止聊天");
							_this.data.ticketConfig.isOpenDisable_chat = element.is_open;
							break;
						case "hide_chat_history":
							console.log("配置是否隐藏历史聊天记录");
							_this.data.ticketConfig.isOpenHide_chat_history = element.is_open;
							break;
						case "record_screen":
							console.log("配置是否开启防录屏");
							_this.data.ticketConfig.isOpenRecord_screen = element.is_open;
							if (_this.data.ticketConfig.isOpenRecord_screen == true) {
								_this.startRecordScreen("");
							} else {
								_this.endRecordScreen();
							}
							break;
						case "vote":
							console.log("配置是否显示投票");
							_this.setData({
								"ticketConfig.isOpenVote": element.is_open
							})
							break;
						case "sign":
							console.log("配置是否显示签到，还需要处理签到的数据：", element.content);
							_this.data.signInfoBean = element.content
							_this.data.signInfoBean.access_url = _this.data.signInfoBean.access_url + '&source_mini=applet_plug'
							console.log('_this.data.signInfoBean.access_url ======>' , _this.data.signInfoBean.access_url)
							break;
						case "prize":
							console.log("配置是否显示抽奖，还需要处理抽奖的数据：", element.content);
							_this.data.ticketConfig.isOpenPrize = element.is_open;
							break;
						case "documents":
							console.log("配置是否显示文档");
							_this.data.ticketConfig.isOpenDocuments = element.is_open;
							break;
						case "full_screen":
							console.log("配置是否显示暖场图");
							_this.data.ticketConfig.isOpenFull_screen = element.is_open;
							break;
						default:
							break;
					}
				}
			}
			// 处理自定义公告
			var cNotice = "盟主直播依法对直播内容进行24小时巡查，禁止传播暴力血腥、低俗色情、招嫖诈骗、非法政治活动等违法信息，坚决维护社会文明健康环境";
			if (res.notice.notice_content.length > 0) {
				cNotice = res.notice.notice_content;
			}
			// 处理语音播放动画
			if (res.live_type == 1 && res.status != 0) {
				_this.showAudioAnimation();
			}

			_this.setData({
				webinar_onlines: res.webinar_onlines, //进入直播间的时候观众人数
				view_mode: res.view_mode, //观看方式 1免费 2vip 3付费 4密码 5白名单 6F码
				video_advert: res.video_advert, //是否有片头广告
				live_type: res.live_type, //0是视频，1是音频
				// live_style: res.live_style, //0是横屏，1是竖屏
				like_num: res.like_num, //点赞个数
				cover: res.cover, //封面图
				'defaultInfo.channelId': res.channel_id,
				'defaultInfo.anchorPopularityNum': temp_popular,
				'defaultInfo.popular': res.popular,
				liveState: res.status, //设置活动状态，选择使用标签
				'defaultInfo.anchorTicketState': stateString,
				videoUrl: videoURLString, //视频流地址，直播和断流是rtmp，回放是http
				chatUid: res.chat_uid, //自己在聊天室里的uid
				'ticketConfig.notice': cNotice, //消息公告
				filterConditions: _this.data.filterConditions.concat(res.chat_uid),
				video_advert: res.video_advert, //是否开启片头广告
			}, () => {
				if (res.user_status == 3) { //3是禁言，2是被踢出
					_this.setData({
						disablechat: true
					})
				}
				_this.getRoomIcons();
				_this.getHistoryInfo();
				if (_this.data.ticketConfig.isOpenDocuments == 1 && _this.data.liveState == '2') {
					_this.getDocumentList();
				} else if (_this.data.ticketConfig.isOpenDocuments == 1 && _this.data.liveState == '1') {
					_this.getDocumentInfo('')
				}

				if (_this.data.ticketConfig.isOpenFull_screen == false) { //如果不显示暖场图，那就直接开始播放
					if (_this.initSign()) {

					}
					if (res.video_advert == 1) {
						_this.setData({
							isADShow: true
						})
					} else {
						if (isLive) {
							_this.playContext.play();
						} else {
							_this.videoContext.play();
						}
					}
				} else {
					_this.setData({
						isShowFullScreenComponent: true
					})
				}
			})
			if (_this.data.live_style == 1 && (_this.data.liveState == "1" || _this.data.liveState == "3")) {
				_this.controlIsShow(null);
			}

		}, function (err) {
			wx.showToast({
				icon: 'none',
				title: err.msg,
			})
			console.log("获取直播间详情错误: ", err);
		})
	},

	//判断签到状态是否弹出签到提示框
	initSign() {
		var signInfoBean = this.data.signInfoBean
		if (signInfoBean.is_sign == true) {
			this.setData({
				is_sign: true
			})
		}
		if (signInfoBean.is_sign == false) {
			this.setData({
				is_sign: false
			})
		}
		if (signInfoBean.is_force == 1 && // 是否强制签到 0:否 1:是'
			signInfoBean.is_expired == 0 && //签到是否过期 0没过期 1过期
			signInfoBean.redirect_sign == 1 && //是否是直接签到 0:否 1:是
			signInfoBean.delay_time == 0 && //签到延迟分钟
			!signInfoBean.is_sign && // 是否已签到 0:否 1:是
			signInfoBean.status == 1) { // 签到场次状态 0:未开始 1:进行中 2:已结束'
			this.setData({
				signInfoBean: signInfoBean,
				isPageShow: true
			})
			return true
		} else if (signInfoBean.is_force == 1 && // 是否强制签到 0:否 1:是'
			signInfoBean.is_expired == 0 && //签到是否过期 0没过期 1过期
			signInfoBean.redirect_sign == 1 && //是否是直接签到 0:否 1:是
			signInfoBean.delay_time > 0 && //签到延迟分钟
			!signInfoBean.is_sign && // 是否已签到 0:否 1:是
			signInfoBean.status == 1) { // 签到场次状态 0:未开始 1:进行中 2:已结束'
			this.delaySign()
			return true
		} else {
			return false
		}
	},

	//延迟弹出签到
	delaySign() {
		var that = this
		var signInfoBean = this.data.signInfoBean
		this.data.delayobj == setTimeout(() => {
			that.setData({
				signInfoBean: signInfoBean,
				isPageShow: true
			})
		}, this.data.signInfoBean.delay_time * 60000);
		console.log('this.data.delayobj1' , this.data.delayobj)
	},

	//签到按钮点击事件
	signClick() {
		var signInfoBean = this.data.signInfoBean
		if (signInfoBean.is_expired == 1) {
			wx.showToast({
				title: '签到过期无法签到', //提示的内容,
				icon: 'none', //图标,
			});
		} else {
			if (!signInfoBean.is_sign) {
				if (signInfoBean.status == 1) {
					console.log('this.data.delayobj' , this.data.delayobj)
					clearTimeout(this.data.delayobj)
					this.setData({
						signInfoBean: signInfoBean,
						isPageShow: true
					})
				} else if (signInfoBean.status == 0) {
					wx.showToast({
						title: '签到活动未开始', //提示的内容,
						icon: 'none', //图标,
					});
				} else {
					wx.showToast({
						title: '签到活动已结束', //提示的内容,
						icon: 'none', //图标,
					});
				}
			} else {
				this.setData({
					signInfoBean: signInfoBean,
					isPageShow: true
				})
			}
		}
	},

	fixPopular: function (popular) {
		if (popular > 10000) {
			return Math.floor(res.popular / 1000) / 10 + "万"
		} else {
			return popular;
		}
	},

	statechange: function (res) {
		var _this = this;
		if (res.detail.code == 2004) { //开始播放了
			this.setData({
				coverIsHidden: true,
			})
		}
		console.log(res.detail.code);
	},

	error: function (error) {
		wx: wx.showToast({
			title: error.detail.errCode,
			duration: 5000,
			mask: true,
			success: (res) => {},
			fail: (res) => {},
			complete: (res) => {},
		})
	},

	//商品切换动画
	goodsAnimation: function (list, nextEvent) {
		var _this = this;
		clearTimeout(_this.timerDefault)
		clearTimeout(_this.timerPush)
		var animation = wx.createAnimation({
			duration: 300,
			timingFunction: "linear",
			delay: 0,
			transformOrigin: "50% 50% 0",
		});
		animation.left("-24.665vw").bottom("8vw").scale(0).step();

		animation.left("0vw").bottom("16vw").scale(1).step();

		//操作变更默认数据
		_this.setData({
			'defaultInfo.goodsItemPic': list.pic,
			'defaultInfo.goodsItemName': list.name,
			'defaultInfo.goodsItemCurrency': "¥",
			'defaultInfo.goodsItemPrice': list.price,
			'defaultInfo.buy_url': list.buy_url,
			loopAnimationStart: animation.export(),
		});

		if (nextEvent == "default") {
			_this.startDefaultAnimation()
		}
	},

	startDefaultAnimation: function () {
		var _this = this;
		_this.setData({
			AnimationState: "default"
		});
		_this.numDefault = _this.numDefault || 0;
		if (_this.data.defaultInfo.name == "") {
			_this.goodsAnimation(_this.data.goodsListDataReverse[_this.numDefault % _this.data.goodsListDataReverse.length],
				"default");
		} else if (_this.data.goodsListDataReverse.length > 0) {
			if (_this.numDefault == 0) {
				_this.numDefault++;
				_this.goodsAnimation(_this.data.goodsListDataReverse[0], "default");
			} else {
				_this.timerDefault = setTimeout(function () {
					_this.numDefault++;
					_this.goodsAnimation(_this.data.goodsListDataReverse[_this.numDefault % _this.data.goodsListDataReverse
						.length], "default");
				}, 6000);
			}
		}
	},

	startPushAnimation: function () {
		var _this = this;

		var goodsItemPush = _this.data.goodsItemPush || [];
		if (_this.numPush) {
			return;
		}
		_this.numPush = true;

		if (goodsItemPush.length > 0) {

			let temp_item = goodsItemPush[0];
			_this.goodsAnimation(temp_item);
			_this.setData({
				loopAnimationStart: ""
			})

			_this.timerPush = setTimeout(() => {
				_this.numPush = false;
				let temp_arr = [].concat(goodsItemPush);
				temp_arr.shift();
				_this.setData({
					goodsItemPush: temp_arr
				})
				_this.startPushAnimation();
			}, 11000)
		} else {
			_this.numPush = false;
			_this.startDefaultAnimation();
		}
	},
	// 只看主播开关事件
	listenerSwitch: function (e) {
		var _this = this;
		console.log('只看主播开关的当前状态-----', e.detail.value);
		this.setData({
			onlyHostIsEnable: e.detail.value,
			commentList: e.detail.value ? _this.data.filterCommentList : _this.data.allCommentList
		}, () => {
			_this.scrollToBottom();
		})

	},
	// 只看主播界面禁止手势向下穿透
	noPointsEvent: function (e) {
		console.log("禁止穿透");
	},
	//获取主播信息
	getAchorInfo: function () {
		var _this = this;
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
		}
		mzplugin.mzSDK.getHostInfo(data).then(function (res) {
			console.log(res);
			_this.setData({
				'defaultInfo.anchorName': res.nickname,
				'defaultInfo.anchorPic': res.avatar,
				'defaultInfo.uid': res.uid,
				//添加过滤条件消息
				filterConditions: _this.data.filterConditions.concat(res.uid)
			})
		})
	},

	//获取商品列表数据
	getGoodsListData: function () {
		var _this = this;
		var data = {
			ticketId: _this.data.pageInfo.ticketId,
			type: 5,
			offset: 0,
			limit: 50,
		}
		mzplugin.mzSDK.getGoods(data).then(function (res) {
			_this.setData({
				goodsListData: _this.data.goodsListData.concat(res.list.reverse()),
			}, () => {
				if (_this.data.goodsListData.length > 0) {
					_this.renderGoodsListData();
				}
			});
		})
	},

	//渲染商品列表数据
	renderGoodsListData: function () {
		var _this = this;
		_this.setData({
			goodsListDataReverse: _this.data.goodsListData.reverse(),
		}, () => {
			_this.setData({
				'defaultInfo.allGoodsNum': _this.data.goodsListData.length,
			})

		});

		_this.startDefaultAnimation()
	},

	//根据URL中的参数设置当前页面接下来连接数据的相关参数
	setParam: function (param) {

		var playerTop = '142rpx';
		if (app.globalData.isIphoneX) {
			playerTop = '182rpx';
		}
		if (param.live_style == 1) {
			playerTop = '0rpx';
		}

		this.setData({
			'pageInfo.ticketId': param.ticket_id,
			live_style: param.live_style,
			playerViewTop: playerTop
		});
	},

	//聊天框高度
	setCommentAreaHeight: function () {
		if (this.data.commentAreaHeight > 0) {
			return;
		}

		let _this = this
		console.log("setCommentAreaHeight start");
		setTimeout(() => {
			wx.createSelectorQuery().select('.comment-info').boundingClientRect(function (rect) {
				if (rect === null) {
					console.log("setCommentAreaHeight rect is null");
					return;
				}
				_this.data.commentAreaHeight = parseInt(rect.height);
			}).exec();
		}, 100);
	},

	commentsScroll: function (event) {

	},

	//历史聊天数据请求更旧的数据的时候，滑动的位置
	scrollToOldData: function () {
		var _this = this;
		wx.createSelectorQuery().select('.comment-items').boundingClientRect(function (rect) {
			if (rect === null) {
				console.log("scrollToBottom rect is null");
				return;
			}
			_this.setData({
				scrollTop: parseInt(rect.height) - _this.data.comments.oldHeight,
				'comments.oldHeight': parseInt(rect.height),
			})
		}).exec();
	},

	//聊天框滚动到最下
	scrollToBottom: function () {
		console.log("scrollToBottom start");
		this.setCommentAreaHeight();
		setTimeout(() => {
			let _this = this;
			wx.createSelectorQuery().select('.comment-items').boundingClientRect(function (rect) {
				if (rect === null) {
					console.log("scrollToBottom rect is null");
					return;
				}
				_this.setData({
					'comments.oldHeight': parseInt(rect.height),
					scrollTop: parseInt(rect.height) - _this.data.commentAreaHeight + 100,
				})
				console.log("scrollTo: " + (parseInt(rect.height) - _this.data.commentAreaHeight + 100));
			}).exec();
		}, 300);
	},

	//点击完成按钮时触发
	userAddComment: function (e) {
		var _this = this;
		_this.tapHideKeyboardAction();
		if (_this.data.ticketConfig.isOpenDisable_chat == true) {
			wx.showToast({
				icon: 'none',
				title: '主播已设置该活动禁止聊天',
			})
			return;
		}

		var data = e.detail.value;
		console.log("唯一标识符和昵称都不能为空");
		console.log("唯一标识符：", _this.data.currentUser.uniqueId + "      昵称：", _this.data.currentUser.nickName)

		var aMessage = {
			text: {
				user_name: _this.data.currentUser.nickName,
				avatar: _this.data.currentUser.avatarUrl,
				data: {
					text: data
				}
			}
		}
		_this.data.allCommentList.push(aMessage);

		// 判断筛选条件里是否有自己的chatUid
		var isHasMe = _this.data.filterConditions.indexOf(_this.data.chatUid);
		if (isHasMe >= 0) {
			_this.data.filterCommentList.push(aMessage);
		}

		_this.setData({
			test: "",
			inputShow: false,
			commentList: _this.data.onlyHostIsEnable ? _this.data.filterCommentList : _this.data.allCommentList,
			scrollTop: _this.data.commentList.length * 1000,
		});
		mzplugin.mzSDK.push(data);

		_this.sendDanmu(data);
	},

	// 发送弹幕
	sendDanmu: function (data) {
		console.log("danmuneirong:", data);
		var _this = this;
		// 发送弹幕
		if (data.length > 0 && _this.data.ticketConfig.isOpenDanMu == true) {
			this.videoContext.sendDanmu({
				text: data,
				color: "#FF1F60"
			})
		}
	},

	//文本框获取焦点-处理键盘高度
	userAddCommentfocus: function (e) {
		console.log("点击了文本框")
		var _this = this;
		var height = e.detail.height
		_this.setData({
			inputHeight: height + "px",
			classNameKeyboardUp: "user-addcomment-up",
			showTapHideKeyboard: true
		});
	},

	// 点击空白处隐藏键盘
	tapHideKeyboardAction: function (e) {
		var _this = this;
		wx.hideKeyboard({
			success: (res) => {},
		})
		_this.setData({
			inputHeight: '3.2vw',
			classNameKeyboardUp: "user-addcomment",
			inputShow: false,
			showTapHideKeyboard: false
		});
	},
	//文本框失去焦点-处理键盘高度
	userAddCommentblur: function (e) {
		return;
		var _this = this;
		_this.setData({
			inputHeight: '3.2vw',
			classNameKeyboardUp: "user-addcomment",
			inputShow: false
		});
	},

	//轮播商品清单中的商品
	changeGoodsItemName: function (i) {
		this.setData({
			'defaultInfo.goodsItemPic': this.data.goodsListDataReverse[i].pic,
			'defaultInfo.goodsItemName': this.data.goodsListDataReverse[i].name,
			'defaultInfo.goodsItemCurrency': "¥",
			'defaultInfo.goodsItemPrice': this.data.goodsListDataReverse[i].price,
			'defaultInfo.buy_url': this.data.goodsListDataReverse[i].buy_url
		})
	},

	//增加推送商品队列
	addGoodsItemPush: function (res) {
		var _this = this;
		var goodsItemPush = _this.data.goodsItemPush || [];
		goodsItemPush.push({
			name: res.data.name,
			pic: res.data.pic,
			price: res.data.price,
			url: res.data.url,
		});
		_this.setData({
			goodsItemPush: goodsItemPush
		}, () => {
			_this.startPushAnimation()
		})

	},

	//轮播推送的商品
	changePushGoodsItemPush: function (i) {
		this.setData({
			'defaultInfo.goodsItemPic': this.data.goodsItemPush[i].pic,
			'defaultInfo.goodsItemName': this.data.goodsItemPush[i].name,
			'defaultInfo.goodsItemCurrency': "¥",
			'defaultInfo.goodsItemPrice': this.data.goodsItemPush[i].price,
			'defaultInfo.buy_url': this.data.goodsItemPush[i].url
		})
	},

	clearGoodsItemPush: function () {
		var _this = this;
		_this.setData({
			goodsItemPush: [],
		})
	},

	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},

	//关注主播
	followAnchor: function () {
		console.log("关注主播")
	},

	unique: function (arr) {
		for (var i = 0; i < arr.length; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
					arr.splice(j, 1);
					j--;
				}
			}
		}
		return arr;
	},

	//设置新的用户头像
	newHeader: function (res) {
		var _this = this;
		var arr = []; //用来存放user_id不同的最后三个用户的头像
		for (var i = 0; i < res.length; i++) {
			if (res[i].uid < 5000000000) {
				arr.push(res[i].avatar)
			}
		}
		arr = this.unique(arr);

		if (arr.length > 3) {
			arr = arr.slice(-3)
		}
		_this.setData({
			iconList: [].concat(arr)
		})
	},

	//商品信息
	showGoodsInfo: function () {
		this.setData({
			goodsListState: true
		})
	},

	//打开设置弹层
	openSettingPopup: function () {
		this.setData({
			settingPopupState: true
		})
	},

	//关闭设置弹层
	closeSettingPopup: function () {
		this.setData({
			settingPopupState: false
		})
	},

	//显示全部商品弹层
	openShopping: function (e) {
		var _this = this;
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: 'linear'
		})
		_this.animation = animation
		animation.translateY(1000).step()
		_this.setData({
			animationData: animation.export(),
			chooseSize: true
		})
		setTimeout(function () {
			animation.translateY(0).step()
			_this.setData({
				animationData: animation.export(),
				clearcart: false
			})
		}, 30)
	},

	closeShopping: function (e) {
		var _this = this;
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: 'linear'
		})
		_this.animation = animation
		animation.translateY(700).step()
		_this.setData({
			animationData: animation.export()
		})
		setTimeout(function () {
			animation.translateY(0).step()
			_this.setData({
				animationData: animation.export(),
				chooseSize: false
			})
		}, 200)
	},
	closeShoppingPic: function (e) {
		var _this = this;
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: 'linear'
		})
		_this.animation = animation
		animation.translateY(700).step()
		_this.setData({
			animationData: animation.export()
		})
		setTimeout(function () {
			animation.translateY(0).step()
			_this.setData({
				animationData: animation.export(),
				chooseSize: false
			})
		}, 200)
	},

	toBuyGoods: function (e) {
		console.log("1商品购买连接是：" + e.currentTarget.dataset.url)
	},

	toLogin: function () {
		console.log("您是访客，请登录后再发表言论。")
	},

	activeInput: function () {
		this.setData({
			inputShow: true
		})
	},
	//弹出退出框
	ComponentsQuitPageTap: function (e) {
		this.setData({
			auaniIsHidden: true,
			showQuitModelState: e.detail.quitPageState
		})
	},
	//点击空白处取消退出框
	_closeQuitModel: function (e) {
		this.setData({
			auaniIsHidden: false,
		})
	},
	ComponentsShowPopup: function (e) {
		this.setData({
			chooseSize: e.detail.chooseSize
		})
	},

	// 创建用户上线提示动画
	createUserOnlineAnimation: function () {
		var _this = this;
		clearTimeout(_this.data.timerUserOnline)
		_this.setData({
			"userOnlineDefaule.left": "-29.33vw",
			"userOnlineDefaule.opacity": "0",
			userOnlineAnimation: ""
		}, () => {
			var UserAnimation = wx.createAnimation({
				duration: 300,
				timingFunction: "linear",
				delay: 0,
				transformOrigin: "50% 50% 0",
			});
			UserAnimation.left("3.2vw").opacity(1).step();


			_this.setData({
				userOnlineAnimation: UserAnimation.export(),
				timerUserOnline: setTimeout(function () {
					UserAnimation.left("-29.33vw").opacity(0).step();
					_this.setData({
						userOnlineAnimation: UserAnimation.export(),
					})
				}, 2600)
			})
		})
	},
	// 进入全屏事件
	enterFull: function (res) {
		console.log(res.detail.fullscreen);
		var that = this;
		this.setData({
			isFull: res.detail.fullscreen
		})
	},

	//  控制拦是否显示
	controlIsShow: function (res) {
		var that = this;
		var cIsHidden = res && res.detail.show ? true : false;
		if (this.data.live_style == 0) {
			cIsHidden = false;
		} else {
			if (this.data.liveState == "1" || this.data.liveState == "3") {
				cIsHidden = false;
			}
		}
		if (cIsHidden) {
			this.startDefaultAnimation();
		}

		this.setData({
			controlIsHidden: cIsHidden
		})
	},

	// 当开始继续播放时 - video标签
	bindplay: function () {
		this.setData({
			coverIsHidden: true,
		})
		if (this.auani == null) {
			return
		}
		this.auani.play();
	},

	bindrendererrors: function (res) {
		console.log("ccc: ", res)
	},

	// 当暂停播放时  - video标签
	bindpause: function () {
		if (this.auani == null) {
			return
		}
		this.auani.pause();
	},

	// 横屏菜单按钮 点击事件
	menuClick: function (e) {
		var that = this;
		this.setData({
			menuShowIndex: e.detail.index
		}, () => {
			if (e.detail.index == 2) {
				that.setData({
					refreshQAData: true
				})
			}
		})
	},

	//滚动广告相关
	advertRollingComponentIsHidden: function (e) {
		console.log("滚动广告是否隐藏：", e);
		this.setData({
			isHiddenAdvertRolling: e.detail.isHidden
		})
	},

	advertRollingComponentClick: function (e) {
		console.log("滚动广告 点击了某个广告:", e);
	},

	//获取暖场图相关
	advertFullScreenEnd: function (e) {
		console.log("暖场图 结束了:", e);
		this.advertFullScreenOverToPlay();
	},
	advertFullScreenTap: function (e) {
		console.log("暖场图 点击了某个广告:", e);
		this.advertFullScreenOverToPlay();
	},
	// 暖场图结束了，处理播放事宜
	advertFullScreenOverToPlay: function () {
		var isLive = (this.data.liveState == "2" || this.data.liveState == "0") ? false : true;
		if (this.initSign()) {

		}
		if (this.data.video_advert == 1) {
			this.setData({
				isADShow: true
			})
		} else {
			if (isLive) {
				this.playContext.play();
			} else {
				this.videoContext.play();
			}
		}
		this.setData({
			isShowFullScreenComponent: false
		})
	},

	//片头视频倒计时结束回调事件
	bindADPlayEnd() {
		this.setData({
			isADShow: false
		}, () => {
			var isLive = (this.data.liveState == "2" || this.data.liveState == "0") ? false : true;
			if (isLive) {
				this.playContext.play();
			} else {
				this.videoContext.play();
			}
		})
	},

	//片头视频跳过按钮点击回调事件
	bindskipClick() {
		const mzADView = this.selectComponent("#mz-ad-view")
		mzADView.mzADPause()
		this.setData({
			isADShow: false
		}, () => {
			var isLive = (this.data.liveState == "2" || this.data.liveState == "0") ? false : true;
			if (isLive) {
				this.playContext.play();
			} else {
				this.videoContext.play();
			}
		})
	},

	//片头视频点击回调事件
	bindADClick() {
		const mzADView = this.selectComponent("#mz-ad-view")
		mzADView.mzADPause()
		this.setData({
			isADShow: false
		}, () => {
			var isLive = (this.data.liveState == "2" || this.data.liveState == "0") ? false : true;
			if (isLive) {
				this.playContext.play();
			} else {
				this.videoContext.play();
			}
		})
	},

	//礼物按钮点击事件
	giftClick() {
		this.setData({
			isGiftPopShow: true
		})
	},

	//文档相关
	getDocumentList: function () {
		var that = this
		mzplugin.mzSDK.getDocumentList(this.data.defaultInfo.channelId, this.data.pageInfo.ticketId).then(function (res) {
			console.log('获取文档列表成功===> ', res)
			if (res.length > 0) {
				that.getDocumentInfo(res[0].id)
			}
		}, function (error) {
			console.log('获取文档列表失败===> ', error)
		})
	},

	getDocumentInfo: function (document_id) {
		var that = this
		mzplugin.mzSDK.getDocumentInfo(this.data.defaultInfo.channelId, this.data.pageInfo.ticketId, document_id).then(function (res) {
			console.log('获取文档详情成功===> ', res)
			var urls = []
			if (that.data.liveState == "2") {
				var length = Number.parseInt(res.page_count) + 1
				for (let index = 1; index < length; index++) {
					var url = res.access_url + index + ".png" + res.scale;
					console.log('文档图片地址：', url)
					urls.push(url)
				}
				that.setData({
					documentImgUrls: urls,
					documentTitleName: res.file_name,
					documentCurrentPage: res.current_page,
					documentPageCount: res.page_count,
				}, () => {
					console.log('documentTitleName  ', that.data.documentTitleName)
				})
			} else if (that.data.liveState == "1") {
				urls.push(res.access_url + res.current_page + '.png' + res.scale)
				that.setData({
					documentImgUrls: urls,
					documentTitleName: res.file_name,
					documentCurrentPage: res.current_page,
					documentPageCount: res.page_count,
				})
			}
		}, function (error) {
			console.log('获取文档详情失败===> ', error)
		})
	},

	/**
	 * 放大点击事件
	 */
	largeClick: function () {
		var that = this
		var urls = []
		urls.push(that.data.documentImgUrls[that.data.documentCurrentPage - 1])
		wx.previewImage({
			current: urls[0],
			showmenu: false,
			urls: that.data.documentImgUrls //需要预览的图片链接列表,
		});
	},

	/**
	 * 文档滑动切换事件
	 * @param {*} e 
	 */
	documentPageChange: function (e) {
		this.setData({
			documentCurrentPage: e.detail.current + 1
		})
	},

	/**
	 * 右点击
	 */
	documentRightClick: function () {
		var page = this.data.documentCurrentPage + 1
		this.setData({
			documentCurrentPage: page
		})
	},

	/**
	 * 左点击
	 */
	documentLeftClick: function () {
		var page = this.data.documentCurrentPage - 1
		this.setData({
			documentCurrentPage: page
		})
	},

	voteClick: function () {
		var that = this
		this.setData({
			isVoteShow: true
		}, () => {
			console.log(that.data.isVoteShow)
		})
	},

	bindWebMessage(message) { //收到消息证明签到成功
		console.log('message =====>', message)
		var data = []
		data = message.detail.data
		if (data.length > 0 && data[0] == 'successSign') {
			this.setData({
				is_sign: true
			})
		}
		console.log('is_sign' , this.data.is_sign)
	},

	//签到页面离开前触发
	pageBeforeLeave() {
		this.setData({
			isPageShow: false
		})
	},

	pageAfterLeave() {
		//force_type 1填写后可观看 2可跳过
		var that = this
		setTimeout(() => {
			if (that.data.signInfoBean.force_type == 1 && !that.data.is_sign) {
				wx.navigateBack({
					delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
				});
			}
		}, 1000);
	}

})