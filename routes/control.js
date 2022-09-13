const router = require('koa-router')();
const Article = require("../mongoose/modules/articles");
const Utils = require("../utils/index");
router.prefix('/control');

router.post("/createArticle", async (ctx) => {
  const {
    userName = "",
    name,
    desc = "",
    tags = [],
    auth = "",
    extraData = {}
  } = ctx.request.body;
  if (!name) {
    ctx.body = {
      code: -1,
      message: "文章标题不能为空！"
    }
    return;
  }
  let newArticle = new Article({
    name,
    desc,
    tags,
    auth,
    createBy: userName,
    modifiedBy: userName,
    extraData
  })
  const createArticle = await newArticle.save();
  if (createArticle) {
    ctx.body = {
      code: 200,
      message: "文章保存成功！"
    }
  } else {
    ctx.body = {
      code: -1,
      message: "文章保存失败，请稍后尝试！"
    }
  }
})

router.post("/queryArticle", async (ctx) => {
  const body = ctx.request.body;
  const { orders, limit, start, group = undefined } = body;
  const dbCommand = Utils.getDbQueryCommand2(group);
  if (!dbCommand) {
    ctx.body = {
      code: -1,
      message: "请求参数错误"
    }
    return;
  }
  // 合并查询条件
  const sort = orders.length ? Object.assign(...orders) : {};
  // skip: 跳过的文档数量，本次设计的分页传值中的start为从第几位开始查询，因此也就相当于跳过多少位
  // limit: 指定放回结果的最大数量，也就是分页中每页显示多少条
  // sort: 按照排序规则根据所给的字段进行排序，值可以是 asc, desc, ascending, descending, 1, 和 -1
  // sort: 不区分大小写，如果多个条件，需要将查询条件合并到同一个object中，如果没有查询条件则传递{}
  // find: 筛选条件
  const list = await Article.find(dbCommand).skip(start).limit(limit).sort(sort);
  // countDocuments(): 获取总数，参数为object，用于筛选
  const listTotal = await Article.countDocuments(dbCommand);
  if (list) {
    ctx.body = {
      code: 200,
      message: "success",
      body: [...list],
      total: listTotal
    }
  }
})

module.exports = router
