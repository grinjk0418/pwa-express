import express from 'express';
// import pool from '../db/my-db.js';
import db from '../app/models/index.js'
const {sequelize, Employee} = db;

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    // ------------------
    // Sequelize로 DB 연동
    // ------------------
    const result = await Employee.findByPk(id);
    return response.status(200).send(result);
    
    // ----------------
    // mysql2로 DB연동
    // ----------------
    // // 쿼리 작성
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE
    //     emp_id = ?
    // `;
    // // validators에서 유효성 검사 잘하거나 아래처럼 Prepared Statement 구문 사용하면 sql 인잭션 해킹공격 방어 가능 예)'' OR 1=1
    // const [result] = await pool.execute(sql, [id]);

    // return response.status(200).send(result);
  } catch(error) {
    next(error);
  }
});

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});

export default usersRouter;