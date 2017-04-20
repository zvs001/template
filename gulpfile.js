

const gulp = require('gulp');
const del = require("del");


var requireDir = require('require-dir');
requireDir('config/gulp');



gulp.task("watch", gulp.parallel("jade:watch", "styles:watch", "scripts:watch", "images:watch", "sprites:watch", "fonts:watch" ));

const browserSync = require('browser-sync').create();


gulp.task("clear", function(){
	//promise
	return del([ 
		"./app"
	]);
})



gulp.task('default', 
	gulp.series(gulp.parallel("images", "spritesheet"), 'styles', 'jade', "scripts", "fonts", gulp.parallel('server', 'watch'))	 
);


gulp.task("build",
	gulp.series("sprites:build", gulp.parallel("images", "sprites:group"), 'styles:build', "scripts:build", "fonts:build", "jade:build")
);

gulp.task("rebuild", gulp.series("clear", "build"));