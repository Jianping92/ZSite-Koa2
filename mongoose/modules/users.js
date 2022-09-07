const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  // 昵称
  nickName: {
    type: String,
    trim: true
  },
  // 用户名
  userName: {
    // 类型
    type: String,
    // 必填校验
    required: true,
    // 删除左右空格
    trim: true,
    // 唯一
    unique: true
  },
  // 用户密码
  userPwd: {
    type: String,
    required: true,
    trim: true
  },
  // 用户性别 0男性，1女性
  sex: Number,
  // 邮箱
  email: String,
  // 创建时间
  createdTime: {
    type: Date,
    default: Date.now
  },
  // 最后的登录时间
  lastOnlineTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("User", authorSchema);