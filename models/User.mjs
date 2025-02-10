import { DataTypes } from 'sequelize';
import db from '../db/connection.mjs';

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    require: true,
  },
  newsLetter: {
    type: DataTypes.BOOLEAN,
  }
});

export default User;
