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

# nodemon  
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