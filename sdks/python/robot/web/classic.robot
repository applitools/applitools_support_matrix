*** Settings ***
# Use Selenium WebDriver and Applitools Eyes with the Classic runner.
Library     SeleniumLibrary
Library     EyesLibrary       runner=web    config=applitools.yml

# Declare setup and teardown routines.
Test Setup        Setup
Test Teardown     Teardown


*** Keywords ***
# For setup, load the demo site's login page and open Eyes to start visual testing.
Setup
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    Call Method    ${chrome_options}    add_argument    --disable-gpu
    Call Method    ${chrome_options}    add_argument    --headless
    Create WebDriver    Chrome    chrome_options=${chrome_options}
    Go To    https://applitools.github.io/demo/TestPages/FramesTestPage/
    Eyes Open

# For teardown, close Eyes and the browser.
Teardown
    Eyes Close Async
    Close All Browsers


*** Test Cases ***

Window - Classic
    Eyes Check Window

Region - Classic
    Eyes Check Region By Coordinates    [50 70 90 110]

Frame - Classic
    Eyes Check Frame By Name    frame1

