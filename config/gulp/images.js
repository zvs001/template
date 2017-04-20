'use strict';


const $ = require('gulp-load-plugins')({
	rename: {
   		'rev-replace': 'revReplace'
	}
});

const gulp = require('gulp');
const combine = require('stream-combiner2').obj


const config = require("../config.json").gulp;

const pngquant = require('imagemin-pngquant');
const svgmin = require("gulp-svgmin");

gulp.task('images' ,function () {

		return combine(

				gulp.src([
						config.images.src,
						"!" + config.images.sprites.src
					]),
				
				$.newer( config.images.dest ),

				$.imagemin({ 
					progressive: true, 
					use: [pngquant()] 
				}),

				gulp.dest( config.images.dest ),

				gulp.src( config.images.svg.src ),
				$.newer( config.images.svg.dest ),
				svgmin(),
				gulp.dest( config.images.svg.dest )

		).on("error", $.notify.onError())
});



gulp.task("images:watch", function(){

	gulp.watch( config.images.src, gulp.series('images') );
	gulp.watch( config.images.svg.src , gulp.series('images') );

});