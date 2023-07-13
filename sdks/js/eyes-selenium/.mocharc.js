module.exports = {
    spec: [
        '../../tests/support/*.spec.js',
    ],
    parallel: true,
    jobs: process.env.MOCHA_JOBS || 2,
    timeout: 0,
}