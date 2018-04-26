const router = require(`koa-router`)()
const test = require(`./test`)

router.use(`/test`, ...test)

module.exports = [router.routes(), router.allowedMethods()]
