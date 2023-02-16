package support.tests;

import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.selenium.StitchMode;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import support.BaseSetup;

public class UFG extends BaseSetup {

    @BeforeClass
    public void classSetup() {
        UFG = true;
    }

    @Test
    public void window(){
        driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Window - UFG", new RectangleSize(700, 460));
        eyes.check(Target.window());
        eyes.close(true);
    }

    @Test
    public void region() {
        driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.open(driver, "Applitools Support Matrix", "Region - UFG", new RectangleSize(700, 460));
        eyes.check(Target.region(new Region(50, 70, 90, 110)));
        eyes.close(true);
    }
}
