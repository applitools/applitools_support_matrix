package support.tests;

import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.selenium.StitchMode;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
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
        driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Window - Classic", new RectangleSize(700, 460));
        eyes.check(Target.window());
        eyes.close(true);
    }

    @Test
    public void region() {
        driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Region - Classic", new RectangleSize(700, 460));
        eyes.check(Target.region(new Region(50, 70, 90, 110)));
        eyes.close(true);
    }

    @Test
    public void frame() {
        driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Frame - Classic", new RectangleSize(700, 460));
        eyes.check(Target.frame(By.cssSelector("[name=\"frame1\"]")));
        eyes.close(true);
    }
}
