const Koa = require('koa');
const app = new Koa();

/* app.use(async ctx => {
  ctx.body = 'Hello World';
});
 */

app.use(async (ctx, next) => {
  console.log('레드벨벳 멤버 소개를 하겠습니다.')
  ctx.set('Redvelvet-Leader', 'irene');
  await next();
  console.log('멤버 소개 완료.')
});

app.use(async (ctx, next) => {
  console.log('1. 아이린')
  await next();
});
app.use(async (ctx, next) => {
  console.log('2. 슬기')
  await next();
});
app.use(async (ctx, next) => {
  console.log('3. 웬디')
  await next();
});
app.use(async (ctx, next) => {
  console.log('4. 초이')
  await next();
});

app.use(async (ctx, next) => {
  console.log('5. 예리')
  ctx.body = '레드벨벳 멤버 소개';
});

app.listen(3000);