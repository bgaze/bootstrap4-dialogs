// Dependencies.
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const beautify = require('gulp-beautify');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const prettyHtml = require('gulp-pretty-html');
const through = require('through2');
const chalk = require('chalk');

// Declare populate engine.
var populate = function (transforms) {
    var content, replaced, errors = {};

    var loadFile = function (path, escaped, type) {
        let file = false;

        if (!fs.existsSync(path)) {
            errors[path] = chalk.redBright('           Missing file: ') + path;
            return false;
        }

        file = fs.readFileSync(path, 'utf8');

        if (transforms && typeof transforms[type] === 'function') {
            return transforms[type](file, escaped, path);
        }

        if (transforms && typeof transforms === 'function') {
            return transforms(file, escaped, path);
        }

        return file;
    };

    var populateWithFile = function (m) {
        let pattern = m[0];
        let path = m[2];
        let type = m[3];
        let escaped = (m[1] === '!');

        let file = loadFile(path, escaped, type);
        if (!file) {
            return false;
        }

        let reg = new RegExp(pattern.replace(/\./g, '\\.').replace(/\//g, '\\/'), 'g');
        content = content.replace(reg, file);
        return true;
    };

    return through.obj(function (input, encoding, callback) {
        content = String(input.contents);
        replaced = true;

        while (replaced) {
            replaced = false;
            let m, reg = /"(!)?(\.\/src\/.+\.(js|html))"/g;

            while (m = reg.exec(content)) {
                if (populateWithFile(m)) {
                    replaced = true;
                }
            }
        }

        for (let e in errors) {
            console.log(errors[e]);
        }

        let output = input.clone();
        output.contents = new Buffer(content);
        callback(null, output);
    });
};

// Compile lib.
function lib() {
    return  gulp.src('src/bootstrap4-dialogs.js')
            .pipe(populate({
                html: function (content) {
                    return JSON.stringify(content.replace(/>\s+/g, '>').trim());
                } 
            }))
            .pipe(beautify.js({indent_size: 4}))
            .pipe(gulp.dest('dist'))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('dist'));
}

// Compile demo.
function demo() {
    return gulp.src('src/demo.html')
            .pipe(populate(function (content, escaped, filename) {
                if (escaped) {
                    return content.replace(/>/g, '&gt;').replace(/</g, '&lt;').trim();
                }

                var m = /^\.\/src\/dialogs\/(alert|confirm|prompt)\.html$/.exec(filename);
                if (m) {
                    return '"[See below]"';
                }

                return content;
            }))
            .pipe(prettyHtml({
                indent_inner_html: true,
                wrap_line_length: 0,
                extra_liners: []
            }))
            .pipe(gulp.dest('dist'));
}

// Compile readme.
function readme() {
    return gulp.src('src/README.md')
            .pipe(populate())
            .pipe(gulp.dest('.'));
}

// Compile all files.

gulp.task('dist', gulp.series(lib, demo, readme));

gulp.task('watch', function () {
    gulp.watch('src/**/*', gulp.series('dist'));
});

gulp.task('default', gulp.series('dist', 'watch'));
