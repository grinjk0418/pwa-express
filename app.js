import express from 'express'; // express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';

const app = express();
app.use(express.json()); //JSON으로 요청이 올 경우 파싱 처리해주는 미들웨어

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {
  response.status(200).send('안녕 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스!');
});

//-------------
// Query Parameter 제어 (get밖에 사용 못함)
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = parseInt(request.query.age);
  console.log(name, age);
  response.status(200).send(params);
});

// Segment Parameter
// `Request.params`를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// JSON 요청 제어
// `request.body`를 통해서 접근 가능 (** express.json() 추가 필요 **)
app.post('/api/posts', (request, response, next) => {
  const {account, password, name} = request.body;

  response.status(200).send({account, password, name}); // 이거 다시 원복하는것도 디스트럭처링임

  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  // response.status(200).send({
  //   password: password
  //   ,account: account
  //   ,name: name
  // });
});

// -------------
// 라우트 그룹
// -------------
// 라우트를 모듈로 나누고 그룹핑하여 관리
app.use('/api', authRouter);
app.use('/api/users', usersRouter);

//-------------
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
app.use((request, response, next) => {
  response.status(404).send('찾을 수 없는 페이지입니다.');
});

// 서버를 주어진 포트에서 시작
app.listen(3000);