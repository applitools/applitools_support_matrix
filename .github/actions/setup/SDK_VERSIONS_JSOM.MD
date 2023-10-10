Sdk version json should be an array of objects containing name of the eyes sdk and it's version
ex:

`[{"name":"js/eyes-cypress", "version": "exact@3.38.0"}]`


Names which could be used for the support matrix

* js/eyes-webdriverio
* js/eyes-testcafe
* js/eyes-storybook
* js/eyes-puppeteer
* js/eyes-protractor
* js/eyes-playwright
* js/eyes-nightwatch
* js/eyes-cypress
* js/eyes-selenium
* python/eyes-selenium
* python/eyes-robotframework
* python/eyes-playwright
* java/eyes-selenium-java5
* java/eyes-appium-java5
* java/eyes-playwright-java5
* dotnet/selenium
* dotnet/selenium4
* dotnet/appium
* dotnet/playwright
* ruby/selenium
* ruby/appium

Currently version should be used with a tag `exact@` which will version should be picked up from the package manager. 
