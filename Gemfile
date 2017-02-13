# frozen_string_literal: true
# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.
source 'https://rubygems.org'
ruby '2.3.1'

gem 'autoprefixer-rails'
gem 'awesome_print'
gem 'jbuilder'
gem 'listen'
gem 'mini_racer'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'react_on_rails', '~> 6.1'
gem 'sdoc', group: :doc
gem 'uglifier'

group :production do
  gem 'rails_12factor' # Never include this for development or tests
end

group :development do
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'chromedriver-helper'
  gem 'database_cleaner'
  gem 'generator_spec'
  gem 'launchy'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.5.0.beta3'
  gem 'rspec-retry'
  gem 'selenium-webdriver', '<3.0.0'
end

group :development, :test do
  # Manage application processes
  gem 'factory_girl_rails'
  gem 'foreman'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-commands-rspec'

  # Linters and Security
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'rubocop', require: false
  gem 'ruby-lint', require: false
  gem 'scss_lint', require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278

  # Favorite debugging gems
  gem 'pry'
  gem 'pry-byebug'
  gem 'pry-doc'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'pry-stack_explorer'

  # Color console output
  gem 'rainbow'
end
