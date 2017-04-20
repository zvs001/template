'use strict';


const $ = require('gulp-load-plugins')({
	rename: {
    	'rev-replace': 'revReplace'
  	}
});

const gulp = require('gulp');
const combine = require('stream-combiner2').obj
const path = require("path")

const spritesmith = require('gulp.spritesmith');

const buffer = require('vinyl-buffer');

const config = require("../config.json").gulp;

const pngquant = require('imagemin-pngquant');


gulp.task("sprites", function(){

	return combine(
			gulp.src([				
				config.images.sprites.src,
				"!" + config.images.sprites.group
			]),

			spritesmith({
				imgName: config.images.sprites.name || "sprite.png",
				cssName: config.images.sprites.cssname || "sprite.sass",
				imgPath: config.images.sprites.pathUrl + config.images.sprites.name
			}),

			buffer(),

			
			$.if("*.sass", gulp.dest(config.images.sprites.cssdest)),
			$.if("*.png", gulp.dest(config.images.sprites.dest))

	).on("error", $.notify.onError());

});

gulp.task("sprites:build", function(){

	return combine(
			gulp.src([				
				config.images.sprites.src,
				"!" + config.images.sprites.group
			]),

			spritesmith({
				imgName: config.images.sprites.name || "sprite.png",
				cssName: config.images.sprites.cssname || "sprite.sass",
				imgPath: config.images.sprites.pathUrl + config.images.sprites.name
			}),

			buffer(),
			
			$.imagemin({ 
					progressive: true, 
					use: [pngquant()] 
				}),

			$.if( config.project.rev, $.if( "*.png", $.rev() )),

			$.if("*.sass", gulp.dest(config.images.sprites.cssdest)),
			$.if("*.png", gulp.dest(config.images.sprites.dest)),
			
			$.if(config.project.rev, combine( $.rev.manifest(config.manifest.sprites), gulp.dest(config.manifest.dir) ))

		).on("error", $.notify.onError());

});
gulp.task("sprites:group", function(){

	var group_name = "sprite-group";

	return combine(
			gulp.src( config.images.sprites.group ),

			spritesmith({
				imgName: group_name + ".png",
				cssName: group_name + ".sass",
				imgPath: config.images.sprites.pathUrl + group_name + ".png"
			}),

			buffer(),

			$.imagemin({ 
					progressive: true, 
					use: [pngquant()] 
				}),

			
			$.if("*.sass", gulp.dest(config.images.sprites.cssdest)),
			$.if("*.png", gulp.dest(config.images.sprites.dest))

		).on("error", $.notify.onError());

});




gulp.task("sprites:watch", function(){

	var src = 	[
					config.images.sprites.src,
					"!" + config.images.sprites.group 
				];

	gulp.watch( src, gulp.series('sprites') );

	gulp.watch( config.images.sprites.group, gulp.series("sprites:group") );

});

gulp.task("spritesheet", gulp.series( "sprites", "sprites:group"));