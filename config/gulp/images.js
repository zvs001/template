'use strict';


const $ = require('gulp-load-plugins')({
	rename: {
   		'rev-replace': 'revReplace'
	}
});

const gulp = require('gulp');
const combine = require('stream-combiner2').obj


const config = require("../config.json").gulp;

const svgmin = require("gulp-svgmin");

const pngquant = require('imagemin-pngquant');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminMozjpeg = require('imagemin-mozjpeg');


gulp.task('images' ,function () {

		return combine(

				gulp.src([
						config.images.src,
						"!" + config.images.sprites.src
					]),
				
				$.newer( config.images.dest ),

				$.imagemin( [
					//jpg
					$.imagemin.jpegtran({progressive: true}),
					imageminJpegoptim({
						progressive: true
					}),
					//png
					pngquant(),

					//gif
					$.imagemin.gifsicle({interlaced: true}),

					// imagemin.svgo({plugins: [{removeViewBox: true}]})

					//no info about format but it is so strong compress
					imageminMozjpeg()
				]),

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