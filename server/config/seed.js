/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let Course = sqldb.Course;
    let User = sqldb.User;

    Course.destroy({ where: {} })
      .then(() => {
        let courses = Course.bulkCreate([{
          name: 'Development Tools',
          description: 'Demo',
          youtubeID: 'IgS7oCV2OTE',
          price: 0,
          numberOfLikes: 0
        },{
          name: 'Development Tools 2',
          description: 'Demo',
          youtubeID: 'IgS7oCV2OTE',
          price: 10,
          numberOfLikes: 0
        }]);
        return courses;
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    return User.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));
  }
}
