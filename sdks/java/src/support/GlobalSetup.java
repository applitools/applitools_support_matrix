package support;

import com.applitools.connectivity.RestClient;
import com.applitools.connectivity.ServerConnector;
import com.applitools.eyes.BatchInfo;
import com.applitools.eyes.Logger;
import com.applitools.eyes.ProxySettings;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;

public class GlobalSetup {

    protected static BatchInfo batch;
    protected static String apiKey;
    protected static String serverUrl;

    protected final static String CHROME_DOCKER = "http://localhost:4444/wd/hub";
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

//    @AfterSuite
    public void closeBatch() {
        try {
            String server = "eyesapi.applitools.com";
            String url = "https://" + server + "/api/sessions/batches/" + batch.getId() + "/close/bypointerid/?apiKey=" + apiKey;
            URI requestUrl = UriBuilder.fromUri(url).build();
            RestClient client = new RestClient(new Logger(), requestUrl, ServerConnector.DEFAULT_CLIENT_TIMEOUT);
            if (System.getenv("APPLITOOLS_USE_PROXY") != null) {
                client.setProxy(new ProxySettings("http://127.0.0.1", 8888));
            }
            int statusCode = client.sendHttpRequest(requestUrl.toString(), HttpMethod.DELETE).getStatusCode();
            System.out.println(statusCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
