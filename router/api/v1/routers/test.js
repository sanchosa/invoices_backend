const router = require(`koa-router`)()

router.get(`/`, async ctx => {
	console.log(ctx.headers)
	ctx.status = 200
	ctx.body = `OK`
})

module.exports = [router.routes(), router.allowedMethods()]
