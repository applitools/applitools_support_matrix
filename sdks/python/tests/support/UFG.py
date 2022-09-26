import pytest
from applitools.selenium import (Region, Target, VisualGridRunner)


@pytest.fixture(scope="function")
def eyes_runner_class():
    return VisualGridRunner(10)


def window(driver, eyes):
    driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "Window - UFG"
    conf.app_name = "Applitools Support Matrix"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)


def region(driver, eyes):
    driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "Region - UFG"
    conf.app_name = "Applitools Support Matrix"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window().region(Region(50, 70, 90, 110)))
    eyes.close(raise_ex=True)