<template>
	<view class="content-circle u-padd-20 u-border-radius">
		<view v-if="showNewTag" class="u-type-white-bg u-padd-t20 u-border-radius u-fx-jc">
			<view class="new-tips u-fx-ac u-type-white u-bg-000 u-padd-10 u-border-radius" @tap="goNewList">
				<u-icon class="u-mar-r10 u-bg-fff" size="40" name="http://canpointtest.com/mobile-img/child-auto-icon.png"></u-icon>
				<text class="u-font-02">3条新消息</text>
			</view>
		</view>
		<view class="content-circle-box u-bd-b u-fx u-padd-20 u-bg-fff u-border-radius" v-for="(item, index) in 10" :key="index">
			<view class="headimg"><image class="img u-border-radius" src="http://canpointtest.com/mobile-img/person-auto.png"></image></view>
			<view class="content u-fx-f1 u-padd-l20 u-padd-r20">
				<view class="u-type-primary-dark u-font-1">林田田</view>
				<view class="u-content-color u-padd-t10">
					<u-read-more font-size="22" close-text="展开" text-indent="0" :show-height="85" :shadow-style="shadowStyle">
						今天我去帮助爷爷奶奶家吃饭了，吃完饭后我帮奶奶洗碗今天我去帮助爷爷奶奶家吃饭了~~
					</u-read-more>
				</view>
				<view class="content-img u-mar-t10">
					<!-- //只有一张图时候 -->
					<view v-if="index < 1">
						<image
							mode="widthFix"
							class="img-1"
							src="http://canpointtest.com/mobile-img/child-auto-icon.png"
							@tap="previewImg(0, ['http://canpointtest.com/mobile-img/child-auto-icon.png'])"
						></image>
					</view>
					<!-- 有多张图的时候 -->
					<view v-else>
						<view class="content-img-more u-fx-wp">
							<image
								mode="aspectFill"
								class="img-more u-mar-10"
								v-for="(src, index) in 5"
								:key="index"
								:class="index % 3 == 0 && 'u-mar-l0'"
								src="http://canpointtest.com/mobile-img/child-auto-icon.png"
								@tap="previewImg(index, ['http://canpointtest.com/mobile-img/child-auto-icon.png'])"
							></image>
						</view>
					</view>
				</view>
				<!-- 相对时间 点赞按钮等 -->
				<view class="common u-fx-jsb u-fx-ac u-font-01 u-mar-t10">
					<view class="u-tips-color">
						<text>{{ 1594777479000 | timeFrom() }}</text>
						<text v-if="userType === 1" class="u-type-primary-dark u-mar-l10 u-font-02">删除</text>
					</view>
					<transition name="fade">
						<view v-if="showAction" class="show-action u-fx-ac u-bg-color u-padd-20 u-padd-t10 u-padd-b10 u-border-radius">
							<view class="u-fx u-font-02" @tap="clickThumb(item)">
								<u-icon class="u-bold-border u-mar-r10" color="red" size="32" :name="index > 1 ? 'heart' : 'heart-fill'"></u-icon>
								<text>{{ index > 1 ? '赞' : '取消' }}</text>
							</view>
							<view class="u-fx u-font-02" @tap="handleComment(index, null, index)">
								<u-icon class="u-mar-l20 u-mar-r10" name="chat" size="32"></u-icon>
								<text>评论</text>
							</view>
						</view>
					</transition>
					<view class="u-bg-color action u-border-radius" @tap.stop="showAction = !showAction">..</view>
				</view>
				<!-- 点赞人 评论 -->
				<view class="msg-box u-bg-color u-mar-t10 u-type-primary-dark u-font-02">
					<view class="thumbinfo u-fx-wp u-fx-ac u-padd-20">
						<u-icon class="u-bold-border u-mar-r10" size="32" name="heart"></u-icon>
						<text class="" v-for="(userInfo, index) in 3" :key="userInfo.id">{{ '高宝丽' }}{{ index != 2 ? '，' : '' }}</text>
					</view>
					<view class="u-padd-20">
						<view class="u-padd-b10" v-for="(comment, index) in 3" :key="index">
							<text class="" v-if="index < 2">{{ '高宝丽' }}：</text>
							<text class="" v-if="index >= 2">
								{{ '高宝丽' }}
								<text class="u-type-info">回复</text>
							</text>
							<text v-if="index >= 2" class="">{{ '高宝丽' }}：</text>
							<text class="u-content-color" @tap="handleComment(index, comment, index)">{{ '做完认真检查了吗做完认真检查了吗？' }}</text>
							<text v-if="userType === 1" class="u-type-primary-dark u-mar-l10 u-font-02">删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			newsList: {
				type: Array,
				default: () => {
					return []
				}
			},
			showNewTag: {
				type: Boolean,
				default: false
			},
			userType: {
				type: Number,
				default: 2
			},
		},
		data() {
			return {
				showAction: false,
				shadowStyle: {
					backgroundImage: 'none',
					paddingTop: '0',
					marginTop: '20rpx',
					justifyContent: 'left'
				},
			}
		},
		methods: {
			//查看大图
			previewImg(current, imgList) {
				uni.previewImage({
					current,
					urls: imgList
				});
			},
			//点赞
			clickThumb(item) {
				/* item.isPraise = !item.isPraise;
				if (item.isPraise) {
					item.praise.push({ id: this._user_info.id, userName: this._user_info.userName });
				} else {
					const index = item.praise.findIndex(i => i.id == this._user_info.id);
					item.praise.splice(index, 1);
				} */
			},
			//点击评论 唤出输入框和键盘
			handleComment(circleMegId, comment, index) {
				this.$emit('handleComment', true)
			},
			goNewList(id) {
				this.$tools.navTo({
					url: `./newList`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-bg-000 {
		background-color: #000000;
	}
	.u-mar-l0 {
		margin-left: 0;
	}
	.u-bd-b {
		border-bottom: 1rpx solid $u-border-color;
	}
.content {
	&-circle {
		.new-tips{
			width: 200rpx;
		}
		&-box {
			.headimg {
				width: 80rpx;
				height: 80rpx;
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				&-img {
					.img-1 {
						will-change: transform;
						width: 280rpx;
						height: auto;
						max-height: 400rpx;
					}
					&-more {
						.img-more {
							width: 160rpx;
							height: 160rpx;
						}
					}
				}
				.msg-box {
					.thumbinfo {
						border-bottom: 1rpx solid $u-type-info-disabled;
					}
				}
			}
		}
	}
}

.common {
	position: relative;
}
.show-action {
	position: absolute;
	right: 60rpx;
}
	.action {
		height: 42rpx;
		line-height: 22rpx;
		letter-spacing: 10rpx;
		padding: 0 10rpx 0 20rpx;
	}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
/deep/ .u-content{
	font-size: 26rpx;
}
</style>
