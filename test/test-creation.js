/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('readme generator', function () {
  it('creates expected files', function (done) {
    var expected = [
      'README.md'
    ];

    var answers = {
      name: 'project-tashen',
      description: 'Moustaches for all',
      author: 'Yeoman',
      email: 'yo@man.com',
      username: 'yeoman',
      year: '2014'
    };

    helpers.run(path.join(__dirname, '../app'))
      .withPrompts(answers)
      .on('end', function() {
        assert.file(expected);
        done()
      });
  });
});
