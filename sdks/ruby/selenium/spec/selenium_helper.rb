require 'eyes_selenium'

RSpec.shared_context "Common" do

  let(:legacy) {
    legacy_version = Gem::Version.new('4.9.0')
    actual_version = Gem.loaded_specs['selenium-webdriver'].version
    legacy = actual_version <= legacy_version
    if legacy
      puts 'Legacy'
    else
      puts 'New'
    end
    legacy
  }

  let(:options) {
    options = Selenium::WebDriver::Chrome::Options.new
    if legacy
      options.add_argument('headless')
    else
      options.add_argument('--headless=new')
    end
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-dev-shm-usage')
    options
  }
  let(:driver) {
    url = ENV['SELENIUM_SERVER_URL'] || 'http://localhost:4444/wd/hub'
    driver = Selenium::WebDriver.for :remote, options: options, url: url
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
    eyes = Applitools::Selenium::Eyes.new(runner: runner)
    eyes.configure do |conf|
      # conf.batch = $run_batch
      conf.api_key = ENV['APPLITOOLS_API_KEY']
      if legacy
        conf.branch_name = 'master'
        conf.parent_branch_name = 'master'
      else
        conf.branch_name = 'ruby'
        conf.parent_branch_name = 'ruby'
      end
      conf.save_new_tests = false
      conf.hide_caret = true
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
