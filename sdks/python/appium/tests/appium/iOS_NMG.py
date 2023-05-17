import pytest
from applitools.common import IosDeviceInfo, IosDeviceName
from applitools.selenium import (Target, VisualGridRunner)


@pytest.fixture(scope="function")
def eyes_runner_class():
    return VisualGridRunner(10)

@pytest.fixture(scope="function")
def driver_builder(ios_nmg):
    return ios_nmg


def window(driver, eyes, eyes_orientation):
    conf = eyes.get_configuration()
    conf.test_name = "Appium iOS window - UFG (Python)"
    conf.app_name = "Applitools Support Matrix"
    eyes.set_configuration(conf)
    eyes.configure.add_mobile_device(IosDeviceInfo(IosDeviceName.iPhone_8, eyes_orientation))
    eyes.open(driver)
    eyes.check(Target.window().fully(False))
    eyes.close(raise_ex=True)
