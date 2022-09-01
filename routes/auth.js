const router = require('koa-router')();
const User = require("../mongoose/modules/users")

router.prefix('/auth');

router.post('/register', async function (ctx) {
  const { userName, userPwd, nickName, sex, email } = ctx.request.body;
  let user = await User.findOne({ userName });
  if (user._id) {
    ctx.body = {
      code: -1,
      message: "当前账户名已存在，请变更后再次尝试！"
    }
    return;
  }
  let newUser = new User({
    userName, userPwd, nickName, sex, email
  })
  const saveInfo = await newUser.save();
  if (saveInfo) {
    ctx.body = {
      code: 200,
      message: "注册成功！"
    }
  } else {
    ctx.body = {
      code: -1,
      message: "注册失败，请稍后尝试！"
    }
  }
})

router.post('/login', async function (ctx) {
  console.log(ctx.request.body)
  const { userName, userPwd } = ctx.request.body;
  let user = await User.findOne({ userName, userPwd });
  if (user._id) {
    ctx.body = {
      code: 200,
      message: "登录成功！"
    }
  } else {
    ctx.body = {
      code: -1,
      message: "账户名或密码错误"
    }
  }
})

module.exports = router
