

const layout_css_folder = 'public/layout/css',
    layout_js_folder = 'public/layout/js';

const components_folder = 'public/components';

const app_folder = 'public/app';

// Define plugins
const { parallel, src, dest, watch, series } = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    jshint = require('gulp-jshint'),
    compileSass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rtlcss = require('gulp-rtlcss');
    minifyJs = require('gulp-minify');


// Setup tasks
// ------------------------------

// Lint
function lint() {
    return src(layout_js_folder + '/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

function app_components_js(){
    return src(['libs/*.js']).pipe(dest(components_folder + '/js/main'));
}

function app_js(){
    return src(['app/layout/**/*'])
        .pipe(dest(app_folder + '/js'));
}
function app_bootstrap(){
    return src(['bootstrap/**/*'])
        .pipe(dest(components_folder + '/bootstrap'));
}

function config(){
    return src(['app/config.json'])
        .pipe(dest(app_folder + '/'));
}

function templates(){
    return src(['app/templates/**/*'])
        .pipe(dest(app_folder + '/templates'));
}


var all_components = parallel(app_components_js);
var all_app = parallel(app_js, app_bootstrap, templates);
exports.default = series(lint, all_components, all_app, config);



function watchFiles() {
    return watch('app/layout/**/*.js', series(all_app));
}

//
// Register tasks
//

exports.lint = lint;
exports.watch = watchFiles;
exports.components = all_components;
exports.app = all_app;
exports.config = config;
