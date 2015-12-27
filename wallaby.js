var babel = require('babel-core');
module.exports = function (wallaby) {
    var babelCompiler = wallaby.compilers.babel({
        babel,
        presets: ['es2015']
    });
    return {
        files: [
            'src/**/*.js'
        ],
        tests: [
            'test/**/*Spec.js'
        ],
        compilers: {
            '**/*.js': babelCompiler
        },
        testFramework: 'mocha',
        debug: true,
        env: {
            type: 'node',
            runner: 'node'
        }
    };
};
