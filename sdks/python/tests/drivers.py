import os
import time

import pytest
from selenium import webdriver
from appium import webdriver as appium_webdriver
from urllib3.exceptions import MaxRetryError


@pytest.fixture(scope="function")
def chrome():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)


@pytest.fixture(scope="function")
def ios():
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
        'sauce:options': {
            "username": os.environ["SAUCE_USERNAME"],
            "accessKey": os.environ["SAUCE_ACCESS_KEY"],
            "name": 'Support Matrix'
        }

    }
    return start_appium_driver(caps)

@pytest.fixture(scope="function")
def android_nmg():
    api_key = os.environ["APPLITOOLS_API_KEY"]
    args = "--es APPLITOOLS \"{\"NML_API_KEY\":\"" + api_key +\
           "\", \"NML_SERVER_URL\":\"https://eyesapi.applitools.com\"}\""
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=android_nmg.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        "appium:optionalIntentArguments": args,
        'sauce:options': {
            "username": os.environ["SAUCE_USERNAME"],
            "accessKey": os.environ["SAUCE_ACCESS_KEY"],
            "name": 'Support Matrix Python'
        }
    }
    return start_appium_driver(caps)


@pytest.fixture(scope="function")
def android():
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=android_nmg.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        'sauce:options': {
            "username": os.environ["SAUCE_USERNAME"],
            "accessKey": os.environ["SAUCE_ACCESS_KEY"],
            "name": 'Support Matrix Python'
        }
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
