{
	"name": "平安校园",
	"appid": "",
	"description": "",
	"versionName": "1.0.0",
	"versionCode": "100",
	"transformPx": false,
	/* 5+App特有相关 */
	"app-plus": {
		"usingComponents": true,
		"nvueCompiler": "uni-app",
		"compilerVersion": 3,
		"splashscreen": {
			"alwaysShowBeforeRender": true,
			"waiting": true,
			"autoclose": true,
			"delay": 0
		},
		/* 模块配置 */
		"modules": {},
		/* 应用发布信息 */
		"distribute": {
			/* android打包配置 */
			"android": {
				"permissions": [
					"<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
					"<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
					"<uses-permission android:name=\"android.permission.READ_CONTACTS\"/>",
					"<uses-permission android:name=\"android.permission.VIBRATE\"/>",
					"<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
					"<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
					"<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
					"<uses-permission android:name=\"android.permission.WRITE_CONTACTS\"/>",
					"<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
					"<uses-permission android:name=\"android.permission.CAMERA\"/>",
					"<uses-permission android:name=\"android.permission.RECORD_AUDIO\"/>",
					"<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
					"<uses-permission android:name=\"android.permission.MODIFY_AUDIO_SETTINGS\"/>",
					"<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
					"<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
					"<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
					"<uses-permission android:name=\"android.permission.CALL_PHONE\"/>",
					"<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
					"<uses-permission android:name=\"android.permission.ACCESS_COARSE_LOCATION\"/>",
					"<uses-feature android:name=\"android.hardware.camera\"/>",
					"<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>",
					"<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
				]
			},
			/* ios打包配置 */
			"ios": {},
			/* SDK配置 */
			"sdkConfigs": {}
		}
	},
	/* 快应用特有相关 */
	"quickapp": {},
	/* 小程序特有相关 */
	"mp-weixin": {
		"appid": "wx02c23d5ba971d7b8",
		"setting": {
			"urlCheck": false,
			"es6": true,
			"minified": true
		},
		"usingComponents": true
	},
	"mp-alipay": {
		"usingComponents": true
	},
	"mp-baidu": {
		"usingComponents": true
	},
	"mp-toutiao": {
		"usingComponents": true
	},
	"h5": {
		"title": "",
		"domain": "ai.canpoint.net",
		"router": {
			"mode": "hash",
			"base": "/mobile-protal/protal/"
		},
		"devServer": {
			"https": false,
			"port": "",
			"proxy": {
				"/oss_upload": {
					"target": "http://canpoint-photo.oss-cn-beijing.aliyuncs.com", // 阿里云上传图片
					"changeOrigin": true,
					"pathRewrite": {
						"^/oss_upload": ""
					}
				},
				"/zx_mobile_user": {
					"target": "http://canpointtest.com/zx_mobile_user/", // 朱旭-移动端用户系统
					"changeOrigin": true,
					"pathRewrite": {
						"^/zx_mobile_user": ""
					}
				},
				"/wxz_control": {
					"target": "http://canpointtest.com/wxz_control/", // 王选章-控制中心
					"changeOrigin": true,
					"pathRewrite": {
						"^/wxz_control": ""
					}
				},
				"/zk_school": {
					"target": "http://canpointtest.com/zk_school/", // 张坤-学校管理
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_school": ""
					}
				},
				"/zk_leave": {
					"target": "http://canpointtest.com/zk_leave/", // 张坤-校历请假
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_leave": ""
					}
				},
				"/zk_ncov": {
					"target": "http://canpointtest.com/zk_ncov/", // 张坤-疫情日报
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_ncov": ""
					}
				},
				"/zx_protal": {
					"target": "http://canpointtest.com/zx_protal/", // 朱旭-平台应用管理
					"changeOrigin": true,
					"pathRewrite": {
						"^/zx_protal": ""
					}
				},
				"/lz_protal": {
					"target": "http://canpointtest.com/zx_protal/", // 吕卓-平台应用管理
					"changeOrigin": true,
					"pathRewrite": {
						"^/lz_protal": ""
					}
				},
				"/zx_door": {
					"target": "http://canpointtest.com/zx_door/", // 朱旭-门禁系统
					"changeOrigin": true,
					"pathRewrite": {
						"^/zx_door": ""
					}
				},
				"/zx_visitor": {
					"target": "http://canpointtest.com/zx_visitor/", // 朱旭-访客系统
					"changeOrigin": true,
					"pathRewrite": {
						"^/zx_visitor": ""
					}
				},
				"/ljj_visitor": {
					"target": "http://canpointtest.com/zx_visitor/", // 柳继杰-访客系统
					"changeOrigin": true,
					"pathRewrite": {
						"^/ljj_visitor": ""
					}
				},
				"/lz_attendance": {
					"target": "http://canpointtest.com/lz_attendance/", // 吕卓-考勤
					"changeOrigin": true,
					"pathRewrite": {
						"^/lz_attendance": ""
					}
				},
				"/lz_user_center": {
					"target": "http://canpointtest.com/lz_user_center/", // 吕卓-用户中心
					"changeOrigin": true,
					"pathRewrite": {
						"^/lz_user_center": ""
					}
				},
				"/ljj_user_center": {
					"target": "http://canpointtest.com/lz_user_center/", // 吕卓-用户中心
					"changeOrigin": true,
					"pathRewrite": {
						"^/ljj_user_center": ""
					}
				},
				"/mobile-protal/protal/mobile-img": {
					"target": "http://canpointtest.com/mobile-protal/protal/mobile-img", // 图片代理
					"changeOrigin": true,
					"pathRewrite": {
						"^/mobile-protal/protal/mobile-img": ""
					}
				},
				"/img-download": {
					"target": "http://canpoint-file.oss-cn-beijing.aliyuncs.com/", // 图片代理
					"changeOrigin": true,
					"pathRewrite": {
						"^/img-download": ""
					}
				},
				"/mobile-img": {
					"target": "http://canpointtest.com/mobile-protal/protal/mobile-img", // 图片代理
					"changeOrigin": true,
					"pathRewrite": {
						"^/mobile-img": ""
					}
				},
				"/ljj_dorm": {
					"target": "http://canpointtest.com/ljj_dorm/", // 柳继杰-宿管系统
					"changeOrigin": true,
					"pathRewrite": {
						"^/ljj_dorm": ""
					}
				},
				"/baseEnv": {
					"target": "http://ai2.canpoint.net/baseEnv",
					"changeOrigin": true,
					"pathRewrite": {
						"^/baseEnv": ""
					}
				},
				"/hpb_face": {
					"target": "http://39.97.213.205:8092/",
					"changeOrigin": true,
					"pathRewrite": {
						"^/hpb_face": ""
					}
				},
				"/zq_news": {
					"target": "http://canpointtest.com/zq_news/", //张琦，信息发布
					"changeOrigin": true,
					"pathRewrite": {
						"^/zq_news": ""
					}
				},
				"/zk_examplan": {
					"target": "http://canpointtest.com/zk_examplan/", // 考试计划
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_examplan": ""
					}
				},
				"/zk_moral": {
					"target": "http://canpointtest.com/zk_moral/", // 张坤-个人德育管理
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_moral": ""
					}
				},
				"/zq_class": {
					"target": "http://canpointtest.com/zq_class/",
					"changeOrigin": true,
					"pathRewrite": {
						"^/zq_class": ""
					}
				},
				"/zq_schedule": {
					// "target": "http://192.168.1.241:11007/", //张琦，课程表
					// "target": "http://192.168.1.23:11010/",
					"target": "http://canpointtest.com/zq_schedule/",
					"changeOrigin": true,
					"pathRewrite": {
						"^/zq_schedule": ""
					}
				},
				"/zk_oa": {
					// "target": "http://192.168.1.210:11014/", //张琦，oa
					"target": "http://ecb.canpointlive.com/zk_oa/",
					"changeOrigin": true,
					"pathRewrite": {
						"^/zk_oa": ""
					}
				},
				"/zq_behavior": {
					"target": "http://canpointtest.com/zq_behavior/",
					"changeOrigin": true,
					"pathRewrite": {
						"^/zq_behavior": ""
					}
				},
				"/cl_oa": {
					"target": "http://canpointtest.com/cl_oa/", //陈琳-调代课
					"changeOrigin": true,
					"pathRewrite": {
						"^/cl_oa": ""
					}
				},
				"lz_safe": {
					"target": "http://192.168.2.242:8091/", //吕卓-安全防控
					// "target": "http://192.168.1.76:8091/", //liujijie-本地
					"changeOrigin": true,
					"pathRewrite": {
						"^/lz_safe": ""
					}
				},
				"/zl_uploadFile" : {
					"target" : "http://canpointtest.com:8090/ossApi/upload-oss-file/", //上传文件
					// "target": "http://192.168.1.193:11009/", //上传文件
					"changeOrigin" : true,
					"pathRewrite" : {
							"^/zl_uploadFile" : ""
					}
				},
				"/cl_class": {
					"target": "http://canpointtest.com/cl_class/", //陈琳-班牌
					"changeOrigin": true,
					"pathRewrite": {
						"^/cl_class": ""
					}
				},
				'/zx_subject': {
					target: 'http://192.168.2.242:10050/',
					// target: 'http://192.168.1.24:10050/', // 朱旭-平台-学校学科教师管理上传文件
					changeOrigin: true,
					pathRewrite: {
						'^/zx_subject': ''
					}
				}
				'/ljj_user_teacher': {
					"target": 'http://192.168.1.76:11002/', // 柳继杰-局端基础数据
					// target: 'http://192.168.2.242:11002/', // 柳继杰-
					"changeOrigin": true,
					"pathRewrite": {
						'^/ljj_user_teacher': ''
					}
				}
      }
    },
    "optimization": {
      "treeShaking": {
        "enable": true
      }
    },
    "template": "template.html"
  }
}
