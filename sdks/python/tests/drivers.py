import os
import time

import pytest
from selenium import webdriver
from appium import webdriver as appium_webdriver
from applitools.selenium import Eyes
from urllib3.exceptions import MaxRetryError

@pytest.fixture(scope="function")
def sauce_options():
    options = {
        "username": os.environ["SAUCE_USERNAME"],
        "accessKey": os.environ["SAUCE_ACCESS_KEY"],
        "name": 'Support Matrix Python'
    }
    appium_version = os.getenv("APPIUM_VERSION")
    if appium_version is not None:
        options["appiumVersion"] = appium_version
    return options



@pytest.fixture(scope="function")
def chrome():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)


@pytest.fixture(scope="function")
def ios(sauce_options):
    api_key = os.environ["APPLITOOLS_API_KEY"]
    args = '{"args": [], "env": {"DYLD_INSERT_LIBRARIES": "@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib","NML_API_KEY":"' + api_key + '"}}'
    caps = {
        "browserName": '',
        "platformName": 'iOS',
        "appium:platformVersion": '15.4',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=awesomeswift.app.zip',
        "appium:deviceName": 'iPhone 8 Simulator',
        "appium:automationName": 'XCUITest',
        "appium:processArguments": args,
        'sauce:options': sauce_options
    }
    return start_appium_driver(caps)

@pytest.fixture(scope="function")
def android_nmg(sauce_options):
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=android_nmg.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        'sauce:options': sauce_options
    }
    Eyes.set_nmg_capabilities(caps)
    return start_appium_driver(caps)


@pytest.fixture(scope="function")
def android(sauce_options):
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=android_nmg.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        'sauce:options': sauce_options
    }
    return start_appium_driver(caps)



def start_appium_driver(caps):
    try:
        return appium_webdriver.Remote(command_executor="https://ondemand.us-west-1.saucelabs.com:443/wd/hub",
                                       desired_capabilities=caps)
    except MaxRetryError:
        print("Tried to initiate driver")
    time.sleep(60)
    return appium_webdriver.Remote(command_executor="https://ondemand.us-west-1.saucelabs.com:443/wd/hub",
                                   desired_capabilities=caps)
