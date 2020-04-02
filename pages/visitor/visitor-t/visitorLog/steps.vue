<template>
	<view class="container">
		<view class="set_box" v-for="(item, index) in talk" :key="index">
			<view class="set_time">
				<view>{{ item.YYMMDD }}</view>
			</view>
			<!-- 步骤条 -->
			<view class="set-1">
				<view class="set-2">
					<view class="right qui-fx-ver">
						<text class="detail">来访事由： {{ item.cause }}</text>
						<text class="detail">来访时间： {{ item.startTime }}</text>
						<text class="detail">签离时间： {{ item.endTime }}</text>
						<text class="detail">来访时长： {{ item.duration }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			talk: [
				{
					id: 1,
					YYMMDD: '2020/2/28',
					cause: '家长会',
					startTime: '2020/2/28 11:00',
					endTime: '2020/2/28 16:00',
					duration: '5小时'
				},
				{
					id: 2,
					YYMMDD: '2020/2/27',
					cause: '看望孩子',
					startTime: '2020/2/27 11:00',
					endTime: '2020/2/27 16:00',
					duration: '5小时'
				},
				{
					id: 3,
					YYMMDD: '2020/2/26',
					cause: '拜访老师',
					startTime: '2020/2/26 11:00',
					endTime: '2020/2/26 16:00',
					duration: '5小时'
				},
				{
					id: 4,
					YYMMDD: '2020/2/27',
					cause: '看望孩子',
					startTime: '2020/2/27 11:00',
					endTime: '2020/2/27 16:00',
					duration: '5小时'
				},
				{
					id: 5,
					YYMMDD: '2020/2/26',
					cause: '拜访老师',
					startTime: '2020/2/26 11:00',
					endTime: '2020/2/26 16:00',
					duration: '5小时'
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.set_box {
	width: 100%;
	display: flex;
	flex-direction: row;
}
/* 左侧时间 */
.set_time {
	width: 20%;
	position: relative;
	view {
		width: 100%;
		position: absolute;
		margin: 30rpx 0 0 20rpx;
		color: #999;
	}
}
/* 右侧内容 */
.set-1 {
	width: 80%;
	margin-top: 60upx;
}
.set-2 {
	margin-left: 100rpx;
	position: relative;
	.right {
		.detail {
			font-size: 28rpx;
			margin-bottom: 10rpx;
		}
	}
}
.set-2::after {
	content: '';
	/* 必须存在如果没有图标就留空 */
	top: 0rpx;
	/* 定位 距离*/
	border-left: #c6c6c6 1px solid;
	/* 横线颜色 */
	left: -44rpx;
	/* 定位 距离*/
	height: 120%;
	/* 高度 */
	position: absolute;
	/* 定位 */
}

.set-2::before {
	content: '\e64d';
	/* 必须存在如果没有图标就留空 */
	color: #007aff;
	/* 设置颜色 */
	position: absolute;
	/* 定位 */
	left: -60upx;
	top: -30upx;
	/* 移动到左边 */
	font-weight: bold;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	font-family: 'iconfont' !important;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	font-size: 34upx;
	/* 图标大小 */
	font-style: normal;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	-webkit-font-smoothing: antialiased;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	-moz-osx-font-smoothing: grayscale;
	/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	z-index: 999;
}

@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395');
	/* IE9 */
	src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395#iefix') format('embedded-opentype'),
		/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOIAAsAAAAAB8QAAAM7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqCRIIjATYCJAMUCwwABCAFhG0HZhvNBsiemjwJqJERRCC3tX4YOM4iqNbCnr29uw8wKGBUsUAKqDyCjY5HcEzCALron1wr8wDk8hKBFpIc5yaXfWZJoIBIQkF1KlvVqWuFfZ3c/CBw0p8fcMJJsQY6uIuEMk8188LgXgfHTJceiXlrm0tGajTgaMCz2T6yyf5BXh+Ef9BdxMSIS9cTaKmvYGbzFhRXA1sZ2C0QO7cRAdhadnmkNTSEqufYLM4qNdKx9AJn+M/Hb2OiQVIWwL6rNufIIP1bj29voaZspAiK/byITqLAaEAmdvX6d7KQ+dEstCw2tjQL0FJDkvZald8e//3y+WglCIaW0E/e5R8vERWvuTWY5RYy3/ywXBtKXBEF395EBN++FCQ8V5CWsmEt4CBgHMz1Ad8rde7s2LbD7oUhT3l+eWHbhxwOB+LFrfkVL7I3FIAWdpdWvfHiYt8FltYWdzy1Pz/WfPhQ/elT7efPvUJiVlRsIj8+18X3az7+5Wb48vVrbnvo7OndVe1cPc55k2ebWG7OmMgYX01bT3vJnNlJWtemes0mn3vI/PJl80NQQqVErfcH/Ys5Fy3evrVoyyZNDLSq/cp5EyYsKTbb69bD/+5fmPs/cFwxG9ABoCNdTY+AKrwdi2npHk0Xu4vMH/Q7Wl+4+Yftkv83kMHXTiVutOlsnh68ZYPZit+hmDmRSxVwlDnvxvI8WOq3gz4VCy3xE8Id/d7H2GV2M6Ghi4ak1gcKDYORGTsaSq2Mg0rDTGhplLyTW+mEsRC5BUYadyC0dwpJWw+h0N53ZMb+glJX/6DSPgpoaUN4nLOVobGtZdYuJHAkQ7EbqiVqwMjF7UVrJSKKTmCmitNrETOpUzAiNLxZykMGxPY4wNRBIjnHEDOqh7nOzZBOR6GRUQ2SeKiKc2NiWBju+6JQieqBvbkYRMAhMkjUDVKTUAaYzufsW99fCSEUOgI20rMQr4UwJurloQihwmcg8/SGWT3v8hKTDkQkjsMgjKH0oFzHi+hgnoKM/VtpIBIulGpF1ihRmDcLz9WHnm/Uv0BZNAD40zJSFJGjjEq77dsEg1ahKoF2qbupYvP0KNS2e69WbmucSNZAOpEa5XpUagAAAA==')
			format('woff2'),
		url('//at.alicdn.com/t/font_1337773_f06f5a7las.woff?t=1565581133395') format('woff'),
		url('//at.alicdn.com/t/font_1337773_f06f5a7las.ttf?t=1565581133395') format('truetype'),
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url('//at.alicdn.com/t/font_1337773_f06f5a7las.svg?t=1565581133395#iconfont') format('svg');
	/* iOS 4.1- */
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-yuandian:before {
	content: '\e64d';
}

.icon-dingweiweizhi:before {
	content: '\e619';
}
</style>
