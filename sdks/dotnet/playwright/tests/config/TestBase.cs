using System;
using System.Threading.Tasks;
using System.IO;
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
        protected IBrowserContext Context;
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
            eyes = new Eyes(runner);
            eyes.Batch = getBatch();
            eyes.StitchMode = getStitchMode();
            eyes.BranchName = "dotnet";
            eyes.ParentBranchName = "master";
            eyes.SaveNewTests = false;
            eyes.HideScrollbars = true;
            eyes.HideCaret = true;
        }

        public async Task browserSetup() 
        {
            Playwright = await Microsoft.Playwright.Playwright.CreateAsync();
            var options = new BrowserTypeLaunchOptions { Headless = true };
            var execPath = Environment.GetEnvironmentVariable("PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH");
            if(!string.IsNullOrEmpty(execPath))
            {
                options.ExecutablePath = Path.GetRelativePath(Directory.GetCurrentDirectory(), execPath);
            }
            Browser = await Playwright.Chromium.LaunchAsync(options);
            Context = await Browser.NewContextAsync();
            Page = await Context.NewPageAsync();

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