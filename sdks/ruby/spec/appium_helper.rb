require 'eyes_appium'

RSpec.shared_context "Common" do
  let(:driver) {
    driver = Selenium::WebDriver.for :remote, capabilities: caps, url: 'https://ondemand.us-west-1.saucelabs.com:443/wd/hub'
    driver
  }
  let(:ufg) { false }

  let(:runner) {
    if ufg
      Applitools::Selenium::VisualGridRunner.new(10)
    else
      Applitools::ClassicRunner.new
    end
  }

  let(:eyes) {
    eyes = Applitools::Appium::Eyes.new(runner: runner)
    eyes.configure do |conf|
      # conf.batch = $run_batch
      conf.api_key = ENV['APPLITOOLS_API_KEY']
      conf.branch_name = 'master'
      conf.parent_branch_name = 'master'
      conf.save_new_tests = false
    end
    eyes.match_timeout = 0 unless ufg

    eyes
  }

end

RSpec.configure do |config|

  config.include_context "Common"
  config.before(:each) do
    driver
  end
  config.after(:each) do
    driver.quit
    eyes.abort
    runner.get_all_test_results(false)
  end

end