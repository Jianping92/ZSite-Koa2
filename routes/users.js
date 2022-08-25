const router = require('koa-router')()
const User = require("../mongoose/modules/users")

function randomStr() {
  return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
}

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get("/setUser", async function (ctx, next) {
  const user = new User({
    name: randomStr(),
    age: 18
  })
  try {
    const newUser = await user.save();
    ctx.body = `成功：${JSON.stringify(newUser)}`
  } catch (e) {
    ctx.body = `错误：${e}`
  }
  // ctx.body = "setUser is success!"
})

module.exports = router
