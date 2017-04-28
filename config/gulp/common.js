'use strict';


const $ = require('gulp-load-plugins')();

const gulp = require('gulp');

const config = require("../config.json").gulp;

const combine = require('stream-combiner2').obj;


/*
	just move files like .htaccess to root directory
*/
gulp.task('common', function () {

		return combine(
				gulp.src( config.common.src ),

				// $.newer( config.common.dest ),

				gulp.dest( config.common.dest )

		).on("error", $.notify.onError())
});