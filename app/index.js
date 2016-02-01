'use strict';

var yeoman = require('yeoman-generator');
var objectAssign = require('object-assign');

var ReadmeGenerator = yeoman.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your project called?',
        default: this.options.appname || this.appname,
        when: !this.options.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Briefly describe the project',
        default: this.options.description,
        when: !this.options.description
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your full name?',
        default: this.options.author || this.user.git.name(),
        when: !this.options.author
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        default: this.options.email || this.user.git.email(),
        when: !this.options.email
      },
      {
        type: 'input',
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        default: this.options.website,
        when: !this.options.website,
        validate: x => x.length > 0 ? true : 'You have to provide a website URL',
      },
      {
        type: 'input',
        name: 'githubUser',
        message: 'What is your GitHub username?',
        default: this.options.githubUser || this.githubUser,
        when: !this.options.githubUser,
        validate: x => x.length > 0 ? true : 'You have to provide a username',
        store: true
      }
    ];

    this.prompt(prompts, function(props) {
      this.props = objectAssign({
        name: this.options.appname,
        description: this.options.description,
        author: this.options.author,
        email: this.options.email,
        website: this.options.website,
        githubUser: this.options.githubUser,
        license: this.options.license,
        year: new Date().getFullYear(),
        isNodeModule: this.options.isNodeModule || false
      }, props);
      done();
    }.bind(this));
  },

  writing: function() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    if (!this.props.license) {
      this.props.license = pkg.license || 'MIT'
    }
    this.template('_README.md', 'README.md', this.props);
  }
});

module.exports = ReadmeGenerator;
