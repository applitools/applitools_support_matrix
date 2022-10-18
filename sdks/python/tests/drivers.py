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
        "appium:app": 'storage:385b000f-a6fa-4d47-87e1-07a7b2ddddb7',
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


def start_appium_driver(caps):
    try:
        return appium_webdriver.Remote(command_executor="https://ondemand.us-west-1.saucelabs.com:443/wd/hub",
                                       desired_capabilities=caps)
    except MaxRetryError:
        print("Tried to initiate driver")
    time.sleep(60)
    return appium_webdriver.Remote(command_executor="https://ondemand.us-west-1.saucelabs.com:443/wd/hub",
                                   desired_capabilities=caps)
