# *KOA INSTALL & RUN*
<details>
<summary>펼치기/접기</summary>
<br>
- KOA 설치
  ```bash
  npm install koa
  ```

- src/index.js
  ```javascript
    const Koa = require('koa');
    const app = new Koa();

    app.use(async ctx => {
      ctx.body = 'Hello World';
    });

    app.listen(3000);
  ```
- 서버 실행
  ```bash
  node src
  ```
  위 명령을 통해 src에 존재하는 index.js 파일을 node runtime 환경위에서 실행시킨다.

- 서버 종료
  ```bash
  ctrl c
  ```
</details>

# *Nodemon*  
<details>
<summary>펼치기/접기</summary>
<br>
서버를 수정하고 저장 할 때 마다 변경 사항을 확인하기 위해서는 서버를 재시작 해야한다.  
그때마다 node src, ctrl c 명령어를 통해 끄고 키고를 계속 하는것이 번거롭기 때문에 이를 편하게 실시간으로 관리해주는 라이브러리이다.

## 설치 및 실행

- install
  ```
  npm install -g nodemon
  ```
- run
  ```
  nodemon --watch src/ src
  ```

## npm script 실행 등록

- package.json파일 추가
  ```bash
  npm init
  ```
  (특정 설정이 없다면 엔터를 계속 눌러준다.)


- package.json
  ```json
  "scripts": {
    /* 생략 */
    "start": "nodemon --watch src/ src" // 추가
    /* 생략 */
  },
  ```
- start 명령 (run 생략 가능)
  ```
  npm run start
  ```
</details>

# *KOA*

## *app.use()*
koa는 middleware 함수의 실행으로 이루어져 있다.  
app.use() 함수는 인자로받은 콜백함수를 app middleware 배열에 등록해준다.  
실제 깃허브에올라온 소스코드를 확인해본다.

```js
  /* 생략 */
  constructor() {
    super();
    this.middleware = [];
    /* 생략 */
  }
  use(fn) {
    if (typeof fn !== 'funciton') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3.' + 
                'see the documentation for exapmles of how convert old middleware' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert();
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn); // convert 함수 배열에 추가
    return this;
  }
```

middleware 배열에 들어온 함수는 2개의 인자를 가진다.  
ctx와 next

- ctx : 요청 1개에 대한 context이다.
- next : 다음 middleware 함수로 promise를 return한다.

- src/ inedx.js
  ```javascript
  const Koa = require('koa');
  const app = new Koa();

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
  ```
- console
  ```text/plain
  레드벨벳 멤버 소개를 하겠습니다.
  1. 아이린
  2. 슬기
  3. 웬디
  4. 초이
  5. 예리
  멤버 소개 완료.
  ```

  ## router
  서버에서 경로를 설정한다.

  ### install
  ```bash
  npm install koa-router
  ```

# *roter: 파라미터 & URL*
- pathvariable 형태
  ```javascript
  // url : /other/동방신기
  router.get('/other/:group', (ctx) => {
    const {group} = ctx.params; // group: 동방신기
    ctx.body = `${group}의 페이지 입니다.` // 동방신기의 페이지입니다.
  })
  ```
- queryParam 형태
  ```javascript

  // url : /member?name=아이린&id=3 | query : { name: '아이린', id: '3' }
  router.get('/member', (ctx) => {
    const {name} = ctx.query; // 아이린
    const {id} = ctx.query; // 3
    console.log(ctx.query)
    ctx.body = `레드벨벳 ${id} 번째 멤버 ${name}의 페이지 입니다.`
  })
  ```

# *데이터베이스 연동*

## KNEXT 
- install
  ```bash
  npm install knex --save
  ```

- src/database/index.js
  ```javascript
  var db = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '1234',
      database : 'vue_board'
    }
  });

  const ret = db.raw('select now()')
  .then((item) => {console.log(item[0])})

  module.exports = db;
  ```

## MYSQL
- install
  ```bash
  npm install mysql2 --save
  ```

- Query
  ```SQL
  CREATE TABLE `USER` (
  user_id INT(11) AUTO_INCREMENT NOT NULL,
  user_name VARCHAR(32) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (user_id)
  );

  CREATE TABLE CONTENT (
  content_id INT(11) AUTO_INCREMENT NOT NULL,
  user_id INT(11) NOT NULL,
  title VARCHAR(32) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (content_id)
  );

  INSERT INTO `USER` VALUES (null, 'hyeok', now(), null);
  ```

## dotenv

- install
  ```bash
  npm install dotenv
  ```
- .env
  ```env
  DB_PASSWORD = 1234
  ```

- .js
  ```javascript
  require('dotenv').config();

  const connection = {
    password : process.env.DB_PASSWORD,
  }

  console.log(connection.password)
  ```

## model 구성 및 server 적용

  - src/model/index.js
    ```javascript
    const db = require('../database')

    const self = {}

    self.findUser = async () => {
      const ret = await db.raw('SELECT * FROM USER');
      return ret[0]
    }

    module.exports = self;
    ```
  - src/index.js
    ```javascript
    const Koa = require('koa');
    const Router = require('koa-router');
    const app = new Koa();
    const router = new Router();

    const db = require('./model'); // db model 추가

    router.get('/', async (ctx) => {
      const ret = await db.findUser() // model로부터 함수 호출
      ctx.body = ret
    })


    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3000);
    ```


# *KOA/CORS*
- install
  ```bash
  npm install @koa/cors
  ```

- src/index.js
  ```javascript
  const Koa = require("koa")
  const cors = require("@koa/cors")
  const app = new Koa();
  app.use(cors());

  /**
   * 라우터 적용
   */

  app.listen(3000);
  ```

# *KOA-BODY*
  글을 등록하거나 수정할 때 POST요청시 클라이언트로 부터 받은 데이터를 쉽게 파싱해서 가져올 수 있도록 해준다.


- install
  ```bash
  npm install koa-body
  ```

- src/index.js
  ```javascript
  const Koa = require("koa");
  const Router = require("koa-router");
  const cors = require("@koa/cors");
  const db = require("./model");
  const koaBody = require('koa-body'); // kodBody
  
  /**
   * router의 post 함수를 사용할 때 두번째 인자에 콜백함수로 사용한다.
   */
  const bodyParser = () => {
    return koaBody({ multipart: true }); // koaBody 파일관련 옵션 on?
  }
  const app = new Koa();
  const router = new Router();
  app.use(cors());

  const addUser = async ctx => {
    const { user_name } = ctx.request.body;
    const ret = await db.addUser({ user_name });

    ctx.body = ret;
  };

  router.post("/add/user", bodyParser(), addUser); // koaBody콜백함수 
  ```
