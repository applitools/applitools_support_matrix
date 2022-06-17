import pytest
from applitools.selenium import (Region, Target, ClassicRunner)
from applitools.common import StitchMode


@pytest.fixture(scope="function")
def eyes_runner_class():
    return ClassicRunner()


@pytest.fixture(scope="function")
def stitch_mode():
    return StitchMode.CSS


def window(driver, eyes):
    driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "CheckWindowDefaultFully"
    conf.app_name = "Eyes Selenium SDK - Classic API"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)


def region(driver, eyes):
    driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "TestCheckRegionByCoordinates_Fluent"
    conf.app_name = "Eyes Selenium SDK - Fluent API"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window().region(Region(50, 70, 90, 110)))
    eyes.close(raise_ex=True)


def frame(driver, eyes):
    driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.branch_name = "universal-sdk"
    conf.test_name = "TestCheckFrame_Fluent"
    conf.app_name = "Eyes Selenium SDK - Fluent API"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window().frame("frame1"))
    eyes.close(raise_ex=True)
