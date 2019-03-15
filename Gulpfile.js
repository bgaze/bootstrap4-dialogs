// Dependencies.
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var beautify = require('gulp-beautify');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var prettyHtml = require('gulp-pretty-html');
var through = require('through2');
var pcl = require("pretty-console.log")

// Enable prettified console.
pcl.enable()

// Declare populate engine.
var populate = function (transforms) {
    return through.obj(function (input, encoding, callback) {
        // Get stream content.
        var content = String(input.contents);

        // Replace all template.
        var m;
        do {
            m = /"(!)?(\.\/src\/.+\.(js|html))"/g.exec(content);
            if (m) {
                // Get template content.
                let template = fs.readFileSync(m[2], 'utf8');

                // Transform template if transformer is provided.
                if (transforms !== undefined) {
                    if (typeof transforms[m[3]] === 'function') {
                        template = transforms[m[3]](template, m[1] === '!');
                    } else if (typeof transforms === 'function') {
                        template = transforms(template, m[1] === '!', m[2]);
                    }
                }

                // Replace all occurences into content.
                let reg = new RegExp(m[0].replace(/\./g, '\\.').replace(/\//g, '\\/'), 'g');
                content = content.replace(reg, template);
            }
        } while (m);

        // Return new content as stream.
        var output = input.clone();
        output.contents = new Buffer(content);
        callback(null, output);
    });
};

// Compile lib.
gulp.task('lib', function () {
    gulp.src('src/bootstrap4-dialogs.js')
            .pipe(populate({
                html: function (content) {
                    return JSON.stringify(content.replace(/>\s+/g, '>').trim());
                },
                js: function (content) {
                    return content.replace(/bsd\./g, 'this.');
                }
            }))
            .pipe(beautify.js({indent_size: 4}))
            .pipe(gulp.dest('dist'))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('dist'));
});

// Compile demo.
gulp.task('demo', function () {
    gulp.src('src/demo.html')
            .pipe(populate(function (content, escaped, filename) {
                if (escaped) {
                    return content.replace(/>/g, '&gt;').replace(/</g, '&lt;').trim();
                }

                var m = /^\.\/src\/templates\/(alert|confirm|prompt)\.html$/.exec(filename);
                if (m) {
                    return '<a href="#' + m[1] + '">See below</a>';
                }

                return content;
            }))
            .pipe(prettyHtml({
                indent_inner_html: true,
                wrap_line_length: 0,
                extra_liners: []
            }))
            .pipe(gulp.dest('dist'));
});

// Compile readme.
gulp.task('readme', function () {
    gulp.src('src/README.md')
            .pipe(populate())
            .pipe(gulp.dest('.'));
});

// Compile all files.
gulp.task('dist', ['lib', 'demo', 'readme']);

// Watch for file changes.
gulp.task('watch', function (cb) {
    gulp.watch('src/**/*', ['dist']);
});

// Default.
gulp.task('default', ['dist', 'watch']);