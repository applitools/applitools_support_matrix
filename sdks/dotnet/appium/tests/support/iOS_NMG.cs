// Generated by DotNet template
using NUnit.Framework;
using Applitools.Utils.Geometry;
using Applitools.Selenium;
namespace Applitools.Support.Matrix.Appium
{
[TestFixture]
[Parallelizable]
public class UFG : AppiumTest
{
    public override bool isUFG() 
    {
        return true;
    }

    [Test]
    [Ignore("Skipped test because NMG doesn't supported in dotnet")]
    public void window()
    {
            var conf = eyes.GetConfiguration();
            conf.AddMobileDevice(new VisualGrid.IosDeviceInfo(VisualGrid.IosDeviceName.iPhone_8, eyesOrientation));
            eyes.SetConfiguration(conf);
            eyes.Open(driver, "Applitools Support Matrix", "Appium iOS window - UFG (Dotnet)");
            eyes.Check(Target.Window().Fully(false));
            eyes.Close(true);
    }

  }
}