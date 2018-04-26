const router = require(`koa-router`)()

router.get(`/`, async ctx => {
	ctx.status = 200
	ctx.body = `OK`
})

module.exports = [router.routes(), router.allowedMethods()]
