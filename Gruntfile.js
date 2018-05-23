module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            compileLESS: {
                files: {
                     './css/style.css': './less/**.less'  /// FOR "GALLERY"
                }
            }
        },
        postcss:{
            options:{
                processors:[
                    require("autoprefixer")({browsers:"last 2 versions"}),
                    require("css-mqpacker")({
                        sort: true
                    })
                ]

            },
            style: {src:"css/*.css"}
        },
        watch: {
            watchLESS: {
              //   files: ['less/index/**/*.less'], // смотерть "MAIN"
              //   files: ['less/form/**/*.less'], // смотерть "FORM"
                    files: ['less/*.less'], // смотерть "GALLERY"
                tasks: ["less","postcss","csso"],
                options: {
                    livereload: true
                    //server: "build", здесь нужно указать папку билд (просто раскоментировать и мы сможем смотреть из папки билд)
                }
            }
        },
        browserSync:{
          server:{
            bsFiles: {
              src: ["build/*.html", "build/css/*.css"]
            },
            options: {
              server: "build"
            }
          }
        },   // не работает коректно, разобраться
        csso: {
            compress:{
                options:{
                    report:'min'
                },
                files:{
                  //   'css/index.bundle.min.css': ['css/index.css','css/normalize.css']    // обьеденяет и минифицирует "MAIN"
                  // './css/form.bundle.min.css': ['css/form.css', 'css/normalize.css'] // обьеденяет и минифицирует "FORM"
                    './css/style.min.css': ['css/style.css', 'css/normalize.css'] // обьеденяет и минифицирует "GALLERY"
                }
            }
        },
        imagemin: {
            images:{
                options:{
                    optimizationLevel:3
                },
                files:[{
                    expand:true,
                    src:["build/img/**/*.{png,jpg,gif}"]
                }]
            }
        },
        svgstore:{
            optionsP:{
                svg:{
                    style:"display: none"
                }
            },
            symbols:{
                files:{
                    "build/img/symbols.svg":["img/**/*.svg"]
                }
            }

        },
        svgmin:  {
            symbols: {
                files: [{
                    expand: true,
                    src: ["build/img/*svg"]
                }]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            "fonts/**/*.{woff,woff2}",
                            "img/**",
                            "js/**",
                            "css/*.min.css",
                            "*.html"
                        ],
                        dest: "build"
                    }]
            }
        },
        clean:{
            build:["build/"]
        },
        pagespeed: {
            options: {
                nokey: true,
                url: "https://developers.google.com" //Поменять на мой сайт
            },
            prod: {
                options: {
                    url: "https://developers.google.com/speed/docs/insights/v1/getting_started", //Поменять на мой сайт
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 80
                }
            },
            paths: {
                options: {
                    paths: ["/speed/docs/insights/v1/getting_started", "/speed/docs/about"],
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 80
                }
            }
        },
        webpcss: {
            task: {
                options: {
                    baseClass:'.webp',
                    replace_from:/\.(png|jpg|jpeg)/,
                    replace_to:'.webp'
                },
                files: {
                    'main.css':['main.css'] // Указать файлы где будут файлы
                }
            }
        },
        cwebp: {
            static: {
                files: {
                    'img/img-png.webp': 'img/*.png',
                    'img/img-jpg.webp': 'img/*.jpg',
                    'img/img-gif.webp': 'img/*.gif'
                }
            },
            dynamic: {
                options: {
                    q: 50
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        uncss: {
            dist: {
                files: {
                    'dist/css/tidy.css': ['app/index.html', 'app/about.html'] // Указать путь файла
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-webpcss');
    grunt.loadNpmTasks('grunt-cwebp');
    grunt.loadNpmTasks('grunt-uncss');


    grunt.registerTask('main',['less','postcss','csso','watch']);



//  require("load-grunt-tasks")(grunt);  подключит автоматически все таски
 //   grunt.loadNpmTasks('grunt-browser-sync');


};

