'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;


const config = require("../config.json").gulp;


gulp.task('js', function () {

		return combine(

			gulp.src( config.scripts.src ),

			$.jshint.reporter('default'),

			gulp.dest( config.scripts.dest ),

			$.if("main.js", combine(
				$.jshint(),

				$.notify(function(file){
					
					if(file.jshint.success){
						return false;
					}

					var errors = file.jshint.results.map(function(data){
						if(data.error){
							return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
						}
					}).join("\n");

					return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
				})
			))

		).on("error", $.notify.onError())

});

gulp.task('js:build', function () {

		return combine(

			gulp.src( config.scripts.src ),
		
			$.uglify(),

			$.if( config.project.rev, $.rev() ),

			gulp.dest( config.scripts.dest ),

			$.if(config.project.rev, combine( $.rev.manifest(config.manifest.js), gulp.dest(config.manifest.dir) ))

		).on("error", $.notify.onError())

});


gulp.task('libs:js', function () {

		return combine(

			gulp.src( config.scripts.bundle.src ),

			$.sourcemaps.init(),
			$.concat( config.scripts.bundle.name ),
			$.sourcemaps.write(),

			gulp.dest( config.scripts.bundle.dest )

		).on("error", $.notify.onError())

});


gulp.task('libs:js:build', function () {

		return combine(

			gulp.src( config.scripts.bundle.src ),

			$.concat( config.scripts.bundle.name ),

			$.uglify(),

			$.if(config.project.rev, $.rev() ),

			gulp.dest( config.scripts.bundle.dest ),

			$.if(config.project.rev, combine( $.rev.manifest(config.manifest.jsBundle), gulp.dest(config.manifest.dir) ))

		).on("error", $.notify.onError())

});






gulp.task("scripts:watch", function(){

	gulp.watch( config.scripts.src,  gulp.series('js') );

	gulp.watch( config.scripts.bundle.src,  gulp.series('libs:js') );

});

gulp.task('scripts', gulp.parallel("js", "libs:js"));
gulp.task('scripts:build', gulp.parallel("js:build", "libs:js:build"));