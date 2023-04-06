module.exports = {
    spec: [
        '../tests/support/*.spec.js',
    ],
    reporter: 'mocha-allure-reporter',
    parallel: true,
    jobs: process.env.MOCHA_JOBS || 2,
    timeout: 0,
}