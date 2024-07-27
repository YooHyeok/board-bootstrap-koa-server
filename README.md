# KOA INSTALL & RUN

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
