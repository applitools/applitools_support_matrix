// Generated by DotNet template
using NUnit.Framework;
using System.Threading.Tasks;
using Applitools.Utils.Geometry;
using Applitools.Playwright;
using Applitools.Playwright.Fluent;
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
    public async Task window()
    {
        await Page.GotoAsync("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.Open(Page, "Applitools Support Matrix", "Playwright Window - UFG", new RectangleSize(width:700, height:460));
        eyes.Check(Target.Window());
        eyes.Close(true);
    }

    [Test]
    public async Task region()
    {
        await Page.GotoAsync("https://applitools.github.io/demo/TestPages/FramesTestPage/");
        eyes.Open(Page, "Applitools Support Matrix", "Playwright Region - UFG", new RectangleSize(width:700, height:460));
        eyes.Check(Target.Region(new System.Drawing.Rectangle(50, 70, 90, 110)));
        eyes.Close(true);
    }

  }
}