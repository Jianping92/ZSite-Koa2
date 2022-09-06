const router = require('koa-router')();
const Article = require("../mongoose/modules/articles")
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

module.exports = router
