'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routes from './course.routes';
import create from './create';
import show from './show';


export default angular.module('elearningSiteApp.course', [uiRouter, create, show])
  .config(routes)
  .name;
