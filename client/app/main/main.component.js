import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  courses = [];

  /*@ngInject*/
  constructor(Auth, $http) {
    this.$http = $http;
    this.isAdmin = Auth.isAdminSync;
  }

  $onInit() {
    this.$http.get('/api/courses')
      .then(response => {
        this.courses = response.data;
      });
  }
}

export default angular.module('elearningSiteApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
