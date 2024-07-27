const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '메인페이지 입니다.'
})

// url : /other/동방신기
router.get('/other/:group', (ctx) => {
  const {group} = ctx.params; // group: 동방신기
  ctx.body = `${group}의 페이지 입니다.` // 동방신기의 페이지입니다.
})

// url : /member?name=아이린&id=3 | query : { name: '아이린', id: '3' }
router.get('/member', (ctx) => {
  const {name} = ctx.query; // 아이린
  const {id} = ctx.query; // 3
  console.log(ctx.query)
  ctx.body = `레드벨벳 ${id} 번째 멤버 ${name}의 페이지 입니다.`
})

/**
 * middleware 배열에 router의 경로:routes() / 콜백함수:allowedMethods() 저장
 */

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);