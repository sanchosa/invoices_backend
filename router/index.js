const fs = require(`fs`)
const {dns} = require(`$configs`)
const router = require(`koa-router`)()
const v1 = require(`./api/v1/routers`)

router.use(`/api/v1`, ...v1)

router.get(`*`, async ctx => {
	ctx.url.match(/\/api\//) && ctx.throw(404)
	
	ctx.type = `html`
	ctx.body = fs.createReadStream(`../invoices_frontend/build/index.html`)
})

module.exports = router
