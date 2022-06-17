import pytest
import os
from selenium import webdriver


@pytest.fixture(scope="function")
def chrome():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    ci = os.environ.get("CI")
    if ci is None:
        return webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)
    else:
        return webdriver.Chrome(options=options)
