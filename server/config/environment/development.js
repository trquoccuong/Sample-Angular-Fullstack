'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:1@localhost:5432/demo',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
