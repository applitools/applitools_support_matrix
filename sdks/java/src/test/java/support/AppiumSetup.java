package support;

import com.applitools.eyes.EyesRunner;
import com.applitools.eyes.StdoutLogHandler;
import com.applitools.eyes.appium.AppiumRunner;
import com.applitools.eyes.appium.AppiumVisualGridRunner;
import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.visualgrid.model.IosDeviceInfo;
import com.applitools.eyes.visualgrid.model.IosDeviceName;
import com.applitools.eyes.visualgrid.model.ScreenOrientation;
import com.applitools.eyes.visualgrid.services.VisualGridRunner;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.MalformedURLException;
import java.net.URL;

public class AppiumSetup extends GlobalSetup {
    protected WebDriver driver;
    protected Eyes eyes;
    protected EyesRunner runner;

    protected boolean UFG;
    protected MobilePlatform platform;


    @BeforeMethod(alwaysRun = true)
    public void beforeTest() throws MalformedURLException {
        initEyes();
        if (platform == MobilePlatform.iOS) {
            buildIOS(UFG);
        }
        if (platform == MobilePlatform.Android) {
            throw new UnsupportedOperationException("Android isn't supported yet");
        }
    }

    @AfterMethod(alwaysRun = true)
    public void after() {
        runner.getAllTestResults(false);
        if (driver != null) driver.quit();
        eyes.abort();
    }

    public void initEyes() {
        runner = UFG ? new AppiumVisualGridRunner(10) : new AppiumRunner();
        eyes = new Eyes(runner);
        eyes.setMatchTimeout(0);
        eyes.setApiKey(apiKey);
        eyes.setBranchName("master");
        eyes.setParentBranchName("master");
        eyes.setBatch(batch);
        eyes.setSaveNewTests(false);
        String showLogs = System.getenv("APPLITOOLS_SHOW_LOGS");
        String verbose = System.getenv("APPLITOOLS_SHOW_LOGS_VERBOSE");
        if (showLogs != null && showLogs.equals("true")) {
            eyes.setLogHandler(new StdoutLogHandler((verbose != null && verbose.equals("true"))));
        }
        if(UFG){
            eyes.configure().addMobileDevice(new IosDeviceInfo(IosDeviceName.iPhone_8, ScreenOrientation.PORTRAIT));
        }
    }

    public void buildIOS(boolean UFG) throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("browserName", "");
        caps.setCapability("platformName", "iOS");
        caps.setCapability("appium:platformVersion", "16.0");
        caps.setCapability("appium:newCommandTimeout", 600);
        caps.setCapability("appium:app", "storage:385b000f-a6fa-4d47-87e1-07a7b2ddddb7");
        caps.setCapability("appium:deviceName", "iPhone 8 Simulator");
        caps.setCapability("appium:automationName", "XCUITest");
        MutableCapabilities options = new MutableCapabilities();
        options.setCapability("username", System.getenv("SAUCE_USERNAME"));
        options.setCapability("accessKey", System.getenv("SAUCE_ACCESS_KEY"));
        options.setCapability("name", "Support Matrix");
        caps.setCapability("sauce:options", options);
        if(UFG) {
            caps.setCapability("appium:processArguments","{\"args\": [], \"env\": {\"DYLD_INSERT_LIBRARIES\": \"@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib\",\"NML_API_KEY\":\""+GlobalSetup.apiKey+"\"}}");
        }
        driver = new IOSDriver(new URL(SAUCE_URL), caps);
    }

}
