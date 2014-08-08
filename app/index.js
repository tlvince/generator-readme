'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var gitConfig = require('git-config');

var ReadmeGenerator = yeoman.generators.Base.extend({
  init: function() {
    var done = this.async();
    gitConfig(function(err, config) {
      if(err) {
        return done(err);
      }

      this.author = config.user.name;
      this.email = config.user.email;
      this.githubUser = config.github.user;

      done();
    }.bind(this));

    this.year = new Date().getFullYear();
  },

  askFor: function() {
    var done = this.async();

    this.log(yosay('Welcome to the marvelous Readme generator!'));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your project called?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe the project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your full name?',
        default: this.author
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        default: this.email
      },
      {
        type: 'input',
        name: 'githubUser',
        message: 'What is your GitHub username?',
        default: this.githubUser
      }
    ];

    this.prompt(prompts, function(props) {
      for (var prop in props) {
        this[prop] = props[prop];
      }
      done();
    }.bind(this));
  },

  readme: function() {
    this.template('_readme.md', 'readme.md');
  }
});

module.exports = ReadmeGenerator;
