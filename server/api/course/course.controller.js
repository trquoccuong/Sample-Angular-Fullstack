'use strict';

import jsonpatch from 'fast-json-patch';
import {Course} from '../../sqldb';
import {Like} from '../../sqldb';
import {User} from '../../sqldb';
const SSE = require('sse-nodejs');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
          .then(() => {
          res.status(204).end();
    });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err)
    res.status(statusCode).send(err);
  };
}

// Gets a list of Courses
export function index(req, res) {
  return Course.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Course from the DB
export function show(req, res) {
  return Course.find({
    include: [{
      model: User,
      attributes: ['name']
    }],
    where: {
      _id: req.params.id
    },
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Course in the DB
export function create(req, res) {
  return Course.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Likes a Course in the DB
export function like(req, res) {
    Like.find({
      where : {
        userId: req.user._id,
        courseId: req.params.id
      }
    }).then(function (like) {
      if (!like) {
        return Like.create({
          userId: req.user._id,
          courseId: req.params.id
        }).then(function () {
          return Course.find({
            where: {
              _id: req.params.id
            },
          }).then(function (course) {
            return course.increment('numberOfLikes')
          })
        })
          .then(respondWithResult(res, 201))
          .catch(handleError(res));
      }
      return handleEntityNotFound(res)
    })

}

// Upserts the given Course in the DB at the specified ID
export function edit(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Course.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Course from the DB
export function destroy(req, res) {
  return Course.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
