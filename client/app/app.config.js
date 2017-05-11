'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, PaypalButtonConfigProvider) {
  'ngInject';

  PaypalButtonConfigProvider.setMerchantId('V28Q5C44SFR9U');
  PaypalButtonConfigProvider.setEnvironment('sandbox');

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
