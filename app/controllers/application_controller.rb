#:nodoc:
# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def strip_timestamps(records)
    list = []
    records.each do |record|
      list.append record.as_json.except('created_at', 'updated_at')
    end
    list
  end
end
