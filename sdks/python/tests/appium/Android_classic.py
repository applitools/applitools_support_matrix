import pytest
from applitools.selenium import (Target, ClassicRunner)


@pytest.fixture(scope="function")
def eyes_runner_class():
    return ClassicRunner()

@pytest.fixture(scope="function")
def driver_builder(android):
    return android


def window(driver, eyes):
    conf = eyes.get_configuration()
    conf.test_name = "Appium Android window - Classic (Python)"
    conf.app_name = "Applitools Support Matrix"
    eyes.set_configuration(conf)
    eyes.open(driver)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)
