import pytest
from applitools.common import IosDeviceInfo, IosDeviceName, ScreenOrientation
from applitools.selenium import (Target, VisualGridRunner)


@pytest.fixture(scope="function")
def eyes_runner_class():
    return VisualGridRunner(10)

@pytest.fixture(scope="function")
def driver_builder(ios):
    return ios


def window(driver, eyes):
    conf = eyes.get_configuration()
    conf.test_name = "Appium iOS window - UFG (Python)"
    conf.app_name = "Applitools Support Matrix"
    eyes.set_configuration(conf)
    eyes.configure.add_mobile_device(IosDeviceInfo(IosDeviceName.iPhone_8, ScreenOrientation.PORTRAIT))
    eyes.open(driver)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)
