import Eyes from '@applitools/eyes-testcafe';

let eyes;
fixture`Testcafe UFG`
    .page`https://applitools.github.io/demo/TestPages/FramesTestPage/`
    .beforeEach(() => {
        eyes = new Eyes();
    })
    .afterEach(async () => eyes.close())
    .after(async () => {
        let allTestResults = await eyes.waitForResults(true)
        console.log(allTestResults)
    });

test('Window - UFG', async t => {
    await eyes.open({
        t,
        testName: 'Window - UFG',
    });
    await eyes.checkWindow({target:'window', fully: true})
});


test('Region - UFG', async t => {
    await eyes.open({
        t,
        testName: 'Region - UFG',
    });
    await eyes.checkWindow({target: 'region',region: {x: 50, y: 70, width: 90, height: 110}})
});