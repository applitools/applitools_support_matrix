// Generated by DotNet template
using NUnit.Framework;
using System;
using Applitools.VisualGrid;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.iOS;
using OpenQA.Selenium.Appium.Enums;
using OpenQA.Selenium.Remote;
using System.Collections.Generic;
using System.Diagnostics;
using Applitools.Appium;

namespace Applitools.Support.Matrix.Appium
{
        public abstract class AppiumTest 
    {       
        protected RemoteWebDriver driver;
        protected AppiumEyesRunner runner;
        protected Applitools.Appium.Eyes eyes;
        
        public static readonly BatchInfo batch = new BatchInfo("Support Matrix");

        public static readonly string apiKey = Environment.GetEnvironmentVariable("APPLITOOLS_API_KEY");
        public static readonly string SAUCE_URL = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub";
        public static readonly string EYES_SERVER_URL = "https://eyes.applitools.com";
        public static string orientation;
        public static VisualGrid.ScreenOrientation eyesOrientation;

        public static readonly StdoutLogHandler logger = new StdoutLogHandler();

        public virtual StitchModes getStitchMode() 
        {
            return StitchModes.CSS;
        }

        public virtual BatchInfo getBatch() 
        {
            return batch;
        }

        public virtual bool isUFG() 
        {
            return false;
        }

        public virtual DeviceTypes GetDevice()
        {
            return DeviceTypes.iPhone;
        }

        protected void initEyes()
        {
            runner = new ClassicRunner(logger);
            eyes = new Applitools.Appium.Eyes(runner, serverUri: EYES_SERVER_URL, logHandler:logger);
            eyes.Batch = getBatch();
            eyes.StitchMode = getStitchMode();
            eyes.BranchName = "master";
            eyes.ParentBranchName = "master";
            eyes.SaveNewTests = false;
            eyes.HideScrollbars = true;
            eyes.HideCaret = true;
        }

        public void driverSetup() 
        {
            var device = GetDevice();
            var username = Environment.GetEnvironmentVariable("SAUCE_USERNAME");
            var accessKey = Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY");
            var sauceOptions = new Dictionary<string, object>();
            sauceOptions.Add("name", "Support Matrix Dotnet");
            sauceOptions.Add("username", username);
            sauceOptions.Add("accessKey", accessKey);
            string appiumVersion = Environment.GetEnvironmentVariable("APPIUM_VERSION");
            if (appiumVersion != null)
            {
                sauceOptions.Add("appiumVersion", appiumVersion);
            }
            AppiumOptions options = new AppiumOptions();
            options.AddAdditionalCapability("appium:orientation", orientation);
            switch (device)
            {
                case DeviceTypes.iPhone:
                    options.AddAdditionalCapability("browserName", "");
                    options.AddAdditionalCapability("platformName", "iOS");
                    options.AddAdditionalCapability("appium:platformVersion", "15.4");
                    options.AddAdditionalCapability("appium:newCommandTimeout", 600);

                    options.AddAdditionalCapability("appium:deviceName", "iPhone 8 Simulator");
                    options.AddAdditionalCapability("appium:automationName", "XCUITest");
//                    options.AddAdditionalCapability("username", username);
//                    options.AddAdditionalCapability("accessKey", accessKey);
                    options.AddAdditionalCapability("sauce:options", sauceOptions);
                    if (isUFG()) {
                        options.AddAdditionalCapability("appium:processArguments", "{\"args\": [], \"env\": {\"DYLD_INSERT_LIBRARIES\": \"@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib\",\"NML_API_KEY\":\"" + apiKey + "\"}}");
                        options.AddAdditionalCapability("appium:app", "storage:filename=awesomeswift_nmg.app.zip");
                    }
                    else {
                        options.AddAdditionalCapability("appium:app", "storage:filename=awesomeswift_classic.app.zip");
                    }
                    driver = new IOSDriver<AppiumWebElement>(
                    new Uri(SAUCE_URL), options, TimeSpan.FromMinutes(5));
                    break;
                case DeviceTypes.Android:
                    options.AddAdditionalCapability("platformName", "Android");
                    options.AddAdditionalCapability("browserName", "");
                    options.AddAdditionalCapability("appium:deviceName", "Google Pixel 5 GoogleAPI Emulator");
                    options.AddAdditionalCapability("appium:platformVersion", "11.0");
                    options.AddAdditionalCapability("appium:automationName", "UiAutomator2");
                    options.AddAdditionalCapability("appium:autoGrantPermissions", true);
                    options.AddAdditionalCapability("appium:newCommandTimeout", 600);
                    
//                    options.AddAdditionalCapability("username", username);
//                    options.AddAdditionalCapability("accessKey", accessKey);
                    options.AddAdditionalCapability("sauce:options", sauceOptions);
                    if (isUFG()) {
                        options.AddAdditionalCapability("appium:app", "storage:filename=SimpleRandomStock_nmg.apk");
                        options.AddAdditionalCapability("appium:optionalIntentArguments", "--es APPLITOOLS '{\"NML_API_KEY\":\"" + apiKey + "\", \"NML_SERVER_URL\":\"https://eyesapi.applitools.com\"}'");
                    }
                    else {
                        options.AddAdditionalCapability("appium:app", "storage:filename=SimpleRandomStock_classic.apk");
                    }
                    driver = new AndroidDriver<AppiumWebElement>(
                        new Uri(SAUCE_URL), options, TimeSpan.FromMinutes(5));
                    break;
                default:
                    throw new Exception("Unknown browser type");
            }

        }

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
       
        }
      
        [OneTimeTearDown]
        public void OneTearDown()
        {
      
        }

        [SetUp]
        public void TimeSetup()
        {   
            orientation = Environment.GetEnvironmentVariable("MATRIX_DEVICE_ORIENTATION");
            if(string.IsNullOrEmpty(orientation))
            {
                orientation = "PORTRAIT";
            }
            eyesOrientation = "LANDSCAPE".Equals(orientation, StringComparison.OrdinalIgnoreCase) ? VisualGrid.ScreenOrientation.Landscape : VisualGrid.ScreenOrientation.Portrait;
            driverSetup();
            initEyes();
        }
      
        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver.Dispose();
            eyes?.AbortIfNotClosed();
            var results = runner?.GetAllTestResults(false);
            Console.WriteLine(results);
        }

    }


}