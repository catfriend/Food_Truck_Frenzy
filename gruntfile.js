module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', "!**/libs/*.js"],
			options: {
				curly: true,
				eqeqeq: true,
				globals: {
					afterEach: true,
					after: true
				}
			}
		},
		mocha: {
			all: {
				src: ["test/**/*.html"],
				options: {
					mocha: {
						ignoreLeaks: true
					},
					run: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.registerTask('default', ['jshint', 'mocha']);
};