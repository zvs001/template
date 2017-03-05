'use strict';

const $ = require('gulp-load-plugins')({
	rename: {
    'concat-css': 'concatCss'
  }
});
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

const config = require("../config.json").gulp;
const path = require("path");


const assets  = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


gulp.task('sass', function () {

		return combine(

			gulp.src( config.styles.src ),

			$.if(config.styles.sourcemaps, $.sourcemaps.init()),

			$.sass({  includePaths: [
						require("node-bourbon").includePaths,
						//includePath(config.images.sprites.dest, "../../") //sprites
					]}),
			$.postcss([
				assets({
					basePath: 'app/',
					loadPaths: [config.images.dest]
				}),
				autoprefixer
			]),
			$.if(config.styles.sourcemaps, $.sourcemaps.write()),

			gulp.dest( config.styles.dest )

		).on("error", $.notify.onError())

});

gulp.task('sass:build', function () {

		return combine(

			gulp.src( config.styles.src ),

			$.sass({  includePaths: [
				require("node-bourbon").includePaths,
			]}),
			
			$.postcss([
				assets({
					basePath: 'dev',
					loadPaths: [config.images.dest]
				}),
				autoprefixer, 
				cssnano
			]),

			$.if(config.project.rev, combine(
				$.revReplace({
						manifest: gulp.src( config.manifest.dir + config.manifest.sprites, {allowEmpty: true} )
				}),
				$.rev()
			)),

			gulp.dest( config.styles.dest ),

			$.if(config.project.rev, combine( $.rev.manifest(config.manifest.css), gulp.dest(config.manifest.dir) ))

		).on("error", $.notify.onError())

});


gulp.task('libs:css', function () {

		return combine(

			gulp.src( config.styles.bundle.src ),

			$.concatCss( config.styles.bundle.name ),

			gulp.dest( config.styles.bundle.dest )

		).on("error", $.notify.onError())

});

gulp.task('libs:css:build', function () {

		return combine(

			gulp.src( config.styles.bundle.src ),

			$.concatCss( config.styles.bundle.name ),

			$.if( config.project.rev, $.rev() ),

			gulp.dest( config.styles.bundle.dest ),

			$.if(config.project.rev, combine( $.rev.manifest(config.manifest.cssBundle), gulp.dest(config.manifest.dir) ))

		).on("error", $.notify.onError())

});

//append stylesheet dir for sass
function includePath(filedir, pattern){
	var projectDir = path.join(__dirname, pattern);
	var fileDir = path.join( projectDir, filedir );
	return fileDir;
}


gulp.task("styles:watch", function(){

	gulp.watch( config.styles.watch, gulp.series('sass') );

	gulp.watch( config.styles.bundle.src,  gulp.series('libs:css') );

});


gulp.task('styles', gulp.parallel("sass", "libs:css"));
gulp.task('styles:build', gulp.parallel("sass:build", "libs:css:build"));