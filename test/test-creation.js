/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('readme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('readme:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'readme.md'
    ];

    helpers.mockPrompt(this.app, {
      name: 'project-tashen',
      description: 'Moustaches for all',
      author: 'Yeoman',
      email: 'yo@man.com',
      username: 'yeoman',
      year: '2014'
    });
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
