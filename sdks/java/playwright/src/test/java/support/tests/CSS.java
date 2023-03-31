package support.tests;

import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.playwright.fluent.Target;
import com.applitools.eyes.selenium.StitchMode;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import support.BaseSetup;

public class CSS extends BaseSetup {

    @BeforeClass
    public void classSetup() {
        UFG = false;
        stitchMode = StitchMode.CSS;
    }

    @Test
    public void window() {
        driver.navigate("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Playwright Window - Classic", new RectangleSize(700, 460));
        eyes.check(Target.window());
        eyes.close(true);
    }

    @Test
    public void region() {
        driver.navigate("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Playwright Region - Classic", new RectangleSize(700, 460));
        eyes.check(Target.region(new Region(50, 70, 90, 110)));
        eyes.close(true);
    }

    @Test
    public void frame() {
        driver.navigate("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Playwright Frame - Classic", new RectangleSize(700, 460));
        eyes.check(Target.frame(driver.locator("[name=\"frame1\"]")));
        eyes.close(true);
    }
}
