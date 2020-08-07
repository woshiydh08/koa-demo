/** 使用Koa-router中间件 */
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router
	.get('/', function (ctx, next) {
		ctx.body = 'Hello JSPang'
	})
	.get('/todo', (ctx, next) => {
		ctx.body = {user: 'name'}
	})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
	console.log('starting at port 3000')
})
