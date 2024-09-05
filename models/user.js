'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    first_name:DataTypes.STRING,
    last_name:DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role_id: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      showHidden:false,
      set(value) {
        // Store the hashed password
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    branch_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password'] }, // Exclude password by default
    },
    scopes: {
      withPassword: {
        attributes: {}, // Include all attributes, even password
      }
    }
  });
  return User;
};