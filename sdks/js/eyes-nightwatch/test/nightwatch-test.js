const {Target} = require('@applitools/eyes-nightwatch')
const ufg = process.env.USE_UFG !== undefined;
const tag = ufg ? 'UFG' : 'Classic';
module.exports = {
    'Window': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Window - ${tag}`, {width: 700, height: 460})
            .eyesCheck(Target.window().fully())
            .eyesClose()
            .end()
    },
    'Region': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Region - ${tag}`, {width: 700, height: 460})
            .eyesCheck({region: {x: 50, y: 70, width: 90, height: 110}})
            .eyesClose()
            .end()
    },
    'Frame': function (browser) {
        browser
            .url('https://applitools.github.io/demo/TestPages/FramesTestPage/')
            .eyesOpen('Applitools Support Matrix', `Frame - ${tag}`, {width: 700, height: 460})
            .eyesCheck({frames: ["[name=\"frame1\"]"]})
            .eyesClose()
            .end()
    }
}