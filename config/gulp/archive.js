'use strict';


const $ = require('gulp-load-plugins')();

const gulp = require('gulp');

const config = require("../config.json").gulp;

const combine = require('stream-combiner2').obj;

const del = require("del");

gulp.task('arch', function () {

		return combine(
				gulp.src( [
							"./**/*", 
							"!./node_modules/**/*",
							"!" + config.archive + "/**/*",
							"!" + config.project.root + "/**/*",
							// "!dist/**/*",
							"!design/**/*"
						]
					),

				$.zip( config.project.name + "-dev.zip"),

				gulp.dest( config.archive )

		).on("error", $.notify.onError())
});

gulp.task('arch:build', function () {

		return combine(
				gulp.src( [
							"./**/*", 
							"!./node_modules/**/*",
							"!" + config.archive + "/**/*",
						//	"!" + config.project.root + "/**/*",  compiled
							"!dist/**/*",
							"!design/**/*"
						]
					),

				$.zip( config.project.name + ".zip"),

				gulp.dest( config.archive )

		).on("error", $.notify.onError())
});

gulp.task("arch:clear", function(){
	return del([ 
		config.archive
	]);
})


gulp.task("archive", gulp.series(/*"arch:clear",*/ "arch"));
gulp.task("archive:build", gulp.series(/*"arch:clear",*/ "arch:build"));
