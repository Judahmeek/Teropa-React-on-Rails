# frozen_string_literal: true
require 'rspec/retry'

RSpec.configure do |config|
  ### Fix Net::ReadTimeout error on first test
  # Show retry status in spec process
  config.verbose_retry = true
  # Try twice (retry once)
  config.default_retry_count = 3
  # Only retry when Selenium raises Net::ReadTimeout
  config.exceptions_to_retry = [Net::ReadTimeout]

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.filter_run_when_matching :focus
  config.run_all_when_everything_filtered = true
  config.example_status_persistence_file_path = 'spec/examples.txt'
  config.disable_monkey_patching!
  config.order = :random
  Kernel.srand config.seed
end
