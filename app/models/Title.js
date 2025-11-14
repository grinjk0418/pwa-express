import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명 
const modelName= 'Title';

// 컬럼 정의
const attributes = {
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    primaryKey: true,
    allowNull: false,
    comment: '직급 코드',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '직급명',
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
  tableName: 'titles', // 실제 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  // createdAt : 'empCreatedAt',
  // updatedAt : false,
  paranoid: true, // Soft Delete 설정 (deletedAt 자동 관리)
}

// 모델 객체 생성
const Title = {
  init: (sequelize) => {
    const defineTitle = sequelize.define(modelName, attributes, options);

    return defineTitle;
  },
  associate: (db) => {
    // 1:n 관계에서 부모 모델에서 설정
    db.Title.hasMany(db.TitleEmp, { sourceKey: 'titleCode', foreignKey: 'titleCode', as: 'titleEmps' });
  }
};

export default Title;