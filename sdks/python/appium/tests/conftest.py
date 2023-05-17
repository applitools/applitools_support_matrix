import os
from .drivers import *
from applitools.selenium import BatchInfo, Eyes, StitchMode
from applitools.common import ScreenOrientation
from selenium.common.exceptions import WebDriverException


@pytest.fixture(scope="session")
def batch_info():
    return BatchInfo("Python Support Matrix tests")

@pytest.fixture(scope="session")
def orientation():
    orientation = os.getenv("MATRIX_DEVICE_ORIENTATION", "PORTRAIT")
    return orientation

@pytest.fixture(scope="session")
def eyes_orientation(orientation):
    eyes_orientation = ScreenOrientation.LANDSCAPE if orientation == "LANDSCAPE" else ScreenOrientation.PORTRAIT
    return eyes_orientation

@pytest.fixture(scope="function")
def stitch_mode():
    return StitchMode.Scroll


@pytest.fixture(scope="function")
def eyes_runner_class():
    return None


@pytest.fixture(name="runner", scope="function")
def runner_setup(eyes_runner_class):
    runner = eyes_runner_class
    yield runner


@pytest.fixture(name="eyes", scope="function")
def eyes_setup(runner, batch_info, stitch_mode):
    eyes = Eyes(runner)
    # Initialize the eyes SDK and set your private API key.
    eyes.api_key = os.environ["APPLITOOLS_API_KEY"]
    eyes.configure.batch = batch_info
    eyes.configure.branch_name = "master"
    eyes.configure.parent_branch_name = "master"
    eyes.configure.set_stitch_mode(stitch_mode)
    eyes.configure.set_save_new_tests(False)
    eyes.configure.set_hide_caret(True)
    eyes.configure.set_hide_scrollbars(True)
    yield eyes
    # If the test was aborted before eyes.close was called, ends the test as aborted.
    eyes.abort()
    if runner is not None:
        runner.get_all_test_results(False)


@pytest.fixture(scope="function")
def driver_builder(chrome):
    return chrome


@pytest.fixture(name="driver", scope="function")
def driver_setup(driver_builder):
    driver = driver_builder
    yield driver
    # Close the browser.
    try:
        if driver is not None:
            driver.quit()
    except WebDriverException:
        print("Driver was already closed")
