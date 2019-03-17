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
const turndownService = require('turndown');

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

// Declare turndown engine.
var turndown = function (options, customize) {
    return through.obj(function (input, encoding, callback) {
        var ts;

        if (typeof options === 'function') {
            ts = options();
        } else {
            ts = new turndownService(options);
        }

        if (typeof customize === 'function') {
            customize(ts);
        }

        let output = input.clone();

        var content = ts.turndown(String(input.contents));
        output.contents = new Buffer(content.trim());

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
function doc() {
    return gulp.src('src/doc.html')
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
            .pipe(gulp.dest('.'))
            .pipe(turndown({
                headingStyle: 'atx',
                codeBlockStyle: 'fenced'
            }, function (ts) {
                ts.remove('title').remove('style').remove('script').remove('header').remove('off');
            }))
            .pipe(rename('README.md'))
            .pipe(gulp.dest('.'));
}

// Declare tasks.

gulp.task('lib', gulp.series(lib));

gulp.task('doc', gulp.series(doc));

gulp.task('dist', gulp.series(lib, doc));

gulp.task('watch', function () {
    gulp.watch('src/**/*', gulp.series('dist'));
});

gulp.task('default', gulp.series('dist', 'watch'));
