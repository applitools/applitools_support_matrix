package support;

import com.applitools.eyes.BatchInfo;
import com.applitools.eyes.fluent.BatchClose;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import java.util.Collections;

public class GlobalSetup {

    protected static BatchInfo batch;
    protected static String apiKey;
    protected static String serverUrl;

    protected final static String SELENIUM_URL = "http://localhost:4444/wd/hub";
    protected final static String SAUCE_URL = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub";
    public static boolean CI;


    @BeforeSuite
    public void globalSetup() {
        String name = System.getenv("APPLITOOLS_BATCH_NAME");
        if (name == null) name = "JAVA support matrix";
        batch = new BatchInfo(name);
        String id = System.getenv("APPLITOOLS_BATCH_ID");
        if (id != null) batch.setId(id);
        apiKey = System.getenv("APPLITOOLS_API_KEY");
        serverUrl = System.getenv("APPLITOOLS_SERVER_URL");
        String CI = System.getenv("CI");
        GlobalSetup.CI = CI != null && CI.equals("true");
    }


   @AfterSuite
   public void closeBatch() {
       new BatchClose().setBatchId(Collections.singletonList(batch.getId())).close();
   }
}
