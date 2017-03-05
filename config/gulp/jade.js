'use strict';


const $ = require('gulp-load-plugins')({
	rename: {
    'rev-replace': 'revReplace',
    'jade-filter': 'jadeFilter'
  }
});

const gulp = require('gulp');
const combine = require('stream-combiner2').obj

const config = require("../config.json").gulp;


gulp.task('jade', function () {

		return combine(

				gulp.src( config.jade.src ),
				$.jadeFilter({ match: config.jade.filter }),

				$.pug({
					pretty: !config.jade.minify
				}),

				gulp.dest( config.jade.dest )


		).on("error", $.notify.onError())
});




gulp.task('jade:build', function () {

		return combine(

				gulp.src( config.jade.src ),

				$.jadeFilter({ match: config.jade.filter }),

				$.pug({
					pretty: !config.jade.minify
				}),

				$.if(config.project.rev, combine(
						$.revReplace({
							manifest: gulp.src( [
									config.manifest.dir + config.manifest.css,
									config.manifest.dir + config.manifest.js,
									config.manifest.dir + config.manifest.jsBundle,
									config.manifest.dir + config.manifest.cssBundle,

								], {allowEmpty: true} )
						})
				)),


				gulp.dest( config.jade.dest )


		).on("error", $.notify.onError())
});


gulp.task("jade:watch", function(){

	gulp.watch( config.jade.src, gulp.series('jade') );

});