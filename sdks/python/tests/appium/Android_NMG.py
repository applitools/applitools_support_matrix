import pytest
from applitools.common import AndroidDeviceInfo, AndroidDeviceName, ScreenOrientation
from applitools.selenium import (Target, VisualGridRunner)


@pytest.fixture(scope="function")
def eyes_runner_class():
    return VisualGridRunner(10)

@pytest.fixture(scope="function")
def driver_builder(android_nmg):
    return android_nmg


def window(driver, eyes):
    conf = eyes.get_configuration()
    conf.test_name = "Appium Android window - UFG (Python)"
    conf.app_name = "Applitools Support Matrix"
    eyes.set_configuration(conf)
    eyes.configure.add_mobile_device(AndroidDeviceInfo(AndroidDeviceName.Pixel_5, ScreenOrientation.PORTRAIT))
    eyes.open(driver)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)
