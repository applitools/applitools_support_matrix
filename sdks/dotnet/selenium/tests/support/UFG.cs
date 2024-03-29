// Generated by DotNet template
using NUnit.Framework;
using Applitools.Utils.Geometry;
using Applitools.Selenium;
namespace Applitools.Support.Matrix.Tests
{
[TestFixture]
[Parallelizable]
public class UFG : BaseTest
{
    public override bool isUFG() 
    {
        return true;
    }

    [Test]
    public void window()
    {
        driver.Navigate().GoToUrl("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.Open(driver, "Applitools Support Matrix", "Window - UFG", new RectangleSize(width:700, height:460));
        eyes.Check(Target.Window());
        eyes.Close(true);
    }

    [Test]
    public void region()
    {
        driver.Navigate().GoToUrl("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.Open(driver, "Applitools Support Matrix", "Region - UFG", new RectangleSize(width:700, height:460));
        eyes.Check(Target.Region(new System.Drawing.Rectangle(50, 70, 90, 110)));
        eyes.Close(true);
    }

  }
}