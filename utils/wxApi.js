import wx from 'weixin-js-sdk'
import config from '@config'
import uniRequest from 'uni-request';
const wxApi = {
	getConfig() {
		const url = '/getTicket';
		uniRequest
			.get(url, {
				params: {
					path: window.location.href.split('#')[0]
				}
			})
			.then(response => {
				const res = response.data;
				wx.config({
					// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.appId, // 必填，公众号的唯一标识
					timestamp: res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature, // 必填，签名
					jsApiList: ['chooseImage', 'getLocalImgData','onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				});
				wx.ready = function() {
					console.log('ready ok');
				};
				wx.error(function(res) {
					console.log('wxerr', res); 
				});
				wx.ready(function() {
					console.log('ok')
					wx.checkJsApi({
						 jsApiList: [
							 'chooseImage',
							 'getLocalImgData',
							 'onMenuShareTimeline',
							 'onMenuShareAppMessage'
						 ]
					 });
					const linkUrl =`${config.host}/mobile-protal/parentReg?schoolCode=CANPOINTAI&schoolYearId=53&schoolName=AI教育中心产品部&className=一年级一班#/`
					// 分享到朋友圈
					wx.onMenuShareTimeline({
						title: '家长注册', // 分享标题
						desc: '平安校园家长注册', // 分享描述
						link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: `${config.host}/mobile-protal/ncov.png`, // 分享图标
						success: function() {
							console.log('onMenuShareTimeline')
						}
					})
					wx.onMenuShareAppMessage({
						title: '家长注册', // 分享标题
						desc: '平安校园家长注册', // 分享描述
						link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: `${config.host}/mobile-protal/ncov.png`, // 分享图标
						success: function() {
							console.log('onMenuShareAppMessage')
						}
					})
				})
			})
			.catch(error => {
				console.log(error); //异常
			});
	}
}
export default wxApi
