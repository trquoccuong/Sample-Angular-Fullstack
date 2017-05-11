'use strict';
import eventEmitter from '../../eventEmitter'

export default function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  },{
    hooks: {
      afterCreate: function (like) {
        eventEmitter.emit('newLike', {
          courseId: like.courseId,
          userId: like.userId
        })
        return null;
      }
    }
  });
  return Like
}
