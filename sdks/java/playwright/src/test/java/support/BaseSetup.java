package support;

import com.applitools.eyes.EyesRunner;
import com.applitools.eyes.StdoutLogHandler;
import com.applitools.eyes.playwright.ClassicRunner;
import com.applitools.eyes.playwright.Eyes;
import com.applitools.eyes.playwright.visualgrid.VisualGridRunner;
import com.applitools.eyes.selenium.StitchMode;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.MalformedURLException;
import java.nio.file.Paths;

public class BaseSetup extends GlobalSetup {
    protected Page driver;
    protected Playwright playwright;
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
        try{
            runner.getAllTestResults(false);
        } catch (Exception exception) {
            System.out.println("Failed to get results");
            System.out.println(exception.getMessage());
            exception.printStackTrace();
        }
        try {
            if (driver != null) driver.close();
        } catch (Exception exception) {
            System.out.println("Failed to close browser");
            System.out.println(exception.getMessage());
            exception.printStackTrace();
        }
        try {
            if (playwright != null) playwright.close();
        } catch (Exception exception) {
            System.out.println("Failed to close playwright");
            System.out.println(exception.getMessage());
            exception.printStackTrace();
        }

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

    public void buildDriver()  {
        BrowserType.LaunchOptions options = new BrowserType.LaunchOptions().setHeadless(true);
        String env = System.getenv("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH");
        if(env != null && !env.isEmpty()) {
            options.setExecutablePath(Paths.get(env));
        }
        playwright = Playwright.create();
        driver = playwright
                .chromium()
                .launch(options)
                .newContext()
                .newPage();
    }
}
