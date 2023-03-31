import pytest
from selenium import webdriver



@pytest.fixture(scope="function")
def chrome():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    return webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)
