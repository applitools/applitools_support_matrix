const {Target} = require('@applitools/eyes-nightwatch')
const ufg = process.env.USE_UFG !== undefined;
const tag = ufg ? 'UFG' : 'Classic';
const size = ufg ? undefined : {width: 700, height: 460};
module.exports = ufg ? {
    'Window': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Window - ${tag}`, size)
            .eyesCheck(Target.window().fully())
            .eyesClose()
            .end()
    },
    'Region': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Region - ${tag}`, size)
            .eyesCheck({region: {x: 50, y: 70, width: 90, height: 110}})
            .eyesClose()
            .end()
    }
} : {
    'Window': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Window - ${tag}`, size)
            .eyesCheck(Target.window().fully())
            .eyesClose()
            .end()
    },
    'Region': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Region - ${tag}`, size)
            .eyesCheck({region: {x: 50, y: 70, width: 90, height: 110}})
            .eyesClose()
            .end()
    },
    'Frame': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Frame - ${tag}`, size)
            .eyesCheck({frames: ["[name=\"frame1\"]"]})
            .eyesClose()
            .end()
    }
}