'use strict';

const build = require('@microsoft/sp-build-web');
const gulpESLintNew = require('gulp-eslint-new');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.tslintCmd.enabled = false;

const eslintSubTask = build.subTask('gulpESLintNew', function (gulp, buildOptions, done) {
  return gulp.src(['src/**/*.{ts,tsx}'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(gulpESLintNew())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(gulpESLintNew.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpESLintNew.failAfterError());
});

build.rig.addPreBuildTask(build.task('eslint-new', eslintSubTask));

build.initialize(require('gulp'));
