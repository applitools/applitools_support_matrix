import os
import time

import pytest
from appium import webdriver as appium_webdriver
from applitools.selenium import Eyes
import urllib3
from urllib3.exceptions import MaxRetryError
from appium.webdriver.appium_connection import AppiumConnection


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
def ios(sauce_options, orientation):
    caps = {
        "browserName": '',
        "platformName": 'iOS',
        "appium:platformVersion": '16.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=awesomeswift_classic.app.zip',
        "appium:deviceName": 'iPhone 8 Simulator',
        "appium:automationName": 'XCUITest',
        "appium:orientation": orientation,
        'sauce:options': sauce_options
    }
    return start_appium_driver(caps)


@pytest.fixture(scope="function")
def ios_nmg(sauce_options, orientation):
    api_key = os.environ["APPLITOOLS_API_KEY"]
    args = '{"args": [], "env": {"DYLD_INSERT_LIBRARIES": "@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib","NML_API_KEY":"' + api_key + '"}}'
    caps = {
        "browserName": '',
        "platformName": 'iOS',
        "appium:platformVersion": '16.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=awesomeswift_nmg.app.zip',
        "appium:deviceName": 'iPhone 8 Simulator',
        "appium:automationName": 'XCUITest',
        "appium:processArguments": args,
        "appium:orientation": orientation,
        'sauce:options': sauce_options
    }
    return start_appium_driver(caps)


@pytest.fixture(scope="function")
def android_nmg(sauce_options, orientation):
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=SimpleRandomStock_nmg.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        "appium:orientation": orientation,
        'sauce:options': sauce_options
    }
    Eyes.set_nmg_capabilities(caps)
    return start_appium_driver(caps)


@pytest.fixture(scope="function")
def android(sauce_options, orientation):
    caps = {
        "browserName": '',
        "platformName": 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:app": 'storage:filename=SimpleRandomStock_classic.apk',
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": True,
        "appium:orientation": orientation,
        'sauce:options': sauce_options
    }
    return start_appium_driver(caps)



def start_appium_driver(caps):
    init_args_for_pool_manager = {
        'retries': urllib3.util.retry.Retry(total=10, connect=6, redirect=6, read=False)
    }
    appium_executor = AppiumConnection(
        remote_server_addr="https://ondemand.us-west-1.saucelabs.com:443/wd/hub",
        init_args_for_pool_manager=init_args_for_pool_manager
    )

    try:
        return appium_webdriver.Remote(appium_executor, desired_capabilities=caps)
    except MaxRetryError:
        print("Tried to initiate driver")
    time.sleep(60)
    return appium_webdriver.Remote(appium_executor, desired_capabilities=caps)
