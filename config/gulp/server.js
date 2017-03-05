'use strict';

const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const config = require("../config.json").gulp;


gulp.task('server', function () {

		browserSync.init({

				port: config.server.port,
				server: {
					baseDir: config.server.dir
				},
				notify: config.server.notifications,
				ghostMode: !config.server.deviceSync
		});

    	browserSync.watch(config.server.dir + "**/*").on('change', browserSync.reload);

});