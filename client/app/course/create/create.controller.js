'use strict';

import angular from 'angular';

export default class CreateController {
  course = {
    name: '',
    description: '',
    youtubeID: '',
    price: 0
  };
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $state, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }

  createCourse(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.$http.post('/api/courses',{
        name: this.course.name,
        description: this.course.description,
        youtubeID: this.course.youtubeID,
        price: this.course.price
      })
        .then(() => {
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if(err.name) {
            angular.forEach(err.fields, (error, field) => {
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}
