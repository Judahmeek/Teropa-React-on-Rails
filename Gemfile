source "https://rubygems.org"
ruby "2.3.1"

gem "rails"
gem "listen"

gem "sqlite3", group: [:development, :test]

group :production do
  gem "pg"
  gem "rails_12factor" # Never include this for development or tests
end

gem "puma"

gem "sass-rails"
gem "uglifier"
gem "coffee-rails"

gem "jbuilder"

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

gem "react_on_rails", "~> 6.1"

gem "mini_racer"
gem "autoprefixer-rails"
gem "awesome_print"

# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.

group :development do
  gem "web-console"
end

group :development, :test do
  ################################################################################
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-commands-rspec"

  ################################################################################
  # Manage application processes
  gem "foreman"
  gem "factory_girl_rails"

  ################################################################################
  # Linters and Security
  gem "rubocop", require: false
  gem "ruby-lint", require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "scss_lint", require: false
  gem "brakeman", require: false
  gem "bundler-audit", require: false

  ################################################################################
  # Favorite debugging gems
  gem "pry"
  gem "pry-doc"
  gem "pry-rails"
  gem "pry-stack_explorer"
  gem "pry-rescue"
  gem "pry-byebug"

  ################################################################################
  # Color console output
  gem "rainbow"
end

group :test  do
  gem "coveralls", require: false
  gem "capybara"
  gem "capybara-screenshot"
  gem "capybara-webkit"
  gem "chromedriver-helper", require: ["selenium_chrome"].include?(ENV["DRIVER"])
  gem "database_cleaner"
  gem "generator_spec"
  gem "launchy"
  gem "poltergeist"
  gem "rspec-rails", "3.5.0.beta3"
  gem "rspec-retry"
  gem "selenium-webdriver", require: !["poltergeist", "poltergeist_errors_ok", "webkit"].include?(ENV["DRIVER"])
end
