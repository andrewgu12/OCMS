module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: "compressed",
          sourcemap: "none"
        },
        files: {
          "public/stylesheets/library.css" : "src/public/sass/library.scss"
        }
      }
    },
    ts: {
      build: {
        src: ["./src/**/*.ts",  "!node_modules/**/*.ts"],
        outDir: ".",
        options: {
          module: "commonjs",
          comments: true,
          noLib: false,
          target: "es6",
          rootDir: "src",
          sourceMap: false
        }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["./src/**/*.ts", "!node_modules/**/*.ts", "!**/src/*.baseDir.ts"]
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true
      },
      my_target: {
        files: {
          "public/javascript/app.min.js" : ["bower_components/jquery/dist/jquery.js", "public/javascript/library.js"]
        }
      }
    },
    watch: {
      ts: {
        files: "./src/**/*.ts",
        tasks: ["ts", "tslint", "uglify"]
      },
      styles: {
        files: "src/public/sass/*.scss",
        tasks: ["sass"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask("default", ["watch"]);
};
