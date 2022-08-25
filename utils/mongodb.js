"use strict"
const mongoose = require("mongoose");
const db = require("../config/db");
// 方式一
// function main() {
//   mongoose.connect(db.url + db.name);
//   const dbStatus = mongoose.connection;
//   dbStatus.on("error", console.error.bind(console, "connection error:"));
//   dbStatus.once("open", () => {
//     console.log("连接数据库成功！")
//   })
// }
//
// module.exports = main;
// 方式二
module.exports = () => {
  mongoose.connect(db.url + db.name).then(() => {
    console.log("数据库连接成功")
  }).catch(error => {
    console.log("数据库连接失败" + error)
  })
};