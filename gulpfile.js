var gulp = require('gulp');
var browserSync = require('browser-sync');

// Paths to various files
var paths = {
    scripts: ['js/**/*'],
    styles: ['css/*.css'],
    content: ['*.html']
};

// Launches a test webserver
gulp.task('browser', function(){
    browserSync({
        port: 8000,
        server: {
            baseDir: "."
        },
        browser: 'google chrome',
    });
});

gulp.task('default', ['browser'], function () {
    gulp.watch(paths.scripts, browserSync.reload);
    gulp.watch(paths.content.concat(paths.styles), browserSync.reload);
    gulp.watch(paths.styles, browserSync.reload);
});
