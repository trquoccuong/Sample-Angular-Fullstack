'use strict';

import angular from 'angular';
import CreateController from './create.controller';

export default angular.module('elearningSiteApp.course.create', [])
  .controller('CreateController', CreateController)
  .name;
