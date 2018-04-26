const Koa = require(`koa`)
const {koaLogger} = require(`$configs`)
const {errorHandler} = require(`$misc`)

const app = new Koa()
app.on(`error`, (err, ctx) => errorHandler(ctx, `Server`, err))


const bodyparser = require(`koa-bodyparser`)()
const json = require(`koa-json`)
const assets = require(`koa-static`)
const day = 1000 * 60 * 60 * 24
app.use(bodyparser)
app.use(koaLogger())
app.use(json())
app.use(assets(`../frontend/build/public`, {maxage: day}))

const router = require(`./router`)
app.use(router.routes())
app.use(router.allowedMethods())


module.exports = app
