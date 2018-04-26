const router = require(`koa-router`)()
const test = require(`./test`)
const invoice = require(`./invoice`)

router.use(`/test`, ...test)
router.use(`/invoice`, ...invoice)

module.exports = [router.routes(), router.allowedMethods()]
