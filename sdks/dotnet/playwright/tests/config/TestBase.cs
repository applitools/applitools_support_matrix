using System;
using System.Threading.Tasks;
using Applitools;
using Applitools.Playwright;
using Applitools.Playwright.Fluent;
using Applitools.Utils.Geometry;
using Applitools.VisualGrid;
using Microsoft.Playwright;
using NUnit.Framework;
using BrowserType = Applitools.BrowserType;
namespace Applitools.Support.Matrix.Tests
{
        
        public abstract class BaseTest 
    {       
        protected IPlaywright Playwright;
        protected IBrowser Browser;
        protected IPage Page;
        protected PlaywrightEyesRunner runner;
        protected Eyes eyes;
        
        public static readonly BatchInfo batch = new BatchInfo("Support Matrix");
        public static readonly bool CI = Environment.GetEnvironmentVariable("CI") == "true";

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

        protected void initEyes()
        {
            runner = isUFG() ? (PlaywrightEyesRunner)(new VisualGridRunner(10, logger)) : new ClassicRunner(logger);
            eyes = new Eyes(runner, logHandler:logger);
            eyes.Batch = getBatch();
            eyes.StitchMode = getStitchMode();
            eyes.BranchName = "master";
            eyes.ParentBranchName = "master";
            eyes.SaveNewTests = false;
            eyes.HideScrollbars = true;
            eyes.HideCaret = true;
        }

        public async Task browserSetup() 
        {
            Playwright = await Microsoft.Playwright.Playwright.CreateAsync();
            Browser = await Playwright.Chromium
            .LaunchAsync(new BrowserTypeLaunchOptions { Headless = true });
            Page = await Browser.NewPageAsync();

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
        public async Task TimeSetup()
        {   

            await browserSetup();
            initEyes();
        }
      
        [TearDown]
        public async Task TearDown()
        {
            await Page.CloseAsync();
            Playwright.Dispose();
            eyes?.AbortIfNotClosed();
            runner?.GetAllTestResults(false);
        }

    }


}