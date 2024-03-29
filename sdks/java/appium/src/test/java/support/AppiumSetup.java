package support;

import com.applitools.eyes.EyesRunner;
import com.applitools.eyes.StdoutLogHandler;
import com.applitools.eyes.appium.AppiumRunner;
import com.applitools.eyes.appium.AppiumVisualGridRunner;
import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.visualgrid.model.*;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
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
            buildIOS();
        }
        if (platform == MobilePlatform.Android) {
            buildAndroid();
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
        eyes.setForceFullPageScreenshot(false);
        String showLogs = System.getenv("APPLITOOLS_SHOW_LOGS");
        String verbose = System.getenv("APPLITOOLS_SHOW_LOGS_VERBOSE");
        if (showLogs != null && showLogs.equals("true")) {
            eyes.setLogHandler(new StdoutLogHandler((verbose != null && verbose.equals("true"))));
        }
        ScreenOrientation renderOrientation = ScreenOrientation.LANDSCAPE.toString().equals(orientation) ?
                ScreenOrientation.LANDSCAPE : ScreenOrientation.PORTRAIT;
        if (UFG) {
            if (platform == MobilePlatform.iOS) {
                eyes.configure().addMobileDevice(new IosDeviceInfo(IosDeviceName.iPhone_8, renderOrientation));
            } else if (platform == MobilePlatform.Android) {
                eyes.configure().addMobileDevice(new AndroidDeviceInfo(AndroidDeviceName.Pixel_5, renderOrientation));
            }
        }
    }

    public void buildIOS() throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("browserName", "");
        caps.setCapability("platformName", "iOS");
        caps.setCapability("appium:platformVersion", "16.0");
        caps.setCapability("appium:newCommandTimeout", 600);
        caps.setCapability("appium:deviceName", "iPhone 8 Simulator");
        caps.setCapability("appium:automationName", "XCUITest");
        if (orientation != null) {
            caps.setCapability("appium:orientation", orientation);
        }
        MutableCapabilities options = new MutableCapabilities();
        if (appiumVersion != null) {
            options.setCapability("appiumVersion", appiumVersion);
        }
        options.setCapability("username", System.getenv("SAUCE_USERNAME"));
        options.setCapability("accessKey", System.getenv("SAUCE_ACCESS_KEY"));
        options.setCapability("name", "Support Matrix Java iOS");
        caps.setCapability("sauce:options", options);
        if (UFG) {
            caps.setCapability("appium:processArguments", "{\"args\": [], \"env\": {\"DYLD_INSERT_LIBRARIES\": \"@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib\",\"NML_API_KEY\":\"" + GlobalSetup.apiKey + "\"}}");
            caps.setCapability("appium:app", "storage:filename=awesomeswift_nmg.app.zip");
        } else {
            caps.setCapability("appium:app", "storage:filename=awesomeswift_classic.app.zip");
        }
        driver = new IOSDriver(new URL(SAUCE_URL), caps);
    }

    public void buildAndroid() throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("browserName", "");
        caps.setCapability("appium:deviceName", "Google Pixel 5 GoogleAPI Emulator");
        caps.setCapability("appium:platformVersion", "11.0");
        caps.setCapability("appium:automationName", "UiAutomator2");
        caps.setCapability("appium:autoGrantPermissions", true);
        caps.setCapability("appium:newCommandTimeout", 600);
        if (orientation != null) {
            caps.setCapability("appium:orientation", orientation);
        }
        MutableCapabilities options = new MutableCapabilities();
        if (appiumVersion != null) {
            options.setCapability("appiumVersion", appiumVersion);
        }
        options.setCapability("username", System.getenv("SAUCE_USERNAME"));
        options.setCapability("accessKey", System.getenv("SAUCE_ACCESS_KEY"));
        options.setCapability("name", "Support Matrix Java Android");
        caps.setCapability("sauce:options", options);
        if (UFG) {
            Eyes.setNMGCapabilities(caps);
            caps.setCapability("appium:app", "storage:filename=SimpleRandomStock_nmg.apk");
        } else {
            caps.setCapability("appium:app", "storage:filename=SimpleRandomStock_classic.apk");
        }
        driver = new AndroidDriver(new URL(SAUCE_URL), caps);
    }

}
