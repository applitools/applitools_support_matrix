*** Settings ***
# Use Selenium WebDriver and Applitools Eyes with the Classic runner.
Library     SeleniumLibrary
Library     EyesLibrary       runner=web_ufg    config=applitools.yml

# Declare setup and teardown routines.
Test Setup        Setup
Test Teardown     Teardown


*** Keywords ***
# For setup, load the demo site's login page and open Eyes to start visual testing.
Setup
    Open Browser    https://applitools.github.io/demo/TestPages/FramesTestPage/    headlesschrome
    Eyes Open

# For teardown, close Eyes and the browser.
Teardown
    Eyes Close Async
    Close All Browsers

*** Test Cases ***

Window - UFG
    Eyes Check Window

Region - UFG
    Eyes Check Region By Coordinates    [50 70 90 110]
