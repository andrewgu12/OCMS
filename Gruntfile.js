module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
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
    watch: {
      ts: {
        files: "./src/**/*.ts",
        tasks: ["ts", "tslint"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask("default", ["watch"]);
};
