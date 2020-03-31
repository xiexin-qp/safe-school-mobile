/**
 * @description 公共函数模块
 */

const tools = {
  // 路由跳转
  navTo({url, title = '平安校园' } = params) {
    uni.navigateTo({
      url
    })
  },
  // 路由返回
  goBack(delta = 1) {
    uni.navigateBack({
        delta
    });
  },
  // 删除提示
  delTip(msg = '确认进行此操作吗?', cb) {
    uni.showModal({
      title: '温馨提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {
            cb()
        }
      }
    });
  },
  // 延迟执行
  goNext: fn => {
    setTimeout(() => {
      fn()
    }, 1200)
  },
  // 时间转化
  getDateTime(t = new Date().getTime()) {
    let d = new Date(t)
    const date =
      d.getFullYear() +
      '/' +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '/' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      ':' +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
    return date
  },
  // 弹出确认框
  confirm (content, cb) {
    uni.showModal({
        title: '提示',
        content: content,
        success: function (res) {
            if (res.confirm) {
              cb()
            } 
        }
    });
  },
  // 底部弹出菜单
  actionsheet (arr, cb) {
    uni.showActionSheet({
        itemList: arr,
        success: function (res) {
          cb(res.tapIndex)
        },
        fail: function (res) {
        }
    });
  }
}

export default tools