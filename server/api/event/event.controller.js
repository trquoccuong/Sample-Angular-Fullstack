const SSE = require('sse-nodejs');

import {Course} from '../../sqldb';
import {Like} from '../../sqldb';
import {User} from '../../sqldb';
import eventEmitter from '../../eventEmitter';

export function event(req, res) {
  var serverSent = SSE(res);
  // if (!eventEmitter._events.newLike) {
    eventEmitter.on('newLike', function (like) {
      Promise.all([
        Course.find({where: {_id: like.courseId}}),
        User.find({where: {_id: like.userId}})
      ]).then(function (results) {
        const data = {
          courseId: like.courseId,
          numberOfLikes: results[0].numberOfLikes + 1,
          user: {
            name: results[1].name
          }
        }
        return serverSent.sendEvent('updateCourse', data);
      })
    })
  // }
  // serverSent.sendEvent('updateCourse', function () {
  //   // return {
  //   //   courseId: like.courseId,
  //   //   numberOfLikes: results[0].numberOfLikes + 1,
  //   //   user: {
  //   //     name: results[1].name
  //   //   }
  //   // }
  //   return new Date()
  // });
}