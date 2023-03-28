require 'eyes_appium'

RSpec.shared_context "Common" do
  let(:driver) {
    driver = Appium::Driver.new({caps: caps, appium_lib: { server_url: 'https://ondemand.us-west-1.saucelabs.com:443/wd/hub' } }, false)
    driver.start_driver
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

  let(:sauce_options) {
    sauce_options = {
      "username": ENV["SAUCE_USERNAME"],
      "accessKey": ENV["SAUCE_ACCESS_KEY"],
      "name": 'Support Matrix Ruby'
    }
    appium_version = ENV['APPIUM_VERSION']
    if appium_version != nil
      sauce_options[:appiumVersion] = appium_version
    end
    sauce_options
  }


  let(:eyes) {
    eyes = Applitools::Appium::Eyes.new(runner: runner)
    eyes.configure do |conf|
      # conf.batch = $run_batch
      conf.api_key = ENV['APPLITOOLS_API_KEY']
      conf.branch_name = 'master'
      conf.parent_branch_name = 'master'
      conf.save_new_tests = false
      conf.force_full_page_screenshot = false
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
    driver.quit_driver
    puts 'Driver closed succesfully'
  end

  config.after(:each) do
    eyes.abort
    puts 'Eyes abort pass succesfully'
  end

  config.after(:each) do
    runner.get_all_test_results(false)
    puts 'Eyes runner get all tests results pass succesfully'
  end

end