module.exports = {
  testConcurrency: 15,
  apiKey: process.env.APPLITOOLS_API_KEY,
  appName: 'Applitools Support Matrix',
  batchName: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Testcafe',
  branchName: 'testcafe',
  parentBranchName: 'testcafe',
  browser: [
    {width: 700, height: 460, name: 'chrome'},
  ],
}
