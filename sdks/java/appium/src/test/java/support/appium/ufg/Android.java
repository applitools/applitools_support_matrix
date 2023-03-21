package support.appium.ufg;

import com.applitools.eyes.appium.Target;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import support.AppiumSetup;
import support.MobilePlatform;

public class Android extends AppiumSetup {
    @BeforeClass
    public void classSetup() {
        platform = MobilePlatform.Android;
        UFG = true;
    }

    @Test
    public void window() {
        eyes.open(driver, "Applitools Support Matrix", "Appium Android window - UFG (Java)");
        eyes.check(Target.window());
        eyes.close(true);
    }
}
