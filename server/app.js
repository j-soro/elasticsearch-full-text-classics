const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const joi = require('joi')
const search = require('./search')

const app = new Koa()
const router = new Router()

// Log each request to the console
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// Log percolated errors to the console
app.on('error', err => {
  console.error('Server Error', err)
})

// Set permissive CORS header
app.use(cors({
  credentials: true,
  secureContext: false,
  keepHeadersOnError: false
}));

/** Search for a term in the library
 * Params -
 * term: string under 80 chars
 * offset: positive integer
 */
router.get('/search', async(ctx, next) => {
  const querySchema = joi.object({
    term: joi.string().max(80).required(),
    offset: joi.number().integer().min(0).default(0)
  })
  const { error, value } = querySchema.validate(ctx.request.query)
  if (error) {
    ctx.status = 400
    ctx.body = await error.details[0].message
  } else {
    async function esMiddleWare(ctx, next)  {
      const { term, offset } = ctx.request.query
      const result = await search.queryTerm(term, offset)
      ctx.body = result 
    }
    await esMiddleWare(ctx, next)
  }
})

/** Get a range of paragraphs from the specified book
 * Query Params -
 * bookTitle: string under 256 characters
 * start: positive integer
 * end: positive integer greater than start
 */
router.get('/paragraphs',  async (ctx, next) => {
  const querySchema = joi.object({
    bookTitle: joi.string().max(256).required(),
    start: joi.number().integer().min(0).default(0),
    end: joi.number().integer().greater(joi.ref('start')).default(10)
  })
  const { error, value } = querySchema.validate(ctx.request.query)
  if (error) {
    ctx.status = 400
    ctx.body = await error.details[0].message
  } else {
    async function esMiddleWare(ctx, next) {
      const { bookTitle, start, end } = ctx.request.query
      const result = await search.getParagraphs(bookTitle, start, end)
      ctx.body = result
    }
    await esMiddleWare(ctx, next)
  }
})

router.get('/', async (ctx, next) => {
  ctx.body = {"hello":"hello"}
})

const port = process.env.PORT || 3000
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, err => {
    if (err) throw err
    console.log(`App Listening on Port ${port}`)
  })