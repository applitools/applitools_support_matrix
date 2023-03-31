package support.tests;

import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.playwright.fluent.Target;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import support.BaseSetup;

public class UFG extends BaseSetup {

    @BeforeClass
    public void classSetup() {
        UFG = true;
    }

    @Test
    public void window(){
        driver.navigate("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Window - UFG", new RectangleSize(700, 460));
        eyes.check(Target.window());
        eyes.close(true);
    }

    @Test
    public void region() {
        driver.navigate("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Region - UFG", new RectangleSize(700, 460));
        eyes.check(Target.region(new Region(50, 70, 90, 110)));
        eyes.close(true);
    }
}
