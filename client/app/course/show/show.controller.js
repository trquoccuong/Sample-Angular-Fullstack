'use strict';

import angular from 'angular';
import _ from 'lodash';

export default class ShowController {
  course = {
    name: '',
    description: '',
    youtubeID: '',
    src: '',
    Users: [],
    numberOfLikes: 0,
    isLiked: false
  };
  errors = {};

  /*@ngInject*/
  constructor(Auth, $state, $http, $stateParams, $sce) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.isAdmin = Auth.isAdminSync;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.trustSrc = function (youtubeID) {
      const src = 'http://www.youtube.com/embed/' + youtubeID;
      return $sce.trustAsResourceUrl(src);
    };
    this.onReturn = function () {
    }
    this.onCancel = function () {
    }
    this.paypalUrl = function () {
      return $http.get('http://166.78.8.98/cgi-bin/aries.cgi', {
        params: {
          sandbox: 1,
          direct: 1,
          returnurl: 'http://166.78.8.98/cgi-bin/return.htm',
          cancelurl: 'http://166.78.8.98/cgi-bin/cancel.htm',
          ajax: 1,
          onlytoken: 1
        }
      }).then(function (response) {
        return {
          redirectUrl: response.data,
          returnUrl: 'http://166.78.8.98/cgi-bin/return.htm',
          cancelUrl: 'http://166.78.8.98/cgi-bin/cancel.htm',
        };
      })
    };
    this.like = function () {
      this.$http.post('/api/courses/' + this.$stateParams._id + '/like')
    }
  }

  $onInit() {
    if (!this.$stateParams._id) {
      return  this.$state.go('main');
    } else {
      const currentUser = this.Auth.getCurrentUserSync()

      this.$http.get('/api/courses/' + this.$stateParams._id)
        .then(response => {
          this.course = response.data;
          let userIndex = _.findIndex(this.course.Users, (o) => {
            return o.name === currentUser.name
          })
          if (userIndex >= 0) {
            this.course.isLiked = true
          }

          if (typeof(EventSource) !== "undefined") {
            var sse = new EventSource('/api/events');
            sse.addEventListener('updateCourse', (result) => {
              const data = JSON.parse(result.data)
              if (this.$stateParams._id == data.courseId) {
                this.course.numberOfLikes = data.numberOfLikes
                this.course.Users.push(data.user)
                if (data.user.name === currentUser.name) {
                  this.course.isLiked = true
                }
              }
            })
          }
        })
        .catch(err => {
          this.$state.go('main');
        });
    }
  }
}
