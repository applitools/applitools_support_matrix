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

namespace Applitools.Support.Matrix.Appium
{
        public abstract class AppiumTest 
    {       
        protected RemoteWebDriver driver;
        protected EyesRunner runner;
        protected Applitools.Appium.Eyes eyes;
        
        public static readonly BatchInfo batch = new BatchInfo("Support Matrix");

        public static readonly string apiKey = Environment.GetEnvironmentVariable("APPLITOOLS_API_KEY");
        public static readonly string SAUCE_URL = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub";

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
            runner = isUFG() ? (EyesRunner)(new VisualGridRunner(10, logger)) : new ClassicRunner(logger);
            eyes = new Applitools.Appium.Eyes(runner, logHandler:logger);
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
            switch (device)
            {
                case DeviceTypes.iPhone:
                    AppiumOptions options = new AppiumOptions();
                    var username = Environment.GetEnvironmentVariable("SAUCE_USERNAME");
                    var accessKey = Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY");
                    Console.WriteLine(username);
                    options.AddAdditionalCapability("browserName", "");
                    options.AddAdditionalCapability("platformName", "iOS");
                    options.AddAdditionalCapability("appium:platformVersion", "15.4");
                    options.AddAdditionalCapability("appium:newCommandTimeout", 600);
                    options.AddAdditionalCapability("appium:app", "storage:385b000f-a6fa-4d47-87e1-07a7b2ddddb7");
                    options.AddAdditionalCapability("appium:deviceName", "iPhone 8 Simulator");
                    options.AddAdditionalCapability("appium:automationName", "XCUITest");
                    options.AddAdditionalCapability("username", username);
                    options.AddAdditionalCapability("accessKey", accessKey);
                    var sauceOptions = new Dictionary<string, object>();
                    sauceOptions.Add("name", "Support Matrix");
                    sauceOptions.Add("username", username);
                    sauceOptions.Add("accessKey", accessKey);
                    options.AddAdditionalCapability("sauce:options", sauceOptions);
                    if (isUFG())
                    {
                        options.AddAdditionalCapability("appium:processArguments", "{\"args\": [], \"env\": {\"DYLD_INSERT_LIBRARIES\": \"@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib\",\"NML_API_KEY\":\"" + apiKey + "\"}}");
                    }
                    driver = new IOSDriver<AppiumWebElement>(
                    new Uri(SAUCE_URL), options, TimeSpan.FromMinutes(5));
                    break;
                case DeviceTypes.Android:
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

            driverSetup();
            initEyes();
        }
      
        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver.Dispose();
            eyes?.AbortIfNotClosed();
            runner?.GetAllTestResults(false);
        }

    }


}