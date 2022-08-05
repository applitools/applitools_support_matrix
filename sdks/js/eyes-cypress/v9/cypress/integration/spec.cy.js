describe('UFG', () => {

  beforeEach(() => {
    cy.visit('https://applitools.github.io/demo/TestPages/FramesTestPage/')
  })

  it('Window - UFG', () => {
    cy.eyesOpen({
      testName: 'Window - UFG',
    })
    cy.eyesCheckWindow({target:'window', fully: true})
  })

  it('Region - UFG', () => {
    cy.eyesOpen({
      testName: 'Region - UFG',
    })
    cy.eyesCheckWindow({target: 'region',region: {x: 50, y: 70, width: 90, height: 110}})
  })

  afterEach(() => {
    cy.eyesClose()
  })
})