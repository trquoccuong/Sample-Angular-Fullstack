
'use strict';

export default function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    youtubeID: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numberOfLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function (models) {
        Course.belongsToMany(models.User, {
          through: {
            model: models.Like,
          },
          foreignKey: 'courseId',
        })
      }
    }
  });
  return Course
}
