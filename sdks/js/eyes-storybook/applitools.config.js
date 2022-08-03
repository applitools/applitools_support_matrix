module.exports = {
  concurrency: 15,
  apiKey: process.env.APPLITOOLS_API_KEY,
  appName: 'Applitools Support Matrix',
  batchName: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Storybook',
  branchName: 'master',
  parentBranchName: 'master',
  browser: [
    {width: 700, height: 460, name: 'chrome'},
    {width: 700, height: 460, name: 'edgechromium'},
    {width: 700, height: 460, name: 'firefox'},
    {width: 700, height: 460, name: 'safari'},
  ],
}
