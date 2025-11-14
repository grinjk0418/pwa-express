import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명 
const modelName= 'TitleEmp';

// 컬럼 정의
const attributes = {
  titleEmpId: {
    field: 'title_emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '사원 직급 ID',
  },
  empId: {
    field: 'emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '사원 ID',
  },
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    allowNull: false,
    comment: '직급 코드',
  },
  startAt: {
    field: 'start_at',
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '시작일',
    get() {
          const val = this.getDataValue('startAt');
          if(!val) {
            return null;
          }
          return dayjs(val).format('YYYY-MM-DD');
        }
  },
  endAt: {
    field: 'end_at',
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: '종료일',
    get() {
          const val = this.getDataValue('endAt');
          if(!val) {
            return null;
          }
          return dayjs(val).format('YYYY-MM-DD');
        }
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE, // DataTypes.NOW 쓰면 defaultValue: new Date() 안해도 됌
    allowNull: false,
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at', 
    type: DataTypes.DATE, // DataTypes.NOW 쓰면 defaultValue: new Date() 안해도 됌
    allowNull: false,
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE, // DataTypes.NOW 쓰면 defaultValue: new Date() 안해도 됌
    allowNull: true,
    defaultValue: null,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

// Options 설정 (테이블 관련 설정)
const options = {
  tableName: 'title_emps', // 실제 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  // createdAt : 'empCreatedAt',
  // updatedAt : false,
  paranoid: true, // Soft Delete 설정 (deletedAt 자동 관리)
}

// 모델 객체 생성
const TitleEmp = {
  init: (sequelize) => {
    const defineTitleEmp = sequelize.define(modelName, attributes, options);
    
    return defineTitleEmp;
  },
  associate: (db) => {
    // 1:n 관계에서 자식 모델에 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다.)
    db.TitleEmp.belongsTo(db.Employee, { targetKey: 'empId', foreignKey: 'empId', as: 'employee' });
    // 1:n 관계에서 자식 모델에 설정(1명의 사원이 여러 직급을 가진다.)
    db.TitleEmp.belongsTo(db.Title, { targetKey: 'titleCode', foreignKey: 'titleCode', as: 'title' });
  }
};

export default TitleEmp;