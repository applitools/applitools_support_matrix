import pytest
from applitools.common import StitchMode
from applitools.playwright import Region, Target, ClassicRunner
from playwright.sync_api import Page


@pytest.fixture(scope="function")
def eyes_runner_class():
    return ClassicRunner()


@pytest.fixture(scope="function")
def stitch_mode():
    return StitchMode.CSS


def window(page: Page, eyes):
    page.goto("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "Playwright Window - Classic"
    conf.app_name = "Applitools Support Matrix"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(page)
    eyes.check(Target.window())
    eyes.close(raise_ex=True)


def region(page: Page, eyes):
    page.goto("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "Playwright Region - Classic"
    conf.app_name = "Applitools Support Matrix"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(page)
    eyes.check(Target.window().region(Region(50, 70, 90, 110)))
    eyes.close(raise_ex=True)


def frame(page: Page, eyes):
    page.goto("https://applitools.github.io/demo/TestPages/FramesTestPage/")
    conf = eyes.get_configuration()
    conf.test_name = "Playwright Frame - Classic"
    conf.app_name = "Applitools Support Matrix"
    conf.viewport_size = {"width": 700, "height": 460}
    eyes.set_configuration(conf)
    eyes.open(page)
    eyes.check(Target.window().frame("frame1"))
    eyes.close(raise_ex=True)
