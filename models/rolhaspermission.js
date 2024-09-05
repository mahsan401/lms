'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolHasPermission.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'RolHasPermission',
  });
  return RolHasPermission;
};