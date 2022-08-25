const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    // 类型
    type: String,
    // 必填校验
    required: true,
    // 删除左右空格
    trim: true,
    // 唯一
    unique: true
  },
  age: Number
})

module.exports = mongoose.model("User", authorSchema);