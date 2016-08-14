


build:
	browserify -t rollupify -t babelify index.js > ./dist/http-status-class.js
