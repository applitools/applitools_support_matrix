package support.appium.ufg;

import com.applitools.eyes.appium.Target;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import support.AppiumSetup;
import support.MobilePlatform;

public class IOS extends AppiumSetup {
    @BeforeClass
    public void classSetup() {
        platform = MobilePlatform.iOS;
        UFG = true;
    }

    @Test
    public void window() {
        eyes.open(driver, "Applitools Support Matrix", "Appium iOS window - UFG (Java)");
        eyes.check(Target.window());
        eyes.close(true);
    }
}
