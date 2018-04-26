'use strict'

const router = require(`koa-router`)()
const {Invoice} = require(`$db_v1`)

router.get(`/`, async ctx => {
	ctx.body = await Invoice.findAll()
})

router.post(`/`, async ctx => {
	ctx.body = await Invoice.tryCreate(ctx.request.body)
})

router.put(`/`, async ctx => {
	const routeDescription = `PUT invoice - `
    const requiredProps    = [`id`]
    const requiredPropsMsg = `Invoice's id have to be specified`
    const routeFunction    = (async () => {
        if (checkRequiredParams(ctx.request.body, requiredProps, requiredPropsMsg)) {
            ctx.body = await Invoice.tryUpdate(ctx.request.body)
        }
    })

    await tryCatch(routeFunction, ctx, routeDescription)
})

module.exports = [router.routes(), router.allowedMethods()]
