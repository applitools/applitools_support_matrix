module.exports = {
    spec: [
        './tests/*.spec.js',
    ],
    // parallel: true,
    // jobs: process.env.MOCHA_JOBS || 2,
    timeout: 0,
    require: './global.js',
}