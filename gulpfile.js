const gulp = require('gulp')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const lint = require('gulp-eslint')

gulp.task('build', function() {
    gulp.src('src/**/*.js')
        .pipe(babel({presets: ["env"]}))
        .pipe(gulp.dest('dist'))
})


gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint'])
    gulp.watch('src/**/*.*', ['clean', 'build'])
})

gulp.task('clean', function() {
    gulp.src('dist/*', {read: false})
        .pipe(clean({force: true}))
})


gulp.task('lint', function() {
    gulp.src('src/**/*.js')
        .pipe(lint())
})


gulp.task('default', ['clean', 'lint', 'build', 'watch'])
