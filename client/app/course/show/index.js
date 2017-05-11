'use strict';

import angular from 'angular';
import showController from './show.controller';

export default angular.module('elearningSiteApp.course.show', [])
  .controller('ShowController', showController)
  .name;
