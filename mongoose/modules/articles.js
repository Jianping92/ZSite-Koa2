const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  id: {
    type: String,
    default: mongoose.Types.ObjectId
  },
  // 标题
  name: {
    type: String,
    required: true,
    trim: true
  },
  // 简介
  desc: {
    type: String,
    default: null
  },
  // 标签
  tags: {
    type: [String],
    default: []
  },
  // 作者
  auth: {
    type: String,
    default: ""
  },
  // 创建者
  createBy: {
    type: String,
    required: true
  },
  // 修改者
  modifiedBy: {
    type: String,
    required: true
  },
  // 属性
  extraData: {
    // 内容
    content: {
      type: String,
      default: ""
    },
    // 原创
    original: {
      type: String,
      default: "original",
      enum: ["original", "reprint"]
    },
    // 文章类别
    category: {
      type: [String],
      default: []
    },
    // 封面模式
    coverImgPattern: {
      type: String,
      default: "default1",
      enum: ["default1", "default2", "default3", "default4", "customize"]
    },
    // 封面图1:1
    coverImg1x1: {
      type: [String],
      default: []
    },
    // 封面图4:3
    coverImg4x3: {
      type: [String],
      default: []
    },
    // 封面图16:9
    coverImg16x9: {
      type: [String],
      default: []
    },
    // 可见范围
    readScope: {
      type: String,
      default: "公开",
      enum: ["公开", "私有"]
    }
  },
  // 创建时间
  createdTime: {
    type: Date,
    default: Date.now
  },
  // 修改时间
  modifiedTime: {
    type: Date,
    default: Date.now
  },
  // 发布时间
  publishTime: {
    type: Date,
    default: null
  },
  // 首次发布时间
  firstPublishTime: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model("Article", articleSchema);
