'use strict';


const $ = require('gulp-load-plugins')();

const gulp = require('gulp');

const config = require("../config.json").gulp;

const combine = require('stream-combiner2').obj;


gulp.task('fonts', function () {

		return combine(
				gulp.src( config.fonts.src ),

				$.newer( config.fonts.dest ),

				gulp.dest( config.fonts.dest )

		).on("error", $.notify.onError())
});

gulp.task('fonts:build', function () {

		return combine(
				gulp.src( config.fonts.src ),

				$.newer( config.fonts.dest ),

				$.if("**/*.ttf", $.fontmin()),

				gulp.dest( config.fonts.dest )

		).on("error", $.notify.onError())
});



gulp.task("fonts:watch", function(){

	gulp.watch( config.fonts.src, gulp.series('fonts') );

});