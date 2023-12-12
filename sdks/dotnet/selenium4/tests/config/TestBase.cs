// Generated by DotNet template
using NUnit.Framework;
using System;
using Applitools.Selenium;
using Applitools.VisualGrid;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Safari;
using System.Threading;
namespace Applitools.Support.Matrix.Tests
{
        public abstract class BaseTest 
    {       
        protected IWebDriver driver;
        protected SeleniumEyesRunner runner;
        protected Eyes eyes;
        
        public static readonly BatchInfo batch = new BatchInfo("Support Matrix");
        public static readonly bool CI = Environment.GetEnvironmentVariable("CI") == "true";
        public static readonly string LOCAL_SELENIUM_URL = Environment.GetEnvironmentVariable("SELENIUM_SERVER_URL") ?? "http://localhost:4444";
        public static readonly string LOCAL_FIREFOX_URL = "http://localhost:4445/wd/hub";

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

        public virtual browserType GetBrowser()
        {
            return browserType.Chrome;
        }

        protected void initEyes()
        {
            runner = isUFG() ? (SeleniumEyesRunner)(new VisualGridRunner(10, logger)) : new ClassicRunner(logger);
            eyes = new Applitools.Selenium.Eyes(runner, logHandler:logger);
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
            var browser = GetBrowser();
            switch (browser)
            {
                case browserType.Chrome:
                    var chromeOptions = new ChromeOptions();
                    chromeOptions.AddArgument("headless");
                    chromeOptions.AddArgument("--no-sandbox");
                    chromeOptions.AddArgument("--disable-dev-shm-usage");
                    chromeOptions.AddArgument("--disable-gpu");
                    driver = new RemoteWebDriver(new Uri(LOCAL_SELENIUM_URL), chromeOptions);
                    break;
                case browserType.Firefox:
                    var firefoxOptions = new FirefoxOptions();
                    if (CI) 
                    {
                        driver = new RemoteWebDriver(new Uri(LOCAL_SELENIUM_URL), firefoxOptions);
                    }
                    else
                    {
                        driver = new RemoteWebDriver(new Uri(LOCAL_FIREFOX_URL), firefoxOptions);
                    }
                    break;
                case browserType.Safari:
                    var safariOptions = new SafariOptions();
                    driver = new SafariDriver(safariOptions);
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
