'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state('create', {
    url: '/courses/create',
    template: require('./create/create.html'),
    controller: 'CreateController as vm',
    authenticate: 'admin'
  })
    .state('show', {
      url: '/courses/:_id',
      template: require('./show/show.html'),
      controller: 'ShowController',
      controllerAs: 'vm',
    })
}
