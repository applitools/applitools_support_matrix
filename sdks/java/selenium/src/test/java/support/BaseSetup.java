package support;

import com.applitools.eyes.EyesRunner;
import com.applitools.eyes.StdoutLogHandler;
import com.applitools.eyes.selenium.ClassicRunner;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.StitchMode;
import com.applitools.eyes.visualgrid.services.VisualGridRunner;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.MalformedURLException;
import java.net.URL;

public class BaseSetup extends GlobalSetup {
    protected WebDriver driver;
    protected Eyes eyes;
    protected EyesRunner runner;

    protected boolean UFG;
    protected StitchMode stitchMode;


    @BeforeMethod(alwaysRun = true)
    public void beforeTest() throws MalformedURLException {
        initEyes();
        buildDriver();
    }

    @AfterMethod(alwaysRun = true)
    public void after() {
        runner.getAllTestResults(false);
        if (driver != null) driver.quit();
        eyes.abort();
    }

    public void initEyes() {
        runner = UFG ? new VisualGridRunner(10) : new ClassicRunner();
        eyes = new Eyes(runner);
        eyes.setMatchTimeout(0);
        eyes.setApiKey(apiKey);
        eyes.setBranchName("master");
        eyes.setParentBranchName("master");
        eyes.setBatch(batch);
        eyes.setSaveNewTests(false);
        eyes.setHideScrollbars(true);
        eyes.setHideCaret(true);
        if (stitchMode != null) {
            eyes.setStitchMode(stitchMode);
        }
        String showLogs = System.getenv("APPLITOOLS_SHOW_LOGS");
        String verbose = System.getenv("APPLITOOLS_SHOW_LOGS_VERBOSE");
        if (showLogs != null && showLogs.equals("true")) {
            eyes.setLogHandler(new StdoutLogHandler((verbose != null && verbose.equals("true"))));
        }
    }

    public void buildDriver() throws MalformedURLException {
        ChromeOptions options = new ChromeOptions().setHeadless(true);
        options.addArguments("--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage");
        driver = new RemoteWebDriver(new URL(GlobalSetup.SELENIUM_URL), options);
    }
}
