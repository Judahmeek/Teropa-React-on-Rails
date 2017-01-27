#:nodoc:
# frozen_string_literal: true
module AjaxHelper
  def select_winner(choices)
    return [choices[0]] if choices[0].total_votes > choices[1].total_votes
    return [choices[1]] if choices[1].total_votes > choices[0].total_votes
    choices
  end
end
